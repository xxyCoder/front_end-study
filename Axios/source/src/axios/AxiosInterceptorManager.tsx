export interface Interceptors<V> {
    onFullfilled?: (value: V) => V | Promise<V>;
    onRejected?: (err: any) => any;
}

export default interface AxiosInterceptorManager<V> {
    use(onFullfilled?: (value: V) => V | Promise<V>, onRejected?: (err: any) => any): number;
    eject(id: number): void;
}
export default class AxiosInterceptorManager<V> {
    public interceptors: Array<Interceptors<V> | null> = [];
    use(onFullfilled?: (value: V) => V | Promise<V>, onRejected?: (err: any) => any): number {
        this.interceptors.push({ onFullfilled, onRejected });
        return this.interceptors.length - 1;
    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}