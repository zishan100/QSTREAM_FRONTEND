import React, { useState, useRef } from "react";
import {
  uploadForm,
  hostAddress,
  videoExtension,
  ageType,
  genreType,
} from "../../Utils/Const";
import { Upload } from "@aws-sdk/lib-storage";
import { useSnackbar } from "notistack";
import axios from "axios";
import { validationOfUploadForm, s3Client } from "../../Utils/Helpers";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import style from "./UploadVideo.module.css";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import config from '../../Utils/configHelper'

export default function UploadVideo() {
  let [upload, setUpload] = useState([...uploadForm]);
  let [loader, setLoader] = useState(false);
  let [progress, setProgress] = useState(0);
  let { enqueueSnackbar } = useSnackbar();
  let formRef = useRef(null);

  const handleForm = (e) => {
    const { name, value, id, files } = e.target;

    if (name === "file") {
      upload[Number(id)] = {
        ...upload[Number(id)],
        file: files[0],
      };
    } else {
      upload[Number(id)] = {
        ...upload[Number(id)],
        value: value,
      };
    }

    setUpload([...upload]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setLoader(true);

    const now = new Date();

    const formData = {};

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    for (const form of upload) {
      if (form.name === "file") {
        formData[form.name] = form.file;
        continue;
      }
      formData[form.name] = form.value;
    }

    console.log("Upload FormData :", formData);

    let errorArr = validationOfUploadForm(formData);

    console.log("Error array :", errorArr);

    if (errorArr.length === 0) {
      try {
        const videoPost = await axios.post(
          `${hostAddress}/v1/videos`,
          {
            title: formData.title,
            genre: formData.genre,
            contentRating: formData.age,
            releaseDate: `${formData.releaseDate}T${hours}:${minutes}:${seconds}`,
            videoUploading: true,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("userToken")
              )}`,
            },
          }
        );

        console.log("Result :", videoPost.data);

        const uploadFile = new Upload({
          client: s3Client,
          params: {
            Bucket: config.APP_BUCKET_TEMP,
            Body: formData.file,
            Key: `video/${videoPost.data._id}.${formData.file.type.split("/")[1]
              }`,
            ContentType: formData.file.type.split("/")[1],
          },
        });

        uploadFile.on("httpUploadProgress", (progress) => {
          let { loaded, total } = progress;

          let percentage = Math.round((loaded / total) * 100);
          setProgress(percentage);
        });

        await uploadFile.done();

        setLoader(false);
        enqueueSnackbar("File uploaded successfully...", {
          variant: "success",
        });
        localStorage.setItem("videoId", JSON.stringify(videoPost.data._id))
        setUpload([...uploadForm]);
        setProgress(0);
        formRef.current.reset();
      } catch (err) {

        setLoader(false);
        if (err && err.code === "ERR_NETWORK") {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        } else if (err && err?.status === 400) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      }
    } else {
      enqueueSnackbar(errorArr[0], { variant: "error" });
      setLoader(false);
    }
  };

  return (
    <Box className={style.boxContainer}>
      <Card className={style.uploadVideoCard}>
        <Container component="main" maxWidth="xs">
          <div className={style.paper}>
            <Typography component="h2" variant="h5">
              Upload Video
            </Typography>
            <form
              ref={formRef}
              className={style.form}
              onSubmit={handleSubmitForm}
            >
              {upload.map((textfield, idx) => {
                return textfield.type === "select" ? (
                  <TextField
                    key={idx}
                    variant={textfield.variant}
                    margin={textfield.margin}
                    // required
                    fullWidth
                    id={textfield.id}
                    select
                    label={textfield.label}
                    name={textfield.name}
                    defaultValue={textfield.value}
                    onChange={handleForm}
                    slotProps={{
                      select: {
                        native: true,
                      },
                    }}
                  >
                    {(textfield.name === "genre" &&
                      genreType.map((value, idx) => (
                        <option id={textfield.id} key={idx} value={value}>
                          {value}
                        </option>
                      ))) ||
                      (textfield.name === "age" &&
                        ageType.map((value, idx) => (
                          <option id={textfield.id} key={idx} value={value}>
                            {value}
                          </option>
                        )))}
                  </TextField>
                ) : (
                  <React.Fragment key={idx} >
                    <TextField
                      key={idx}
                      variant={textfield.variant}
                      margin={textfield.margin}
                      // required
                      fullWidth
                      id={textfield.id}
                      label={textfield.label}
                      name={textfield.name}
                      value={textfield.value}
                      type={textfield.type}
                      onChange={handleForm}
                    />
                    {textfield.type === "file" && (
                      <LinearProgress
                        color="success"
                        variant="determinate"
                        value={progress}
                      />
                    )}
                  </React.Fragment>
                );
              })}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={style.submit}
              >
                Upload Video
              </Button>
            </form>
            {loader && (
              <Backdrop
                sx={(theme) => ({
                  color: "#ef4444",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={loader}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </div>
        </Container>
      </Card>
    </Box>
  );
}
