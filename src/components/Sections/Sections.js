import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import style from "./Sections.module.css";
import Card from "../Cards/Cards";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useSnackbar } from "notistack";
import { viewVideoApi, fetchMoviesApi } from '../Api/videoApi'
import { GirlOutlined } from "@mui/icons-material";

export default function Sections({ filter, search }) {
  let { enqueueSnackbar } = useSnackbar();
  let [movieslist, setMovieslist] = useState([]);
  let [updatedmovies, setUpdatemovies] = useState([]);
  let [url, setUrl] = useState("");
  let [loader, setLoader] = useState(false);
  let [player, setPlayers] = useState(false);

  const openPlayer = (e, obj) => {
    e.preventDefault();
    setUrl(obj.url);
    setPlayers(true);

    viewVideo(obj.id);
  };

  const closePlayer = () => setPlayers(false);
  /*   
    Created separate useEffect for search functionality (used debouncing)
  */
  useEffect(() => {
    let debouncing;

    debouncing = setTimeout(() => {
      // console.log("search :", search);
      fetchMovies();
    }, 1000);

    // console.log(" Inside callback useEffect :", debouncing);

    return () => {
      clearTimeout(debouncing);
    };
  }, [search]);

  useEffect(() => {
    setMovieslist([]);
    fetchMovies();
  }, [filter]);

  const fetchMovies = async () => {

    setLoader(true);
    try {
      const movies = await fetchMoviesApi(filter, search);

      setTimeout(() => {
        setLoader(false);
        setMovieslist([...movies.videos]);
      }, 1000)

    } catch (err) {
      setLoader(false);
      enqueueSnackbar(err?.message || "Something went wrong", { variant: "error" });
    }
  };

  const viewVideo = async (id) => {
    try {
      await viewVideoApi(id);
    } catch (err) {
      enqueueSnackbar(err?.message || "Something went wrong", { variant: "error" })
    }
  };

  return (
    <Box className="flex justify-center px-4">
      <Grid container spacing={2} className={style.gridContainer}>

        {loader ? (
          <CircularProgress className={style.loader} />
        ) : movieslist.length > 0 ? (
          movieslist.map((movies) => {
            const { _id, title, previewImage, releaseDate, videoLink, viewCount } = movies;

            return (
              <Grid key={_id} size={{ xs: 8, sm: 6, md: 3 }} >
                <Card
                  key={_id}
                  id={_id}
                  title={title}
                  url={videoLink}
                  thumbnail={previewImage}
                  releaseDate={releaseDate}
                  viewCount={viewCount}
                  clickEvent={openPlayer}
                />
              </Grid>
            );
          })
        ) : (
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ fontSize: "1.2rem", fontWeight: 500, color: "#ef4444" }}
              gutterBottom
              variant="h6"
              component="div"
            >
              Oops, no movies found.
            </Typography>
          </Box>
        )}
      </Grid>
      {open && (
        <VideoPlayer open={player} handleClose={closePlayer} url={url} />
      )}
    </Box>
  );
}
