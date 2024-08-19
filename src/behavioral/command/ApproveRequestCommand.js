const Command = require('./Command');

// 核准請求的命令實現
class ApproveRequestCommand extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    execute() {
        console.log('審核請求...');
        this.receiver.approve();
    }

    undo() {
        console.log('撤銷提交...');
        this.receiver.resetStatus('approve'); // 假設有個 resetStatus 方法
    }
}

module.exports = ApproveRequestCommand;