import Axios from "./Axios";
import { AxiosInstance } from "./types";
import { extend } from './utils'
import { CancelToken, isCancel } from './cancel'

function createInstance(): AxiosInstance {
    const context: Axios<any> = new Axios();
    const instance = Axios.prototype.request.bind(context);
    // 为了能axios.put axios.get方法的调用，故把Axios的原型方法（put、get等）放在request方法上
    extend(instance, Axios.prototype, context);
    // 将拦截器赋值给instance
    extend(instance, context, null);
    return instance as AxiosInstance;
}
const axios = createInstance();
axios.cancelToken = new CancelToken();
axios.isCancel = isCancel;
export default axios;
export * from './types';