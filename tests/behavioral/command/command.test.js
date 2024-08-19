/**
 * Command Pattern 測試總結
 * 
 * 這些測試的目的是確保命令模式在模擬的工作流處理中能夠正確運行，
 * 包括提交、審核、執行、撤銷等功能的正確性。
 * 
 * 測試情境包括：
 * 
 * 1. **完整的工作流程測試：**
 *    - 測試提交 -> 審核 -> 執行 -> 審核的完整流程，確保工作流程的正確性。
 * 
 * 2. **跳過步驟的處理：**
 *    - 測試跳過某些步驟，確保命令能夠正確執行，並根據現有狀態繼續後續流程。
 * 
 * 3. **各個命令的單獨測試：**
 *    - 測試單獨的提交、審核、執行命令，驗證每個命令的功能是否正常運行。
 * 
 * 4. **工作流程中斷處理：**
 *    - 測試在步驟中斷（如審核失敗）時，命令應正確拋出錯誤並停止工作流程。
 * 
 * 5. **多次執行同一命令：**
 *    - 測試多次執行相同命令是否有副作用，確保狀態不會因多次執行而錯誤改變。
 * 
 * 6. **空命令集的處理：**
 *    - 測試當命令集為空時，系統應該不會嘗試執行任何命令，並保持初始狀態。
 * 
 * 7. **多命令並行執行：**
 *    - 測試並行處理多個命令，確保命令按預期的順序正確執行。
 * 
 * 8. **命令撤銷：**
 *    - 測試命令撤銷功能，確保能夠正確回滾狀態到之前的命令執行點。
 * 
 * 9. **多次撤銷：**
 *    - 測試多次撤銷命令，直到撤銷所有命令並將狀態回滾到初始值。
 * 
 * 10. **無法撤銷的命令：**
 *    - 測試對無法撤銷的命令是否能正確處理並保留狀態。
 * 
 * 11. **歷史紀錄為空時的撤銷操作：**
 *    - 測試當歷史紀錄為空時，撤銷操作應不拋出錯誤。
 * 
 * 12. **並發情況下的多命令處理：**
 *    - 測試並發情況下多個命令的處理，確保命令依然能夠按正確順序執行。
 * 
 * 13. **撤銷後重新執行命令：**
 *    - 測試撤銷命令後再次執行相同命令的功能，確保狀態能夠正確回復。
 * 
 * 14. **高負載情況下的命令執行：**
 *    - 測試在高負載情況下正確執行大量命令，驗證系統在高壓力下的穩定性。
 */

const Invoker = require('../../../src/behavioral/command/Invoker');
const WorkflowReceiver = require('../../../src/behavioral/command/WorkflowReceiver');
const SubmitRequestCommand = require('../../../src/behavioral/command/SubmitRequestCommand');
const ApproveRequestCommand = require('../../../src/behavioral/command/ApproveRequestCommand');
const ReviewRequestCommand = require('../../../src/behavioral/command/ReviewRequestCommand');
const ExecuteRequestCommand = require('../../../src/behavioral/command/ExecuteRequestCommand');

// 設置測試的工作流
describe('Command Pattern - Workflow Tests', () => {
    let receiver;
    let invoker;

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
        receiver = new WorkflowReceiver();
        invoker = new Invoker();
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    // 測試完整工作流程，從提交到審核再到執行
    it('應該正確執行提交、審核、執行與審核工作流程', () => {
        invoker.addCommand(new SubmitRequestCommand(receiver));
        invoker.addCommand(new ApproveRequestCommand(receiver));
        invoker.addCommand(new ExecuteRequestCommand(receiver));
        invoker.addCommand(new ReviewRequestCommand(receiver));
        invoker.executeCommands();
    });

    // 測試跳過某些步驟，如直接審核而跳過提交
    it('應該跳過步驟，狀態不符的情況下繼續後續流程', () => {
        invoker.addCommand(new ApproveRequestCommand(receiver)); // 模擬已經提交的請求，跳過提交
        invoker.addCommand(new ExecuteRequestCommand(receiver));
        invoker.executeCommands();
    });

    // 測試單獨執行提交命令
    it('應該能夠提交請求', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        invoker.setCommand(submitCommand);
        invoker.run();
        expect(receiver.getStatus()).toBe('Request Submitted');
    });

    // 測試單獨執行審核命令
    it('應該能夠審核請求', () => {
        const reviewCommand = new ApproveRequestCommand(receiver);
        invoker.setCommand(reviewCommand);
        invoker.run();
        expect(receiver.getStatus()).toBe('Request Approved');
    });

    // 測試單獨執行執行命令
    it('應該能夠執行請求', () => {
        const executeCommand = new ExecuteRequestCommand(receiver);
        invoker.setCommand(executeCommand);
        invoker.run();
        expect(receiver.getStatus()).toBe('Request Executed');
    });

    // 測試多個命令的工作流程
    it('應該能夠完整執行工作流', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        const reviewCommand = new ApproveRequestCommand(receiver);
        const executeCommand = new ExecuteRequestCommand(receiver);

        invoker.setCommand(submitCommand);
        invoker.run();

        invoker.setCommand(reviewCommand);
        invoker.run();

        invoker.setCommand(executeCommand);
        invoker.run();

        expect(receiver.getStatus()).toBe('Request Executed');
    });

    // 測試在步驟中斷時，是否能夠正確處理異常情況
    it('應該在步驟中斷時進行處理', () => {
        const reviewCommand = new ApproveRequestCommand(receiver);
        invoker.setCommand(reviewCommand);

        // 模擬審核失敗
        expect(() => {
            receiver.failRequest();
            invoker.run();
        }).toThrow('Request Review Failed');
    });

    // 測試多次執行相同命令，確保沒有副作用
    it('應該能夠多次執行相同命令且沒有副作用', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        invoker.setCommand(submitCommand);

        invoker.run();
        expect(receiver.getStatus()).toBe('Request Submitted');

        invoker.run();
        expect(receiver.getStatus()).toBe('Request Submitted');
    });

    // 測試在空命令集情況下，是否能正確處理
    it('應該正確處理空命令集的情況', () => {
        invoker.executeCommands();
        expect(receiver.getStatus()).toBe('');
    });

    // 測試多命令並行執行的正確性
    it('應該能夠並行處理多個命令且順序正確', () => {
        invoker.addCommand(new SubmitRequestCommand(receiver));
        invoker.addCommand(new ApproveRequestCommand(receiver));
        invoker.executeCommands();

        expect(receiver.getStatus()).toBe('Request Approved');
    });

    // 測試撤銷命令
    it('應該能夠撤銷命令的執行', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        invoker.setCommand(submitCommand);
        invoker.run();

        invoker.undo();
        expect(receiver.getStatus()).toBe(''); // 撤銷後狀態應重置
    });

    // 測試多次撤銷命令，直到歷史紀錄為空
    it('應該在提交階段失敗時正確處理', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        invoker.setCommand(submitCommand);
    
        expect(() => {
            receiver.failRequest();  // 直接調用 failRequest 而非模擬
            invoker.run();
        }).toThrow('Request Review Failed');
    });

    // 測試多次撤銷命令，直到歷史紀錄為空
    it('應該能夠多次撤銷命令，直到歷史紀錄為空', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        const approveCommand = new ApproveRequestCommand(receiver);
    
        invoker.setCommand(submitCommand);
        invoker.run();
        invoker.setCommand(approveCommand);
        invoker.run();
    
        invoker.undo(); // 撤銷審核
        expect(receiver.getStatus()).toBe('Request Submitted');
    
        invoker.undo(); // 撤銷提交
        expect(receiver.getStatus()).toBe(''); // 狀態應該重置
    });

    // 測試無法撤銷的命令處理
    it('應該能正確處理無法撤銷的命令', () => {
        const executeCommand = new ExecuteRequestCommand(receiver); // 無撤銷方法
    
        invoker.setCommand(executeCommand);
        invoker.run();
        
        invoker.undo(); // 嘗試撤銷，但不應發生任何變化
        expect(receiver.getStatus()).toBe('Request Reviewed');
    });

    // 測試在空命令集情況下，是否能正確處理
    it('應該正確處理歷史紀錄為空時的撤銷操作', () => {
        expect(() => invoker.undo()).not.toThrow(); // 不應拋出錯誤
    });

    // 測試多命令並行執行的正確性
    it('應該在並發情況下正確處理多個命令', () => {
        const commands = [
            new SubmitRequestCommand(receiver),
            new ApproveRequestCommand(receiver),
            new ExecuteRequestCommand(receiver),
            new ReviewRequestCommand(receiver)
        ];
    
        commands.forEach(cmd => invoker.addCommand(cmd));
    
        invoker.executeCommands();
        expect(receiver.getStatus()).toBe('Request Reviewed');
    });

    // 測試撤銷命令
    it('應該能夠撤銷後重新執行命令', () => {
        const submitCommand = new SubmitRequestCommand(receiver);
        invoker.setCommand(submitCommand);
        invoker.run();
        
        invoker.undo();
        expect(receiver.getStatus()).toBe(''); // 狀態回到初始值
    
        invoker.run();
        expect(receiver.getStatus()).toBe('Request Submitted'); // 恢復原狀
    });

    // 測試提交階段失敗時的處理
    it('應該能夠在高負載情況下正確執行命令', () => {
        const commands = [];
        for (let i = 0; i < 1000; i++) {
            commands.push(new SubmitRequestCommand(receiver));
        }
    
        commands.forEach(cmd => invoker.addCommand(cmd));
        invoker.executeCommands();
    
        expect(receiver.getStatus()).toBe('Request Submitted'); // 驗證最終狀態
    });
});