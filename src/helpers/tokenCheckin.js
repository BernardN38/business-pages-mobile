import axios from "axios";
import config from "../config";

export default function tokenCheckin(user) {
  console.log("token checkin");
  const promise = axios.get(`${config.serverUrl}/api/checkin`, {
    withCredentials: true,
  });

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data);

  // return it
  return dataPromise;
}
