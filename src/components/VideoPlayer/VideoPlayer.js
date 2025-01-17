import React, { useRef, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Video from "../Video/Video";
import videojs from "video.js";
import style from "./VideoPlayer.module.css";
import CancelIcon from "@mui/icons-material/Cancel";

export default function VideoPlayer({ open, handleClose, url }) {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    fill: true,
    playbackRates: [0.5, 1, 1.5, 2],
    userActions: {
      click: true,
    },
    spatialNavigation: {
      enabled: true,
    },
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    sources: [
      {
        src: url,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className={style.boxContainer}>
          <Video
            options={videoJsOptions}
            onReady={handlePlayerReady}
            close={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
