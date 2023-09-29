interface Shape {
    draw(): void;
}

class Rectangle implements Shape {
    draw(): void {
        console.log("Shape: Rectangle");
    }
}
class Circle implements Shape {
    draw(): void {
        console.log("Shape: Circle");
    }
}
abstract class ShapeDecorator implements Shape {
    protected decoratedShape: Shape;
    constructor(decoratedShape: Shape) {
        this.decoratedShape = decoratedShape;
    }
    draw(): void {
        this.decoratedShape.draw()
    }
}

class RedShapeDecorator extends ShapeDecorator {
    constructor(decoratedShape: Shape) {
        super(decoratedShape);
    }
    draw(): void {
        this.decoratedShape.draw();
        this.setRedBorder(this.decoratedShape)
    }
    private setRedBorder(decoratedShape: Shape): void {
        console.log("Border color: Red")
    }
}

const circle = new Circle();
const redCircle = new RedShapeDecorator(new Circle());
const redRectangle = new RedShapeDecorator(new Rectangle());

circle.draw();
redCircle.draw();
redRectangle.draw();