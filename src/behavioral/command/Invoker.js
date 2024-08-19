// Invoker 負責呼叫命令
class Invoker {
    constructor() {
        this.history = [];  // 初始化 history
        this.commands = [];
    }

    addCommand(command) {
        this.command = command;
        this.run();
    }

    executeCommands() {
        this.history.forEach(cmd => cmd.execute());
    }

    setCommand(command) {
        this.command = command;
    }

    run() {
        this.command.execute();
        this.history.push(this.command); // 記錄執行過的命令
    }

    undo() {
        const lastCommand = this.history.pop();
        if (lastCommand && typeof lastCommand.undo === 'function') {
            lastCommand.undo(); // 撤銷命令時已處理 resetStatus
        }
    }
}

module.exports = Invoker;