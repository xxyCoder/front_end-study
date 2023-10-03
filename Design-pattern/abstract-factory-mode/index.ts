interface Shape {
    draw(): void;
}

class Rectangle implements Shape {
    draw(): void {
        console.log("Rectangle draw method");
    }
}
class Square implements Shape {
    draw(): void {
        console.log("Square draw method");
    }
}
class Circle implements Shape {
    draw(): void {
        console.log("Circle draw method");
    }
}

interface Color {
    fill(): void;
}
class Red implements Color {
    fill(): void {
        console.log("Red fill method");
    }
}
class Green implements Color {
    fill(): void {
        console.log("Green fill method");
    }
}

// 抽象工厂
abstract class AbstractFactory {
    abstract getColor(color: string): Color | null;
    abstract getShape(shape: string): Shape | null;
}

class ShapeFactory extends AbstractFactory {
    getShape(shape: string): Shape | null {
        if (shape === "CIRCLE") {
            return new Circle();
        } else if (shape === "RECTANGLE") {
            return new Rectangle();
        } else if (shape === "SQUARE") {
            return new Square()
        } else {
            return null;
        }
    }
    getColor(color: string): Color | null {
        return null;
    }
}
class ColorFactory extends AbstractFactory {
    getColor(color: string): Color | null {
        if (color === "RED") {
            return new Red();
        } else if (color === "GREEN") {
            return new Green();
        } else {
            return null
        }
    }
    getShape(shape: string): Shape | null {
        return null
    }
}

class FactoryProducder {
    static getFactory(type: string): AbstractFactory {
        if (type === "SHAPE") {
            return new ShapeFactory();
        } else {
            return new ColorFactory();
        }
    }
}