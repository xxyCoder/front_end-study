import httpAdapter from './http'
import xhrAdapter from './xhr'


export default {
  getAdapter: () => {
    return httpAdapter || xhrAdapter
  }
}