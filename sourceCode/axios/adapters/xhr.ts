import { AxiosInstanceConfig } from "../core/Axios";

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

export default isXHRAdapterSupported && function(config: AxiosInstanceConfig) {
  return new Promise((resolve, reject) => {
    let requestData = config.data || null;
    let request: XMLHttpRequest | null = new XMLHttpRequest();
    const fullpath = config.baseURL ? config.baseURL + config.url : config.url;
    request.open(config.method!, fullpath!, true);
    request.timeout = config.timeout ?? 0;
    request.onabort = function() {
      if (!request) return;
      reject("Request aborted");
      request = null;
    }
    request.onerror = function() {
      reject("Network Error");
      request = null;
    }
    request.ontimeout = function() {
      reject("Timeout Error");
      request = null;
    }
    request.send(requestData)
  })
}