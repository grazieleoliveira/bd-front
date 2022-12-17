import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { client } from "../config/api";

export const request = async (config: AxiosRequestConfig<any>) => {
  const onSuccess = (response: AxiosResponse) => {
    const {
      data: { results },
    } = response;
    return results ? results : response.data;
  };

  const onError = (error: AxiosError) => {
    return Promise.reject(error.message);
  };

  return client(config).then(onSuccess).catch(onError);
};
