import adapters from "../adapters/adapters";
import { AxiosInstanceConfig } from "./Axios";

function throwIfCancellationRequested(config: AxiosInstanceConfig) {
  if (config.cancelToken) {
    throw config.cancelToken.reason
  }
  if (config.signal && config.signal.aborted) {
    throw new Error("CancelError");
  }
}

export default function dispatchRequest(config: AxiosInstanceConfig) {
  throwIfCancellationRequested(config);
  const adapter = adapters.getAdapter();
  return (adapter as Function)(config)
}