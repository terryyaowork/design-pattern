const Memento = require('./Memento');

class Originator {
    constructor() {
        this.state = '';
        this.lock = Promise.resolve();  // 用於處理同步問題的簡單鎖
    }

    async setState(state) {
        if (typeof state !== 'string' && typeof state !== 'object') {
            throw new Error('Invalid state type.');
        }

        // 確保狀態設定操作按順序執行
        this.lock = this.lock.then(async () => {
            console.log(`Setting state to: ${state}`);
            this.state = state;
        });

        // 等待當前的鎖操作完成
        await this.lock;
    }

    async getState() {
        return this.state;
    }

    async createMemento() {
        console.log('Creating Memento with current state.');
        return new Memento(this.state);
    }

    async restoreMemento(memento) {
        if (memento instanceof Memento) {
            // 確保狀態恢復操作按順序執行
            this.lock = this.lock.then(async () => {
                this.state = await memento.getState();
                console.log(`Restored state from Memento: ${this.state}`);
            });

            // 等待當前的鎖操作完成
            await this.lock;
        } else {
            throw new Error('Invalid Memento provided.');
        }
    }
}

module.exports = Originator;
