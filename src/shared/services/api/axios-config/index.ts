import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

const Api = axios.create({
  baseURL: Environment.BASE_URL,
});

const Mock = axios.create({
  baseURL: Environment.MOCK_URL,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

Mock.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api, Mock };
