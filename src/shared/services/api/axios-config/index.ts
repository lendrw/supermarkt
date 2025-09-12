import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

const Api = axios.create({
  baseURL: Environment.BASE_URL,
});

const Mock = axios.create({
  baseURL: Environment.MOCK_URL,
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

Mock.interceptors.response.use(
  async (response) => {
    await delay(300); 
    return responseInterceptor(response);
  },
  async (error) => {
    await delay(300);
    return errorInterceptor(error);
  }
);

export { Api, Mock };
