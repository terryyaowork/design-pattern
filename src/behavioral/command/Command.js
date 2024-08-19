// Command 基礎介面，定義所有命令需要實現的 execute 方法
class Command {
    execute() {
        throw new Error('execute() 方法必須被實現');
    }
}

module.exports = Command;