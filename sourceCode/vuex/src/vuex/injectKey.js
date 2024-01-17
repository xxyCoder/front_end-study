import { inject } from "vue";

export function useStore(injectKey = "store") {
    return inject(injectKey);
}