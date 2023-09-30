abstract class Observer {
    protected subject: Subject;
    abstract update(): void;
}

class BinaryObserver extends Observer {
    constructor(subject: Subject) {
        super();
        this.subject = subject;
        this.subject.attach(this);
    }
    update(): void {
        console.log("Binary", this.subject.getState())
    }
}

class Subject {
    private observers: Array<Observer> = [];
    private state: number = 0;
    getState(): number {
        return this.state;
    }
    setState(state: number): void {
        this.state = state;
        this.notifyAllObservers();
    }
    attach(obverser: Observer) {
        this.observers.push(obverser);
    }
    notifyAllObservers() {
        this.observers.forEach(ob => ob.update());
    }
}