// WorkflowReceiver 是具體執行命令的接收者
class WorkflowReceiver {
    constructor() {
        this.status = '';
    }

    submit() {
        console.log('提交請求');
        this.status = 'Request Submitted';
    }

    approve() {
        console.log('核准請求');
        this.status = 'Request Approved';
    }

    review() {
        console.log('審核請求');
        this.status = 'Request Reviewed';
    }

    execute() {
        console.log('執行請求');
        this.status = 'Request Executed';
    }

    failRequest() {
        console.log('請求失敗');
        this.status = 'Request Failed';
        throw new Error('Request Review Failed');
    }

    resetStatus(lastCommand) {
        switch (lastCommand) {
            case 'submit':
                console.log('撤銷提交');
                this.status = ''; // 回到初始狀態
                break;
            case 'approve':
                console.log('撤銷核准');
                this.status = 'Request Submitted'; // 撤銷核准，狀態回到已提交
                break;
            case 'review':
                console.log('撤銷審核');
                this.status = 'Request Approved'; // 撤銷審核，狀態回到已核准
                break;
            case 'execute':
                console.log('撤銷執行');
                this.status = 'Request Reviewed'; // 撤銷執行，狀態回到已審核
                break;
            default:
                this.status = ''; // 如果沒有明確指示，回到初始狀態
        }
    }

    getStatus() {
        return this.status;
    }
}

module.exports = WorkflowReceiver;