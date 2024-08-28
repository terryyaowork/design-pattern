class Caretaker {
    constructor() {
        this.mementos = [];
        this.lock = Promise.resolve();  // 用於處理同步問題的鎖
    }

    async addMemento(memento) {
        if (memento instanceof require('./Memento')) {
            // 確保操作以線性方式進行
            this.lock = this.lock.then(async () => {
                this.mementos.push(memento);
            });

            // 等待當前的鎖操作完成
            await this.lock;
        } else {
            throw new Error('Invalid memento object.');
        }
    }

    async getMemento(index) {
        if (index < 0 || index >= this.mementos.length) {
            throw new Error('Memento does not exist.');
        }

        // 確保在正確的時間點檢索狀態
        await this.lock;

        return this.mementos[index];
    }
}

module.exports = Caretaker;
