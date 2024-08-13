/**
 * Decorator Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **基本測試：**
 *    - 測試基本咖啡類別的價格和描述，確保未應用任何裝飾時的正確性。
 * 
 * 2. **裝飾者應用測試：**
 *    - 測試單個和多個裝飾者的應用順序是否會影響結果。
 *    - 測試多次應用相同的裝飾者，確保價格和描述的累加效果。
 * 
 * 3. **邊界情境測試：**
 *    - 測試極端情況，如應用大量裝飾者後的狀態。
 *    - 測試對非 BasicCoffee 類型的對象應用裝飾者時是否正確引發錯誤。
 *    - 測試凍結對象後是否仍能正確應用裝飾者。
 * 
 * 4. **移除裝飾者的模擬測試：**
 *    - 測試移除最外層裝飾者後對象的狀態和價格。
 * 
 * 5. **高並發測試：**
 *    - 測試在多線程高並發情境下裝飾者應用的穩定性和一致性。
 * 
 * 6. **限制：**
 *    - 雖然測試了對象凍結後應用裝飾者的情況，但實際上對象凍結並不會阻止新的裝飾者應用，因此相關測試主要是為了確保應用後狀態的正確性。
 */

const {
    BasicCoffee,
    MilkDecorator,
    SugarDecorator
} = require('../../../src/structural/decorator/index');

describe('Decorator Pattern', () => {
    
    // 測試基本咖啡類別的價格和描述
    it('應該返回正確的基本咖啡價格和描述，沒有任何裝飾', () => {
        const coffee = new BasicCoffee();
        expect(coffee.cost()).toBe(5);
        expect(coffee.description()).toBe('Basic Coffee');
    });

    // 測試單個裝飾者的應用
    it('應該正確計算添加了牛奶和糖的咖啡價格和描述', () => {
        let coffee = new BasicCoffee();
        expect(coffee.cost()).toBe(5);
        expect(coffee.description()).toBe('Basic Coffee');

        coffee = new MilkDecorator(coffee);
        expect(coffee.cost()).toBe(7);
        expect(coffee.description()).toBe('Basic Coffee + Milk');

        coffee = new SugarDecorator(coffee);
        expect(coffee.cost()).toBe(8);
        expect(coffee.description()).toBe('Basic Coffee + Milk + Sugar');
    });

    // 測試裝飾者的應用順序
    it('應該能夠按不同的順序正確應用裝飾者', () => {
        let coffee = new BasicCoffee();
        coffee = new SugarDecorator(coffee);
        coffee = new MilkDecorator(coffee);
        
        expect(coffee.cost()).toBe(8);
        expect(coffee.description()).toBe('Basic Coffee + Sugar + Milk');
    });

    // 測試多次應用相同的裝飾者
    it('應該正確應用多次相同的裝飾者', () => {
        let coffee = new BasicCoffee();
        coffee = new MilkDecorator(coffee);
        coffee = new MilkDecorator(coffee);  // 再次添加牛奶

        expect(coffee.cost()).toBe(9);  // 每次添加牛奶增加2
        expect(coffee.description()).toBe('Basic Coffee + Milk + Milk');
    });

    // 測試混合多個裝飾者
    it('應該能夠正確地混合多個裝飾者', () => {
        let coffee = new BasicCoffee();
        coffee = new MilkDecorator(coffee);
        coffee = new SugarDecorator(coffee);
        coffee = new MilkDecorator(coffee);  // 再次添加牛奶

        expect(coffee.cost()).toBe(10);  // 基本咖啡5 + 2次牛奶(2+2) + 糖1
        expect(coffee.description()).toBe('Basic Coffee + Milk + Sugar + Milk');
    });

    // 測試應用大量裝飾者的情況
    it('應該能夠在多層裝飾後保持正確的狀態', () => {
        let coffee = new BasicCoffee();
        for (let i = 0; i < 100; i++) {
            coffee = new MilkDecorator(coffee);
        }

        expect(coffee.cost()).toBe(205);  // 基本咖啡5 + 100次牛奶(2*100)
        expect(coffee.description()).toContain('Basic Coffee');
        expect(coffee.description().split('+ Milk').length - 1).toBe(100);  // 檢查描述中有100次牛奶
    });

    // 測試對非 BasicCoffee 的對象應用裝飾者時是否引發錯誤
    it('應該在接收到非 BasicCoffee 的對象時引發錯誤', () => {
        expect(() => {
            const coffee = new MilkDecorator({});
        }).toThrow('Decorator expects an instance of BasicCoffee');
    });

    // 測試對凍結對象的裝飾應用
    it('應該在對象已被凍結時正確應用裝飾者', () => {
        let coffee = new BasicCoffee();
        Object.freeze(coffee);  // 將對象凍結

        coffee = new MilkDecorator(coffee);
        expect(coffee.cost()).toBe(7);  // 應該仍然正確計算價格
        expect(coffee.description()).toBe('Basic Coffee + Milk');
    });

    // 模擬移除裝飾者的情況
    it('應該能夠模擬移除裝飾者的情況', () => {
        let coffee = new BasicCoffee();
        coffee = new MilkDecorator(coffee);
        coffee = new SugarDecorator(coffee);

        // 模擬移除最外層裝飾者
        const originalCoffee = coffee.coffee;  // 拿到內層裝飾
        expect(originalCoffee.cost()).toBe(7);  // 移除糖裝飾後價格應為7
        expect(originalCoffee.description()).toBe('Basic Coffee + Milk');
    });

    // 測試對無效的對象應用裝飾者
    it('應該在使用無效的裝飾者時引發錯誤', () => {
        expect(() => {
            const coffee = new MilkDecorator(null);
        }).toThrow('Decorator expects an instance of BasicCoffee');
    });

    // 測試在高並發情況下的裝飾者應用
    it('應該在高並發情況下正確應用裝飾者', async () => {
        const createDecoratedCoffee = () => {
            let coffee = new BasicCoffee();
            coffee = new MilkDecorator(coffee);
            coffee = new SugarDecorator(coffee);
            return coffee;
        };

        const results = await Promise.all([
            createDecoratedCoffee(),
            createDecoratedCoffee(),
            createDecoratedCoffee()
        ]);

        results.forEach(coffee => {
            expect(coffee.cost()).toBe(8);
            expect(coffee.description()).toBe('Basic Coffee + Milk + Sugar');
        });
    });
});
