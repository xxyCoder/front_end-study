interface Shape {
    draw(): void;
}

class Circle implements Shape {
    private color: string;
    private x: number;
    private y: number;
    private radius: number;

    constructor(color: string) {
        this.color = color;
    }
    setX(x: number): void {
        this.x = x;
    }
    setY(y: number): void {
        this.y = y;
    }
    setRadius(radius: number): void {
        this.radius = radius;
    }

    draw(): void {
        console.log(`Circle draw color ${this.color} x: ${this.x} y: ${this.y} radius: ${this.radius}`);
    }
}

class ShapeFactory {
    private static readonly map: Map<string, Shape>;
    static getCircle(color: string): Shape {
        let c = this.map.get(color);
        if (!c) {
            c = new Circle(color);
            this.map.set(color, c);
            console.log("Create circle of color:", color);
        }
        return c;
    }
}
class Main {
    main(): void {
        const colors = ["red", "green", "yello"]
        for (let i = 0; i < 10; ++i) {
            const c = ShapeFactory.getCircle(colors[i % 3])
        }
    }
}