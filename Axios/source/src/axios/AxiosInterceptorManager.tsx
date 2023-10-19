export interface Interceptors<V> {
    onFulfilled?: (value: V) => V | Promise<V>;
    onRejected?: (err: any) => any;
}

export default interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (err: any) => any): number;
    eject(id: number): void;
}
export default class AxiosInterceptorManager<V> {
    public interceptors: Array<Interceptors<V> | null> = [];
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (err: any) => any): number {
        this.interceptors.push({ onFulfilled, onRejected });
        return this.interceptors.length - 1;
    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}