export function trackRefValue(ref: RefBase<any>) {
    // 当前 activeEffect 存在，并且允许收集
    if (shouldTrack && activeEffect) {
        // 将传入的 ref ，也就是 computed 对象转为原始对象
        ref = toRaw(ref)
        if (__DEV__) {
            trackEffects(ref.dep || (ref.dep = createDep()), {
                target: ref,
                type: TrackOpTypes.GET,
                key: 'value'
            })
        } else {
            // createDep 会创建一个 Set
            // trackEffects 的作用即是将当前 activeEffect 加入到 ref.dep 中
            trackEffects(ref.dep || (ref.dep = createDep()))
        }
    }
}