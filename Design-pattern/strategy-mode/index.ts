interface Strategy {
    doOperation(num1: number, num2: number): number;
}

class OperationAdd implements Strategy {
    doOperation(num1: number, num2: number): number {
        return num1 + num2;
    }
}
class OperationSubtract implements Strategy {
    doOperation(num1: number, num2: number): number {
        return num1 - num2
    }
}

class Context {
    private strategy: Strategy;
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }
    executeStrategy(num1: number, num2: number): number {
        return this.strategy.doOperation(num1, num2);
    }
}