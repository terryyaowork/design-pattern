class Connection {
    constructor(id) {
        this.id = id;
        this.active = true;
    }

    async connect() {
        console.log(`Connection ${this.id} is now active.`);
        this.active = true;
    }

    async disconnect() {
        console.log(`Connection ${this.id} is now inactive.`);
        this.active = false;
    }

    isActive() {
        return this.active;
    }
}

module.exports = Connection;
