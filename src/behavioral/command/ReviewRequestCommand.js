const Command = require('./Command');

// 審核請求的命令實現
class ReviewRequestCommand extends Command {
    constructor(receiver) {
        super();
        this.receiver = receiver;
    }

    execute() {
        console.log('進行審核...');
        this.receiver.review();
    }

    undo() {
        console.log('撤銷提交...');
        this.receiver.resetStatus('review'); // 假設有個 resetStatus 方法
    }
}

module.exports = ReviewRequestCommand;