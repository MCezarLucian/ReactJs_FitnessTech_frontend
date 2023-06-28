import axios, { AxiosInstance } from "axios";

const defaultHeaders: { [key: string]: string } = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};
const defaultConfig: { baseURL: string; headers: { [key: string]: string } } = {
  baseURL: "http://localhost:4000",
  headers: defaultHeaders,
};

const getAxiosInstanceCustom = (): AxiosInstance => {
  return axios.create(defaultConfig);
};

export default getAxiosInstanceCustom;
