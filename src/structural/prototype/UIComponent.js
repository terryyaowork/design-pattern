class UIComponent {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    render() {
        console.log(`Rendering component with width: ${this.width}, height: ${this.height}, color: ${this.color}`);
    }
}

module.exports = UIComponent;