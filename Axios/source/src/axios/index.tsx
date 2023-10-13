import Axios from "./Axios";
import { AxiosInstance } from "./types";
import { extend } from './utils'

function createInstance(): AxiosInstance {
    const context = new Axios();
    const instance = Axios.prototype.request.bind(context);
    // 为了能axios.put axios.get方法的调用，故把Axios的原型方法（put、get等）放在request方法上
    extend(instance, Axios.prototype, context);

    return instance as AxiosInstance;
}

const axios = createInstance();
export default axios;
export * from './types';