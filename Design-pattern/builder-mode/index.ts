// 食物包装
interface Packing {
    pack(): string;
}
// 食物条目
interface Item {
    name?(): string;
    packing(): Packing;
    price(): number;
}

class Wrapper implements Packing {
    pack(): string {
        return "wrapper"
    }
}
class Bottle implements Packing {
    pack(): string {
        return "Bottle"
    }
}

abstract class Burger implements Item {
    packing(): Packing {
        return new Wrapper()
    }
    abstract price(): number;
}
abstract class ColdDrink implements Item {
    packing(): Packing {
        return new Bottle();
    }
    abstract price(): number;
}

class VegBurger extends Burger {
    price(): number {
        return 25.0;
    }
    name(): string {
        return "Veg Burger"
    }
}
class ChickenBurger extends Burger {
    price(): number {
        return 50.5;
    }
    name(): string {
        return "Chicke nBurger"
    }
}

class Coke extends ColdDrink {
    price(): number {
        return 30.0;
    }
    name(): string {
        return "Coke";
    }
}
class Pepsi extends ColdDrink {
    price(): number {
        return 35.5
    }
    name(): string {
        return "Pepsi";
    }
}

class Meal {
    items: Array<Item> = [];
    addItem(item: Item): void {
        this.items.push(item)
    }
    getCost(): number {
        let sum = 0;
        this.items.forEach(item => sum += item.price());
        return sum;
    }
}

class MealBuilder {
    prepareVegMeal(): Meal {
        const meal = new Meal();
        meal.addItem(new VegBurger());
        meal.addItem(new Coke());
        return meal;
    }
}