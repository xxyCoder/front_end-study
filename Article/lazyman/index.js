// 实现同步和异步任务按顺序执行
class _LazyMan1 {
    constructor(name) {
        this.queue = [];
        this.sayName(name);

        setTimeout(this.next, 0);
    }
    sayName(name) {
        const fn = () => {
            console.log(`Hi,this is ${name}`);
            this.next();
        }
        this.queue.push(fn);
    }
    next() {
        const fn = this.queue.shift();
        fn && fn();
    }
    sleep(time) {
        this.queue.push(this._holdOn(time));
        return this;
    }
    _holdOn(time) {
        return () => {
            setTimeout(() => {
                console.log(`Wake up after ${time} second`);
                this.next();
            }, time * 1000);
        }
    }
    sleepFirst(time) {
        this.queue.unshift(this._holdOn(time));
        return this;
    }
    eat(food) {
        const fn = () => {
            console.log(`Eat ${food}`);
            this.next();
        };
        this.queue.push(fn);
        return this;
    }
}

class _LazyMan2 {
    constructor(name) {
        this.queue = [];
        this.sayName(name);

        // 替代next机制
        Promise.resolve().then(() => {
            let seq = Promise.resolve();
            this.queue.forEach(item => {
                seq = seq.then(item);
            });
        })
    }
    sayName(name) {
        const fn = () => {
            console.log(`Hi,this is ${name}`);
        }
        this.queue.push(fn);
    }
    sleep(time) {
        this.queue.push(this._holdOn(time));
        return this;
    }
    _holdOn(time) {
        return () => new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Wake up after ${time} second`);
                resolve();
            }, time * 1000);
        })
    }
    sleepFirst(time) {
        this.queue.unshift(this._holdOn(time));
        return this;
    }
    eat(food) {
        const fn = () => {
            console.log(`Eat ${food}`);
        };
        this.queue.push(fn);
        return this;
    }
}

class _LazyMan3 {
    constructor(name) {
        this.queue = [];
        this.sayName(name);
        setTimeout(async () => {
            for await (let item of this.queue) {
                item();
            }
        })
    }
    sayName(name) {
        const fn = () => {
            console.log(`Hi,this is ${name}`);
        }
        this.queue.push(fn);
    }
    sleep(time) {
        this.queue.push(this._holdOn(time));
        return this;
    }
    _holdOn(time) {
        return () => new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Wake up after ${time} second`);
                resolve();
            }, time * 1000);
        })
    }
    sleepFirst(time) {
        this.queue.unshift(this._holdOn(time));
        return this;
    }
    eat(food) {
        const fn = () => {
            console.log(`Eat ${food}`);
        };
        this.queue.push(fn);
        return this;
    }
}