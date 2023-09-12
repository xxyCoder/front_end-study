export function computed<T>(
    getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
    debugOptions?: DebuggerOptions,
    isSSR = false
) {
    let getter: ComputedGetter<T>
    let setter: ComputedSetter<T>
    // 判断传入参数是否是一个函数
    const onlyGetter = isFunction(getterOrOptions)
    if (onlyGetter) {
        // 如果是函数，将函数作为 getter 传入
        getter = getterOrOptions
        // 同时 setter 会默认在开发环境下赋为一个禁止修改的 log 函数
        setter = __DEV__
            ? () => {
                console.warn('Write operation failed: computed value is readonly')
            }
            : NOOP
    } else {
        // 其他情况就直接将传入的 getter 和 setting 进行赋值就可以了
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }
    // 通过传入的 getter 和 setter 进行初始化
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)

    if (__DEV__ && debugOptions && !isSSR) {
        cRef.effect.onTrack = debugOptions.onTrack
        cRef.effect.onTrigger = debugOptions.onTrigger
    }

    return cRef as any
}