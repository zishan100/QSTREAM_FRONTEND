import React, { useEffect, useState } from 'react';
import styles from './VideoList.module.css';
import { Box, Grid2, Typography, CircularProgress, Pagination } from '@mui/material'
import { EditNoteSharp, Favorite, Share } from '@mui/icons-material'
import Card from '../Cards/Cards';
import { videos, ITEMS_PER_PAGE } from '../../Utils/Const'
import { getVideoByUserIdApi } from '../Api/videoApi'
import { useSnackbar } from 'notistack'


export default function VideoList() {

  const { enqueueSnackbar } = useSnackbar();
  const [moviesList, setMoviesList] = useState([]);
  const [movies, setMovies] = useState([]);
  let [loader, setLoader] = useState(true);
  const userId = JSON.parse(localStorage.getItem('userData'))?._id || null;
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPage, setTotalPage] = useState(0);
  let startIdx = 0;
  let endIdx = 0;

  useEffect(() => {
    getVideoByUserId();
  }, [])

  const handlePagination = (e, page) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500)
    startIdx = (page - 1) * ITEMS_PER_PAGE;
    endIdx = startIdx + ITEMS_PER_PAGE;
    const currArr = moviesList.slice(startIdx, endIdx);
    setMovies([...currArr]);
  }
  const getVideoByUserId = async () => {

    try {

      setTimeout(() => {
        setLoader(false);
      }, 500);

      if (!userId) {
        setMovies([]);
        return;
      }
      const response = await getVideoByUserIdApi(userId);

      if (response.data?.videos.length > 0) {
        setMoviesList([...response.data.videos]);
        setTotalPage(Math.floor(response.data.videos.length / ITEMS_PER_PAGE));
        startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        endIdx = startIdx + ITEMS_PER_PAGE;
        const currentData = response.data.videos.slice(startIdx, endIdx);
        setMovies([...currentData]);
      }

    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  }

  return (
    <Box component='section'  >
      <Grid2 container className='flex justify-center' >
        {
          loader ? (<CircularProgress className={styles.loader} />) :
            movies.length > 0 ?
              (movies.map(({ _id, title, genre, contentRating, viewCount, releaseDate, previewImage }) => {
                return (
                  <Grid2 key={_id} size={{ md: 6, xs: 8 }} className='p-2' >
                    <Card
                      key={_id}
                      id={_id}
                      title={title}
                      url={""}
                      thumbnail={previewImage}
                      releaseDate={releaseDate}
                      viewCount={viewCount}
                    />
                  </Grid2>
                )
              })) :
              (<Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ fontSize: "1.2rem", fontWeight: 500, color: "#ef4444" }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Oops, no movies found.
                </Typography>
              </Box>)
        }
      </Grid2>
      <Pagination
        count={totalPage}
        size='medium'
        color='primary'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          "& .MuiPaginationItem-root": {
            color: "white"
          },
          "& .Mui-selected": {
            backgroundColor: "white",
            color: "black"
          }
        }}
        onChange={handlePagination}
      />
    </Box>
  )

}


