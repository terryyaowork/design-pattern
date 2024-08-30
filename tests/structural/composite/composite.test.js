const Category = require('../../../src/structural/composite/Category');
const Product = require('../../../src/structural/composite/Product');

describe('Composite Pattern - 電商產品分類系統', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    // 測試單一產品顯示
    it('應該顯示單一產品的名稱', async () => {
        const product = new Product('iPhone 14');
        await product.display(); // - iPhone 14
    });

    // 測試類別下有多個產品
    it('應該顯示包含多個產品的類別', async () => {
        const phoneCategory = new Category('手機');
        await phoneCategory.add(new Product('iPhone 14'));
        await phoneCategory.add(new Product('三星 Galaxy S23'));

        await phoneCategory.display();
    });

    // 測試嵌套的類別
    it('應該顯示嵌套的類別結構', async () => {
        const rootCategory = new Category('電子產品');

        const phoneCategory = new Category('手機');
        await phoneCategory.add(new Product('iPhone 14'));
        await phoneCategory.add(new Product('三星 Galaxy S23'));

        const laptopCategory = new Category('筆記型電腦');
        await laptopCategory.add(new Product('MacBook Pro'));
        await laptopCategory.add(new Product('Dell XPS 13'));

        await rootCategory.add(phoneCategory);
        await rootCategory.add(laptopCategory);

        await rootCategory.display();
    });

    // 測試空類別顯示
    it('應該處理並顯示空的類別', async () => {
        const emptyCategory = new Category('空類別');
        await emptyCategory.display();
    });

    // 測試從類別中移除產品
    it('應該從類別中移除特定產品', async () => {
        const phoneCategory = new Category('手機');
        const product1 = new Product('iPhone 14');
        const product2 = new Product('三星 Galaxy S23');

        await phoneCategory.add(product1);
        await phoneCategory.add(product2);

        await phoneCategory.remove(product2);

        await phoneCategory.display();
    });

    // 測試在深度嵌套中正確顯示
    it('應該在深度嵌套中正確顯示所有層級', async () => {
        const rootCategory = new Category('商品');
        const electronicsCategory = new Category('電子產品');
        const laptopCategory = new Category('筆記型電腦');
        const appleLaptopCategory = new Category('Apple 筆記型電腦');

        await appleLaptopCategory.add(new Product('MacBook Air'));
        await appleLaptopCategory.add(new Product('MacBook Pro'));

        await laptopCategory.add(appleLaptopCategory);
        await electronicsCategory.add(laptopCategory);
        await rootCategory.add(electronicsCategory);

        await rootCategory.display();
    });

    // 測試無效輸入
    it('應該處理無效輸入並拋出錯誤', async () => {
        const category = new Category('無效輸入測試');
        await expect(category.add(null)).rejects.toThrow();
        await expect(category.add(undefined)).rejects.toThrow();
    });

    // 測試空字串或特殊字符的產品名稱
    it('應該正確顯示空字串或特殊字符的產品名稱', async () => {
        const specialCharProduct = new Product('!@#$%^&*()');
        await specialCharProduct.display(); // - !@#$%^&*()
    });

    // 測試大規模資料處理
    it('應該正確處理大規模產品數據', async () => {
        const category = new Category('大規模測試');
        for (let i = 0; i < 1000; i++) {
            await category.add(new Product(`Product ${i}`));
        }
        await category.display();
    });

    // 測試移除不存在的產品
    it('應該正確處理移除不存在的產品', async () => {
        const category = new Category('移除不存在的產品');
        const product = new Product('不存在的產品');
        await expect(category.remove(product)).resolves.not.toThrow();
    });

    // 測試空字符串或非字符串類別名稱
    it('應該拋出錯誤當類別名稱為空或非字符串時', async () => {
        await expect(() => new Category('')).toThrow();
        await expect(() => new Category(null)).toThrow();
        await expect(() => new Category(123)).toThrow();
    });

    // 測試空字符串或特殊字符的產品名稱
    it('應該拋出錯誤當產品名稱為空或非字符串時', async () => {
        await expect(() => new Product('')).toThrow();
        await expect(() => new Product(null)).toThrow();
        await expect(() => new Product(123)).toThrow();
    });

    // 測試錯誤的產品類別添加
    it('應該拋出錯誤當嘗試添加無效產品時', async () => {
        const category = new Category('無效輸入測試');
        await expect(category.add({})).rejects.toThrow('Invalid child, it must be an instance of ProductCategory');
        await expect(category.add('invalid')).rejects.toThrow('Invalid child, it must be an instance of ProductCategory');
    });

    it('應該在可接受的時間範圍內顯示大規模產品數據', async () => {
        const category = new Category('大規模測試');
        for (let i = 0; i < 10000; i++) {
            await category.add(new Product(`Product ${i}`));
        }
    
        const startTime = Date.now();
        await category.display();
        const endTime = Date.now();
        
        const executionTime = endTime - startTime;
        console.log(`Execution time: ${executionTime}ms`);
    
        expect(executionTime).toBeLessThan(500); // 設置一個合理的時間限制
    });

    it('應該能夠在高併發情境下正確處理多個產品顯示請求', async () => {
        const category = new Category('併發測試');
        for (let i = 0; i < 1000; i++) {
            await category.add(new Product(`Product ${i}`));
        }
    
        const promises = [];
        for (let i = 0; i < 100; i++) {
            promises.push(category.display());
        }
    
        const startTime = Date.now();
        await Promise.all(promises);
        const endTime = Date.now();
    
        const executionTime = endTime - startTime;
        console.log(`Concurrent execution time: ${executionTime}ms`);
    
        expect(executionTime).toBeLessThan(2000); // 設置一個合理的時間限制
    });
    
    it('應該在大量產品數據下保持良好的性能', async () => {
        const category = new Category('記憶體壓力測試');
        for (let i = 0; i < 100000; i++) {
            await category.add(new Product(`Product ${i}`));
        }
    
        const startTime = Date.now();
        await category.display();
        const endTime = Date.now();
    
        const executionTime = endTime - startTime;
        console.log(`Memory stress execution time: ${executionTime}ms`);
    
        expect(executionTime).toBeLessThan(10000); // 設置一個合理的時間限制
    });
    
    it('應該在高負載下保持合理的內存使用', async () => {
        const category = new Category('內存使用測試');
        for (let i = 0; i < 100000; i++) {
            await category.add(new Product(`Product ${i}`));
        }
    
        const initialMemoryUsage = process.memoryUsage().heapUsed;
        await category.display();
        const finalMemoryUsage = process.memoryUsage().heapUsed;
    
        const memoryIncrease = finalMemoryUsage - initialMemoryUsage;
        console.log(`Memory usage increased by: ${memoryIncrease} bytes`);
    
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 設置一個合理的內存增加限制，例如 50MB
    });
    
});
