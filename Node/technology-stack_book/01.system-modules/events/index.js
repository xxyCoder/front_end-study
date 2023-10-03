const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

emitter.on("wake", function (time) {
    console.log(`早上 ${time} 醒来`)
})

emitter.emit("wake", "7:50")

// 实现基于EventEmitter的自定义类
const oneDayPlanRun = {
    "6:00": function () {
        console.log("6:00 起床")
    },
    "7:00": function () {
        console.log("7:00 学习")
    }
}
function OneDayPlan() {
    EventEmitter.call(this)
}
Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype)
Object.setPrototypeOf(OneDayPlan, EventEmitter)

const oneDayPlan = new OneDayPlan();
oneDayPlan.on("6:00", function () {
    oneDayPlanRun["6:00"]();
})
oneDayPlan.on("7:00", function () {
    oneDayPlanRun["7:00"]();
})

// 错误处理
emitter.on("error", new Error("This is a error"))

// 实现EventEmitter类型
class MyEventEmitter {
    constructor() {
        this.subs = new Map();
    }
    on(name, fn) {
        if (!this.subs.has(name)) {
            this.subs.set(name, []);
        }
        this.subs.get(name).push(fn);
    }
    emit(name, ...args) {
        if (this.subs.has(name)) {
            this.subs.get(name).forEach(cb => {
                cb(...args);
            })
        }
    }
}