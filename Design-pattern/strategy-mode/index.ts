interface Stragegy {
    doOperation(num1: number, num2: number): number;
}

class OperationAdd implements Stragegy {
    doOperation(num1: number, num2: number): number {
        return num1 + num2;
    }
}
class OperationSubtract implements Stragegy {
    doOperation(num1: number, num2: number): number {
        return num1 - num2
    }
}