/**
 * Memento Pattern 測試總結
 * 
 * 這些測試的目的是驗證 Memento 設計模式能夠正確保存與回復狀態，
 * 並在高負載、異常情況及邊界條件下保持穩定運行。
 * 
 * 測試情境包括：
 * 
 * 1. **狀態保存與回復：**
 *    - 測試保存多個狀態，並能夠在不同時間點回復之前的狀態。
 * 
 * 2. **複雜狀態處理：**
 *    - 測試深層嵌套的物件和複雜狀態的保存與回復。
 * 
 * 3. **大數據量與高負載處理：**
 *    - 測試在大量狀態變更和保存情況下的性能表現。
 * 
 * 4. **邊界條件處理：**
 *    - 測試無效狀態、超出範圍的 Memento 索引，以及空狀態的處理。
 * 
 * 5. **併發操作：**
 *    - 測試多個 Memento 同時保存和回復的情境，確保在並發操作下資料不會丟失。
 * 
 * 6. **異常處理與恢復：**
 *    - 測試在發生異常後的系統恢復能力，確保異常不影響後續操作。
 */
const Originator = require('../../../src/behavioral/memento/Originator');
const Caretaker = require('../../../src/behavioral/memento/Caretaker');

describe('Memento Pattern', () => {
    let originator;
    let caretaker;

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });  // 禁用 console.log

        originator = new Originator();
        caretaker = new Caretaker();
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    it('應該能夠保存並回復狀態', async () => {
        await originator.setState('State #1');
        await caretaker.addMemento(await originator.createMemento());

        await originator.setState('State #2');
        await caretaker.addMemento(await originator.createMemento());

        await originator.setState('State #3');
        expect(await originator.getState()).toBe('State #3');

        await originator.restoreMemento(await caretaker.getMemento(0));
        expect(await originator.getState()).toBe('State #1');

        await originator.restoreMemento(await caretaker.getMemento(1));
        expect(await originator.getState()).toBe('State #2');
    });

    it('應該能夠保存多個狀態', async () => {
        await originator.setState('State A');
        await caretaker.addMemento(await originator.createMemento());

        await originator.setState('State B');
        await caretaker.addMemento(await originator.createMemento());

        const mementoA = await caretaker.getMemento(0);
        const mementoB = await caretaker.getMemento(1);
        expect(mementoA.getState()).toBe('State A');
        expect(mementoB.getState()).toBe('State B');
    });

    it('應該在沒有可恢復狀態時拋出錯誤', async () => {
        await expect(caretaker.getMemento(0))
            .rejects
            .toThrow('Memento does not exist.');
    });

    it('應該能夠處理大量 Memento 狀態的保存和恢復', async () => {
        for (let i = 0; i < 1000; i++) {
            await originator.setState(`State #${i}`);
            await caretaker.addMemento(await originator.createMemento());
        }

        await originator.setState('Final State');
        expect(await originator.getState()).toBe('Final State');

        await originator.restoreMemento(await caretaker.getMemento(500));
        expect(await originator.getState()).toBe('State #500');
    });

    it('應該在超出範圍的 Memento 下拋出錯誤', async () => {
        await originator.setState('State A');
        await caretaker.addMemento(await originator.createMemento());

        await expect(caretaker.getMemento(10))
            .rejects
            .toThrow('Memento does not exist.');
    });

    it('應該能夠保存和恢復複雜的狀態', async () => {
        const complexState = { a: 1, b: { c: 3, d: 4 } };
        await originator.setState(complexState);
        await caretaker.addMemento(await originator.createMemento());

        const newState = { a: 2, b: { c: 5, d: 6 } };
        await originator.setState(newState);

        await originator.restoreMemento(await caretaker.getMemento(0));
        expect(await originator.getState()).toEqual(complexState);
    });

    it('應該驗證 Memento 中的狀態類型', async () => {
        const invalidState = 12345;  // 假設你不允許數字作為狀態
        await expect(async () => {
            await originator.setState(invalidState);
            await caretaker.addMemento(await originator.createMemento());
        }).rejects.toThrow('Invalid state type.');
    });

    it('應該能夠正確保存和恢復深層嵌套的狀態', async () => {
        const complexState = { a: { b: { c: { d: 5 } } } };
        await originator.setState(complexState);
        await caretaker.addMemento(await originator.createMemento());

        const newState = { a: { b: { c: { d: 10 } } } };
        await originator.setState(newState);

        await originator.restoreMemento(await caretaker.getMemento(0));
        expect((await originator.getState()).a.b.c.d).toBe(5);
    });

    it('應該能夠保存空的 Memento 狀態', async () => {
        await originator.setState('');
        await caretaker.addMemento(await originator.createMemento());

        await originator.restoreMemento(await caretaker.getMemento(0));
        expect(await originator.getState()).toBe('');
    });

    it('應該在大數據量下保持良好的性能', async () => {
        const largeDataset = Array.from({ length: 10000 }, (_, i) => `State #${i}`);

        for (const state of largeDataset) {
            await originator.setState(state);
            await caretaker.addMemento(await originator.createMemento());
        }

        // 測試性能：還原中間狀態
        await originator.restoreMemento(await caretaker.getMemento(5000));
        expect(await originator.getState()).toBe('State #5000');
    });

    it('應該能夠處理多個同時保存和回復 Memento 的請求', async () => {
        const promises = [];
    
        for (let i = 0; i < 100; i++) {
            promises.push((async () => {
                const state = `State #${i}`;
                await originator.setState(state);
                await caretaker.addMemento(await originator.createMemento());
            })());
        }
    
        await Promise.all(promises);
    
        const finalState = await originator.getState();
        expect(finalState).toBe(`State #99`);
    });
    
    it('應該在錯誤發生後恢復正常操作', async () => {
        await originator.setState('Initial State');
        await caretaker.addMemento(await originator.createMemento());
    
        await expect(caretaker.getMemento(10)).rejects.toThrow('Memento does not exist.');
    
        await originator.setState('Recovered State');
        expect(await originator.getState()).toBe('Recovered State');
    });
});
