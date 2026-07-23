import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { filterByTab } from "../../Utils/Const";
import style from "./VideoDashboard.module.css";
import UploadVideo from "../UploadVideo/UploadVideo";
import VideoList from "../VideoList/VideoList";
import VideoUploading from "../VideoUploading/VideoUploading";

export default function VideoDashboard() {
  const [value, setValue] = useState(filterByTab[0]);


  const onChangeTab = (e, newValue) => {
    console.log("Tab click event :", newValue);
    setValue(newValue);
  };

  return (
    <div className="max-w-xl mx-auto py-4 px-4">
      <Tabs value={value} onChange={onChangeTab}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="secondary"
        sx={{
          "& .MuiTabs-scrollButtons": {
            color: "white", // arrow color
          },
          "& .MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
          },
        }}
      >
        {filterByTab.map((tab, idx) => {
          return (
            <Tab
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "white",
                },
              }}
              key={idx}
              value={tab}
              label={tab}
            />
          );
        })}
      </Tabs>
      <div className="mt-6 space-y-2">
        {value === "Video Upload" && <UploadVideo />}
        {value === 'Video Uploading' && <VideoUploading />}
        {value === 'Video Uploaded By User' && <VideoList />}
      </div>
    </div>
  );
}
