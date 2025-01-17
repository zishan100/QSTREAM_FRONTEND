export const sortBy = ["Release Date", "View Count"];

export const hostAddress = "http://localhost:8082";

export const registerForm = [
  {
    variant: "outlined",
    margin: "normal",
    id: "0",
    label: "First Name",
    name: "firstName",
    value: "",
    type: "text",
    autoComplete: "",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "1",
    label: "Last Name",
    name: "lastName",
    value: "",
    type: "text",
    autoComplete: "",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "2",
    label: "Email Address",
    name: "email",
    value: "",
    type: "email",
    autoComplete: "email",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "3",
    label: "Password",
    name: "password",
    value: "",
    type: "password",
    autoComplete: "current-password",
  },
];

export const loginForm = [
  {
    variant: "outlined",
    margin: "normal",
    id: "0",
    label: "Email Address",
    name: "email",
    value: "",
    type: "email",
    autoComplete: "email",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "1",
    label: "Password",
    name: "password",
    value: "",
    type: "password",
    autoComplete: "current-password",
  },
];

export const uploadForm = [
  {
    variant: "outlined",
    margin: "normal",
    id: "0",
    // label: "Upload Video",
    name: "file",
    type: "file",
    file: null,
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "1",
    label: "Title",
    name: "title",
    value: "",
    type: "text",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "2",
    label: "Genre",
    name: "genre",
    value: "All",
    type: "select",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "3",
    label: "Suitable age group for the clip",
    name: "age",
    value: "All",
    type: "select",
  },
  {
    variant: "outlined",
    margin: "normal",
    id: "4",
    // label: "Release Date",
    name: "releaseDate",
    value: "",
    type: "date",
  },
];

export const genreType = [
  "All",
  "Education",
  "Sports",
  "Comedy",
  "LifeStyle",
  "Movies",
];

export const ageType = ["All", "7+", "12+", "16+", "18+"];

export const videoExtension = ["mp4", "mov", "avi", "mkv"];
