import axios from "axios";
import { hostAddress } from "../Utils/Const";

export const loginApi = async (payload, enqueueSnackbar) => {
  try {
    const res = await axios.post(`${hostAddress}/v1/auth/register`, payload);

    return res;
    // enqueueSnackbar("Validation passed", { variant: "success" });
  } catch (err) {
    if (err && err.code === "ERR_NETWORK") {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
        { variant: "error" }
      );
    } else if (err && err?.status === 400) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
    console.log(err);
  }
};
