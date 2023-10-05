interface Image {
    display(): void;
}

class RealImage implements Image {
    private fileName: string;
    display(): void {
        console.log("Display:", this.fileName);
    }
    private loadFromDisk(fileName: string) {
        console.log("Loading:", fileName);
    }
    constructor(fileName: string) {
        this.fileName = fileName;
        this.loadFromDisk(fileName);
    }
}
class ProxyImage implements Image {
    private realImage: RealImage;
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }
    display(): void {
        if (this.realImage === null) {
            this.realImage = new RealImage(this.fileName);
        }
        // 调用前处理
        // 调用函数
        this.realImage.display();
        // 调用后处理
    }
}