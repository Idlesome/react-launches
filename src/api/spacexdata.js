import axios from "axios";

const API_URL_BASE = "https://api.spacexdata.com/v3/";

export default axios.create({
  baseURL: API_URL_BASE
});
