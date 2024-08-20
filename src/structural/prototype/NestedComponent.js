class NestedComponent {
    constructor(details) {
        this.details = details;
    }

    clone() {
        return new NestedComponent(JSON.parse(JSON.stringify(this.details)));
    }
}

module.exports = NestedComponent;