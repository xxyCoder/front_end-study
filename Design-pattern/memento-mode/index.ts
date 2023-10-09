class Memento {
    private state: string;
    constructor(state: string) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
}

class Originator {
    private state: string;
    setState(state: string): void {
        this.state = state
    }
    getState(): string {
        return this.state
    }
    saveStateToMemento(): Memento {
        return new Memento(this.state);
    }
    getStateFromMemento(memento: Memento) {
        this.state = memento.getState();
    }
}