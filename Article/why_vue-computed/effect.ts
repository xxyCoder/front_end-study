export function trackEffects(
    dep: Dep,
    debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
    let shouldTrack = false
    if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
            dep.n |= trackOpBit // set newly tracked
            shouldTrack = !wasTracked(dep)
        }
    } else {
        // Full cleanup mode.
        shouldTrack = !dep.has(activeEffect!)
    }

    if (shouldTrack) {
        // 重点是这里
        dep.add(activeEffect!)
        activeEffect!.deps.push(dep)
        if (__DEV__ && activeEffect!.onTrack) {
            activeEffect!.onTrack({
                effect: activeEffect!,
                ...debuggerEventExtraInfo!
            })
        }
    }
}