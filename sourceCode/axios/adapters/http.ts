import { AxiosInstanceConfig } from "../core/Axios";
import http from 'http'

const isHttpAdaptersSupported = typeof process !== 'undefined' && toString.call(process) === '[object process]';

export default isHttpAdaptersSupported && function(config: AxiosInstanceConfig) {
  return new Promise((resolve, reject) => {
    const options = {
      method: config.method,
      headers: config.headers
    }
    const url = config.baseURL ? config.baseURL + config.url : config.url;
    const req = http.request(url!, options, res => {
      if (req.destroyed) return
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        data: res
      }
      resolve(response)
    })

    req.on("error", () => {
      reject("request error");
    })
    if (config.timeout) {
      const timeout = config.timeout;
      req.setTimeout(timeout, () => {
        reject("timeout error");
      })
    }
    req.end(config.data || null);
  })
}