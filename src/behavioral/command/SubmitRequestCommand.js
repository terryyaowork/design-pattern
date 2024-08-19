const Command = require('./Command');

// 提交請求的命令實現
class SubmitRequestCommand extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    execute() {
        console.log('提交請求...');
        this.receiver.submit();
    }

    undo() {
        console.log('撤銷提交...');
        this.receiver.resetStatus('submit'); // 傳遞命令名稱
    }
}

module.exports = SubmitRequestCommand;