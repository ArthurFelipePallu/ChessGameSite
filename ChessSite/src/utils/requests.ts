//recursos para ajudar a fazer requisições

import { history } from "./history";
import { BASE_API_URL } from "./system";
import axios, { type AxiosRequestConfig } from "axios";
// import * as AuthService from "../services/auth-service";

export function requestBackEnd(config: AxiosRequestConfig) {
  const requestHeaders = config.withCredentials
    ? {
        ...config.headers,
        // Authorization: "Bearer " + AuthService.getAccessToken(),
      }
    : config.headers;

  return axios({
    ...config,
    baseURL: BASE_API_URL,
    headers: requestHeaders,
  });
} 

//REQUEST INTERCEPTOR
axios.interceptors.request.use(
  function (config) {
    //DO SOMETHING BEFORE REQUEST IS SENT

    return config;
  },
  function (error) {
    // DO SOMETHING WITH REQUEST ERROR
    displayErrorInConsole(error)

    return Promise.reject(error);
  }
);

//RESPONSE INTERCEPTOR
axios.interceptors.response.use(
  function (response) {//DO SOMETHING BEFORE RESPONSE IS SENT
    return response;
  },
  function (error) { // DO SOMETHING WITH RESPONSE ERROR   
    displayErrorInConsole(error)

    if (error.response.status === 400) { // TOKEN inválido ou não existente
      
    }
    if (error.response.status === 401) { // TOKEN inválido ou não existente
      history.push("/");
    }
    if (error.response.status === 403) { //Usário logado mas sem permissão
      history.push("/jogo-local");
    }
    return Promise.reject(error);
  }
);

function displayErrorInConsole(error: { response: { status: unknown; data: { error: unknown; }; }; })
{
    const errorNum = error.response.status;
    const errorMessage = error.response.data.error;
    console.log(`[REQUEST ERROR ${errorNum}] ${errorMessage}`);
}
