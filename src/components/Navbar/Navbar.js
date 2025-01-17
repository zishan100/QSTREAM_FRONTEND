import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Button from "../Button/Button";
import Modals from "../Modals/Modals";
import { CloudUpload } from "@mui/icons-material";
import { useSnackbar } from "notistack";

export default function Navbar() {
  let [login, setLogin] = useState(false);
  let [register, setRegister] = useState(false);
  let [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  let { enqueueSnackbar } = useSnackbar();
  let [upload, setUpload] = useState(false);

  const openLogin = (e) => setLogin(!login);
  const openRegister = (e) => setRegister(!register);
  const openUpload = (e) => setUpload(!upload);
  const closeLogin = (e) => setLogin(false);
  const closeRegister = (e) => setRegister(false);
  const closeUpload = (e) => setUpload(false);

  const loggedOut = (e) => {
    setLoggedIn(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    enqueueSnackbar("Logged out successfully...", { variant: "success" });
  };

  return (
    <div className="flex justify-between">
      <Logo />
      <Search />
      <div className="flex justify-around px-2">
        {!loggedIn ? (
          <React.Fragment>
            <Button modal={openLogin} variant="outlined" btnText="Login" />
            <Button
              modal={openRegister}
              variant="outlined"
              btnText="Register"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              variant="outlined"
              btnText="Upload"
              modal={openUpload}
              CloudUpload={CloudUpload}
              component="label"
            />
            <Button variant="outlined" btnText="Logout" modal={loggedOut} />
          </React.Fragment>
        )}
      </div>
      {(login && (
        <Modals
          show={login}
          close={closeLogin}
          title="Login"
          loggedIn={setLoggedIn}
        />
      )) ||
        (register && (
          <Modals show={register} close={closeRegister} title="Register" />
        )) ||
        (upload && (
          <Modals show={upload} close={closeUpload} title="Upload Video" />
        ))}
    </div>
  );
}
