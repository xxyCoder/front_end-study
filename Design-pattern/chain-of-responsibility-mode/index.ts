abstract class AbstractLogger {
    static INFO = 2;
    static DEBUG = 3;
    static ERROR = 1;

    protected level: number;
    // 责任链中下一个元素
    protected nextLogger: AbstractLogger;

    protected abstract write(message: string): void;

    setNextLogger(nextLogger: AbstractLogger): void {
        this.nextLogger = nextLogger;
    }

    logMessage(level: number, message: string): void {
        if (this.level <= level) {
            this.write(message);
        }
        if (this.nextLogger != undefined) {
            this.nextLogger.logMessage(level, message);
        }
    }
}

class ConsoleLogger extends AbstractLogger {
    constructor(level: number) {
        super();
        this.level = level;
    }

    protected write(message: string): void {
        console.log("Console Logger:", message);
    }
}
class ErrorLogger extends AbstractLogger {
    constructor(level: number) {
        super();
        this.level = level;
    }
    protected write(message: string): void {
        console.log("Error Logger:", message);
    }
}
class FileLogger extends AbstractLogger {
    constructor(level: number) {
        super();
        this.level = level;
    }
    protected write(message: string): void {
        console.log("File Logger:", message);
    }
}

class Main {
    main(): void {
        const errorLogger: AbstractLogger = new ErrorLogger(AbstractLogger.ERROR);
        const fileLogger: AbstractLogger = new FileLogger(AbstractLogger.DEBUG);
        const consoleLogger: AbstractLogger = new ConsoleLogger(AbstractLogger.DEBUG)

        fileLogger.setNextLogger(consoleLogger);
        consoleLogger.setNextLogger(errorLogger);
    }
}