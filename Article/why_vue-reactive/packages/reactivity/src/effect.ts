export let activeEffect;

export function effect(fn: Function) {
    const _effect = new ReactiveEffect(fn);
    // 默认内部先执行一次
    // 当fn执行的时候，如果内部存在reactive()包裹的响应式数据，实际会陷入get
    // 可以在get中拿到对应activeEffect即_effect变量
    _effect.run();
    // 创建effect函数的返回值
    const runner = _effect.run.bind(_effect);
    // 函数挂载对应的_effect对象
    runner.effect = _effect;

    return runner;
}

export class ReactiveEffect {
    private fn: Function;
    constructor(fn: Function) {
        this.fn = fn;
    }
    run() {
        try {
            activeEffect = this;
            return this.fn();
        } finally {
            activeEffect = undefined;
        }
    }
}

const targetMap = new WeakMap();

export function track(target, type, key) {
    if (!activeEffect) {
        return;
    }
    // 查找是否存在对象
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    // 查找是否存在key对应的set
    let deps = depsMap.get(key);
    if (!deps) {
        depsMap.set(key, (deps = new Set()));
    }
    const shouldTask = !deps.has(activeEffect) && activeEffect;
    if (shouldTask) {
        // 收集依赖
        deps.add(activeEffect);
    }
}

export function trigger(target, type, key, value, oldValue) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    let effects = depsMap.get(key);
    if (!effect) {
        return;
    }
    effects = new Set(effects);
    effects.forEach(effect => {
        if (activeEffect !== effect) {
            effect.run()
        }
    })
}