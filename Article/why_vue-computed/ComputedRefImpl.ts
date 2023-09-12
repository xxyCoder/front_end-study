export class ComputedRefImpl<T> {
    public dep?: Dep = undefined

    private _value!: T
    public readonly effect: ReactiveEffect<T>

    public readonly __v_isRef = true
    public readonly [ReactiveFlags.IS_READONLY]: boolean = false

    public _dirty = true
    public _cacheable: boolean

    constructor(
        getter: ComputedGetter<T>,
        private readonly _setter: ComputedSetter<T>,
        isReadonly: boolean,
        isSSR: boolean
    ) {
        this.effect = new ReactiveEffect(getter, () => {
            if (!this._dirty) {
                this._dirty = true
                triggerRefValue(this)
            }
        })
        this.effect.computed = this
        this.effect.active = this._cacheable = !isSSR
        this[ReactiveFlags.IS_READONLY] = isReadonly
    }

    get value() {
        // the computed ref may get wrapped by other proxies e.g. readonly() #3376
        const self = toRaw(this)
        trackRefValue(self)
        if (self._dirty || !self._cacheable) {
            self._dirty = false
            self._value = self.effect.run()!
        }
        return self._value
    }

    set value(newValue: T) {
        this._setter(newValue)
    }
}