import { S3Client } from "@aws-sdk/client-s3";
import { videoExtension } from "./Const";

export const filterType = {
  genre: [
    { type: "All", select: true },
    { type: "Education", select: false },
    { type: "Sports", select: false },
    { type: "Comedy", select: false },
    { type: "Lifestyle", select: false },
    { type: "Movies", select: false },
  ],
  age: [
    { type: "All Age Group", select: true },
    { type: "7+", select: false },
    { type: "12+", select: false },
    { type: "16+", select: false },
    { type: "18+", select: false },
  ],
};

export const filterSelect = (selectVal, arr, type) => {
  if (type && type === "age") {
    return arr.map((items) => {
      return { ...items, select: items.type.trim() === selectVal.trim() };
    });
  } else if (selectVal === "All") {
    return arr.map((items) => {
      if (items.type === "All") {
        items.select = true;
      } else {
        items.select = false;
      }
      return { ...items };
    });
  }

  let lists = arr.map((items) => {
    if (items.type === "All") {
      items.select = false;
    }
    if (selectVal === items.type) {
      items.select = !items.select;
    }
    return { ...items };
  });

  let resVal = lists.slice(1).every((items) => items.select === false);

  lists[0].select = resVal && !lists[0].select;

  return lists;
};

export const validationOfRegistryForm = (formData) => {
  let errorArr = [];
  let isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

  if (formData.firstName.trim() === "") {
    errorArr.push("First Name is require");
  }

  if (errorArr.length === 0 && formData.lastName.trim() === "") {
    errorArr.push("Last Name is require");
  }

  if (
    errorArr.length === 0 &&
    (!formData.email || !isEmailValid.test(formData.email))
  ) {
    errorArr.push("Please enter valid email");
  }

  if (
    errorArr.length === 0 &&
    (!formData.password || formData.password.length < 8)
  ) {
    errorArr.push("Please enter valid password");
  }

  return errorArr;
};

export const validationOfLoginForm = (formData) => {
  let errorArr = [];
  let isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

  if (!formData.email || !isEmailValid.test(formData.email)) {
    errorArr.push("Please enter valid email");
  }

  if (
    errorArr.length === 0 &&
    (!formData.password || formData.password.length < 8)
  ) {
    errorArr.push("Please enter valid password");
  }

  return errorArr;
};

export const validationOfUploadForm = (formData) => {
  const currDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  let errorArr = [];

  if (
    !formData?.file?.type ||
    !videoExtension.includes(formData.file.type.split("/").pop())
  ) {
    errorArr.push("Please select a file to upload");
  }

  if (errorArr.length === 0 && !formData.title) {
    errorArr.push("Please enter title of video");
  }

  if (
    errorArr.length === 0 &&
    (!formData?.releaseDate ||
      new Date(formData.releaseDate).getTime() < new Date(currDate).getTime())
  ) {
    errorArr.push("Please choose valid release date");
  }

  if (errorArr.length === 0 && !formData.genre) {
    errorArr.push("Please select a genre type from dropdown");
  }

  if (errorArr.length === 0 && !formData.age) {
    errorArr.push("Please select a age group from dropdown");
  }

  return errorArr;
};

export const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  },
});

export const filterMoviesByQuery = (filter) => {
  // console.log("Inside helpers :", filter);
  let filterByType = { age: "", genre: "" };

  if (!filter["genre"][0].select) {
    let filterByGenre = filter["genre"].filter(
      ({ type, select }) => select === true
    );

    filterByGenre = filterByGenre.map(({ type }) => type);

    filterByType["genre"] = filterByGenre.join(",");
  }

  if (!filter["age"][0].select) {
    let filterByAge = filter["age"].filter(({ select }) => select === true);

    filterByAge = filterByAge.map(({ type }) => type);

    filterByType["age"] = filterByAge.join(",");
  }

  return filterByType;
};
