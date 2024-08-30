const Connection = require('./Connection');

class ConnectionPool {
    constructor(size) {
        this.size = size;
        this.availableConnections = [];
        this.usedConnections = new Set();

        for (let i = 0; i < size; i++) {
            this.availableConnections.push(new Connection(i + 1));
        }
    }

    async acquireConnection() {
        if (this.availableConnections.length === 0) {
            throw new Error('No available connections');
        }
        const connection = this.availableConnections.pop();
        this.usedConnections.add(connection);
        await connection.connect();
        return connection;
    }

    async releaseConnection(connection) {
        if (this.usedConnections.has(connection)) {
            await connection.disconnect();
            this.usedConnections.delete(connection);
            this.availableConnections.push(connection);
        } else {
            throw new Error('Connection not recognized');
        }
    }

    getAvailableConnections() {
        return this.availableConnections.length;
    }

    getUsedConnections() {
        return this.usedConnections.size;
    }
}

module.exports = ConnectionPool;
