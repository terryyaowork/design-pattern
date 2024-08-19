const Command = require('./Command');

// 執行請求的命令實現
class ExecuteRequestCommand extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    execute() {
        console.log('執行請求...');
        this.receiver.execute();
    }

    undo() {
        console.log('撤銷提交...');
        this.receiver.resetStatus('execute'); // 假設有個 resetStatus 方法
    }
}

module.exports = ExecuteRequestCommand;