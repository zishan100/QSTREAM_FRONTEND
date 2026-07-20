import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import style from "./Modals.module.css";
import {
  hostAddress,
  loginForm,
  registerForm,
  uploadForm,
  genreType,
  ageType,
} from "../../Utils/Const";
import { ConstructionOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import {
  validationOfLoginForm,
  validationOfRegistryForm,
} from "../../Utils/Helpers";

export default function Modals({ show, close, title, loggedIn }) {
  let { enqueueSnackbar } = useSnackbar();
  let [registryForm, setRegistryForm] = useState([...registerForm]);
  let [loader, setLoader] = useState(false);
  let [signInForm, setSignInForm] = useState([...loginForm]);

  const closeLoader = () => setLoader(!loader);

  const handleForm = (e) => {
    // console.log(e);
    const { name, value, id, files } = e.target;

    if (title === "Register") {
      registryForm[Number(id)] = {
        ...registryForm[Number(id)],
        value: value,
      };

      setRegistryForm([...registryForm]);
    } else {
      signInForm[Number(id)] = {
        ...signInForm[Number(id)],
        value: value,
      };
      setSignInForm([...signInForm]);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = {};

    if (title.trim() === "Register") {
      setLoader(true);

      for (const form of registryForm) {
        formData[form.name] = form.value;
      }
      let errorArr = validationOfRegistryForm(formData);

      if (errorArr.length === 0) {
        try {
          const res = await axios.post(
            `${hostAddress}/v1/auth/register`,
            formData
          );

          // console.log("Result :", res.data);
          enqueueSnackbar(res.data.msg, { variant: "success" });
          setLoader(false);
          close();
          // setTimeout(() => {}, 1000);
        } catch (err) {
          setLoader(false);
          // console.log(err);
          if (err && err.code === "ERR_NETWORK") {
            enqueueSnackbar(
              "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
              { variant: "error" }
            );
          } else if (err && err?.status === 400) {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          }
        }
      } else {
        // console.log(errorArr);
        setLoader(false);
        enqueueSnackbar(errorArr[0], { variant: "error" });
      }
    } else {
      setLoader(true);

      for (const form of signInForm) {
        formData[form.name] = form.value;
      }

      // console.log(formData);

      let errorArr = validationOfLoginForm(formData);

      if (errorArr.length === 0) {
        try {
          const res = await axios.post(
            `${hostAddress}/v1/auth/login`,
            formData
          );

          // console.log("Result :", res.data);

          const {
            token,
            user: { firstName, lastName, email, _id },
          } = res.data.user;

          localStorage.setItem("userToken", JSON.stringify(token));

          localStorage.setItem(
            "userData",
            JSON.stringify({ firstName, lastName, email, _id })
          );

          loggedIn({ firstName, lastName, email });

          enqueueSnackbar(res.data.msg, { variant: "success" });
          setLoader(false);
          close();
        } catch (err) {
          // console.log(err);
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
        setLoader(false);
        enqueueSnackbar(errorArr[0], { variant: "error" });
      }
    }
  };

  return (
    <Modal open={show} onClose={close}>
      <Box className={style.boxContainer} onClick={close}>
        <Card className={style.signInCard} onClick={(e) => e.stopPropagation()}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={style.paper}>
              <Typography component="h1" variant="h5">
                {title}
              </Typography>
              <form className={style.form} onSubmit={handleSubmitForm}>
                {title === "Register"
                  ? registryForm.map((textfield, idx) => {
                    return (
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
                        autoComplete={
                          textfield.autoComplete ? textfield.autoComplete : ""
                        }
                        autoFocus
                      />
                    );
                  })
                  : signInForm.map((textfield, idx) => {
                    return (
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
                        autoComplete={
                          textfield.autoComplete ? textfield.autoComplete : ""
                        }
                        autoFocus
                      />
                    );
                  })
                }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={style.submit}
                >
                  {title}
                </Button>
              </form>
              <Button
                onClick={close}
                className={style.closeBtn}
                variant="contained"
              >
                Close
              </Button>
              {loader && (
                <Backdrop
                  sx={(theme) => ({
                    color: "#fff",
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
    </Modal>
  );
}
