export interface IFulfilled<V> {
  (value: V): V | Promise<V>
}

export interface IRejected {
  (error: any): any
}

export interface AxiosInterceptorManager<V> {
  use(onFulfilled?: IFulfilled<V> | null, onRejected?: IRejected | null): number;
  eject(id: number): void;
  clear(): void;
  forEach(fn: (h: IHandler<V>) => void): void;
}

export type IHandler<V> = ({ fulfilled?: IFulfilled<V>, rejected?: IRejected } | null)

class InterceptorManager<V> {
  private handlers: IHandler<V>[] = []

  use(fulfilled?: IFulfilled<V>, rejected?: IRejected) {
    this.handlers.push({ fulfilled, rejected });
    return this.handlers.length - 1;
  }
  eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  clear() {
    if (this.handlers) {
      this.handlers = []
    }
  }
  forEach(fn: (h: IHandler<V>) => void) {
    this.handlers.forEach(h => {
      if (h) {
        fn(h);
      }
    })
  }
}

export default InterceptorManager