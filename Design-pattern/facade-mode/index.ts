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

class ShapeMaker {
    private circle: Shape;
    private rectangle: Shape;
    private square: Shape;

    constructor() {
        this.circle = new Circle();
        this.rectangle = new Rectangle();
        this.square = new Square();
    }
    drawCircle() {
        this.circle.draw();
    }
    drawRectangle() {
        this.rectangle.draw();
    }
    drawSquare() {
        this.square.draw();
    }
}