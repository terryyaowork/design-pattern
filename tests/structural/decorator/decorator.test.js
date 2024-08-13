const {
    BasicCoffee,
    MilkDecorator,
    SugarDecorator
} = require('../../../src/structural/decorator/index');

describe('Decorator Pattern', () => {
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

    it('應該能夠按不同的順序正確應用裝飾者', () => {
        let coffee = new BasicCoffee();
        coffee = new SugarDecorator(coffee);
        coffee = new MilkDecorator(coffee);
        
        expect(coffee.cost()).toBe(8);
        expect(coffee.description()).toBe('Basic Coffee + Sugar + Milk');
    });
});
