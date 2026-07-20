import React, { useState, useEffect } from 'react';
import styles from './VideoUploading.module.css';
import { Box, CircularProgress, Grid2, Typography } from '@mui/material'
import { Favorite, Share } from '@mui/icons-material'
import Card from '../Cards/Cards';
import { videos, envVar } from '../../Utils/Const'
import { useSnackbar } from 'notistack'
import { hostAddress } from '../../Utils/Const'
import axios from 'axios';
import { onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../Utils/firebaseClient'

export default function VideoUploading() {

  const [videoUpload, setVideoUpload] = useState([]);
  const [loader, setLoader] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  let [circularProgress, setCircularProgress] = useState(0);
  const [videoId, setVideoId] = useState(JSON.parse(localStorage.getItem('videoId')) || null);
  const userToken = JSON.parse(localStorage.getItem('userToken')) || null;
  const userId = JSON.parse(localStorage.getItem('userData'))?._id || null

  useEffect(() => {
    setTimeout(() => {
      getVideoById();
    }, 500)
  }, [])

  useEffect(() => {

    if (!videoId) return;

    const unsubscribe = onSnapshot(doc(db, 'progress', videoId), async (snapshot) => {
      if (snapshot.exists() && snapshot.data().progress == 100) {
        await videoUpdateById();
        await deleteDoc(doc(db, 'progress', videoId))
        enqueueSnackbar("Video uploaded successfully.", { variant: "success" });
        setVideoUpload([]);
        localStorage.removeItem('videoId');
      } else if (snapshot.exists()) {
        setCircularProgress(snapshot.data().progress);
      }
    })

    // This function is used to unmount component.
    return () => unsubscribe();
  }, []);

  const getVideoById = async () => {

    try {

      setTimeout(() => {
        setLoader(false);
      }, 500)

      if (!videoId) {
        setVideoUpload([]);
        return;
      }

      const apiUrl = `${hostAddress}/v1/videos/${userId}/${videoId}`
      const video = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (Object.keys(video.data).length > 0) {
        setVideoUpload([{ ...video.data }]);
      } else if (Object.keys(video.data).length == 0) {
        setVideoUpload([]);
      }
    } catch (err) {
      if (err && err.code === "ERR_NETWORK") {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      } else if (err && err?.status) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
    }


  }

  const videoUpdateById = async () => {

    if (!videoId) return;

    try {
      const apiUrl = `${hostAddress}/v1/videos/${videoId}/video_update`
      await axios.put(apiUrl, {
        videoLink: `https://${envVar.prodBucket}.${envVar.s3Domain}/${envVar.prodFolder}/${videoId}/index.m3u8`,
        previewImage: `https://${envVar.prodBucket}.${envVar.s3Domain}/${envVar.prodFolder}/${videoId}/thumbnail.jpg`
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

    } catch (err) {
      if (err && err.code === "ERR_NETWORK") {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      } else if (err && err?.status) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
    }


  }


  return (
    <Box component='section'  >
      <Grid2 container className='flex justify-center' >
        {
          loader ? (<CircularProgress className={styles.loader} />) :
            (videoUpload.length > 0 ?
              videoUpload.map(({ _id, title, genre, contentRating, viewCount, releaseDate }) => {
                return (
                  <Grid2 key={_id} size={{ md: 6, xs: 8 }} className='p-2' >
                    <Card
                      key={_id}
                      id={_id}
                      title={title}
                      url={""}
                      thumbnail={""}
                      releaseDate={releaseDate}
                      viewCount={viewCount}
                      clickEvent={""}
                      progress={circularProgress}
                    />
                  </Grid2>
                )
              }) : (
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
              ))
        }
      </Grid2>
    </Box>
  )

}

