import axiosInstances from './axios';
import { filterMoviesByQuery } from '../../Utils/Helpers'

export const viewVideoApi = async (id) => {
  try {
    await axiosInstances.patch(`/videos/${id}/views`);
  } catch (err) {
    if (err && err.code === "ERR_NETWORK") {
      throw new Error("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
    } else {
      throw new Error(err.response?.data?.message || 'Something went wrong')
    }
  }
}

export const fetchMoviesApi = async (filter, search) => {

  try {

    let getFilters = filterMoviesByQuery(filter);

    let apiUrl = '/videos';

    if (getFilters["genre"]) {
      apiUrl += "?genres=" + getFilters["genre"];
    }

    if (getFilters["age"]) {
      apiUrl += !getFilters["genre"]
        ? "?contentRating=" + getFilters["age"]
        : "&contentRating=" + getFilters["age"];
    }

    if (getFilters["sortBy"]) {
      apiUrl +=
        getFilters["genre"] || getFilters["age"]
          ? "&sortBy=" + getFilters["sortBy"]
          : "?sortBy=" + getFilters["sortBy"];
    }

    if (search) {
      apiUrl +=
        getFilters["genre"] || getFilters["age"] || getFilters["sortBy"]
          ? "&title=" + search
          : "?title=" + search;
    }

    const { data } = await axiosInstances.get(apiUrl);

    return data;

  } catch (err) {
    if (err && err.code === "ERR_NETWORK") {
      throw new Error("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
    } else {
      throw new Error(err || 'Something went wrong')
    }
  }
}

export const getVideoByUserIdApi = async (userId) => {

  try {
    const response = await axiosInstances.get(`/videos/${userId}/video_list`);
    return response;
  } catch (err) {
    if (err && err.code === "ERR_NETWORK") {
      throw new Error("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
    } else {
      throw new Error(err || 'Something went wrong')
    }
  }
}