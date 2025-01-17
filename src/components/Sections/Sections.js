import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import style from "./Sections.module.css";
import Card from "../Cards/Cards";
import Modals from "../Modals/Modals";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import axios from "axios";
import movies from "../../data/movies.json";
import { hostAddress } from "../../Utils/Const";
import { useSnackbar } from "notistack";
import SocketIOClient from "socket.io-client";
import { filterMoviesByQuery } from "../../Utils/Helpers";

export default function Sections({ filter }) {
  let { enqueueSnackbar } = useSnackbar();
  let [movieslist, setMovieslist] = useState([]);
  let [updatedmovies, setUpdatemovies] = useState([]);
  let [url, setUrl] = useState("");
  let [loader, setLoader] = useState(false);
  let [player, setPlayers] = useState(false);

  const openPlayer = (e, obj) => {
    setUrl(obj.url);
    setPlayers(true);
  };

  const closePlayer = () => setPlayers(false);

  useEffect(() => {
    const socket = SocketIOClient(hostAddress);

    socket.on("serverToClient", () => {
      fetchMovies();

      enqueueSnackbar("Movies loaded successfully...", {
        variant: "success",
      });
    });
    setMovieslist([]);
    fetchMovies();

    return () => {
      socket.disconnect();
    };
  }, [filter]);

  const fetchMovies = async () => {
    setLoader(true);
    try {
      let getFilters = filterMoviesByQuery(filter);

      let apiUrl = `${hostAddress}/v1/videos`;

      if (getFilters["genre"]) {
        apiUrl += "?genres=" + getFilters["genre"];
      }

      if (getFilters["age"]) {
        apiUrl += !getFilters["genre"]
          ? "?contentRating=" + getFilters["age"]
          : "&contentRating=" + getFilters["age"];
      }

      const movies = await axios.get(apiUrl);

      // console.log("Movies list :", movies.data);

      setTimeout(() => {
        setLoader(false);
        setMovieslist([...movies.data.videos]);
      }, 1000);
    } catch (err) {
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
  };

  return (
    <Box className="flex justify-center px-4">
      <Grid container spacing={2} className={style.gridContainer}>
        {loader ? (
          <CircularProgress className={style.loader} />
        ) : movieslist.length > 0 ? (
          movieslist.map((movies) => {
            const { _id, title, previewImage, releaseDate, videoLink } = movies;

            return (
              <Card
                key={_id}
                title={title}
                url={videoLink}
                thumbnail={previewImage}
                releaseDate={releaseDate}
                clickEvent={openPlayer}
              />
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
