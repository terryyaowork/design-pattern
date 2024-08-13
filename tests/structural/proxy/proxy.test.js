/**
 * Proxy Pattern 測試文件
 * 
 * 測試的邏輯和覆蓋的情境如下：
 * 
 * 1. **首次顯示圖像測試：**
 *    - 測試代理首次顯示圖像時，應該正確地加載並顯示圖像。
 * 
 * 2. **後續顯示圖像測試：**
 *    - 測試代理在首次顯示圖像後，應該不再加載圖像，直接顯示。
 * 
 * 3. **多代理對象測試：**
 *    - 測試多個代理對象各自控制其對應的圖像加載和顯示，確保代理的隔離性。
 * 
 * 4. **多次顯示操作測試：**
 *    - 測試代理對象在多次顯示操作後，能否保持狀態，並正確處理顯示請求。
 * 
 * 5. **不同文件名處理測試：**
 *    - 測試代理能否處理並正確顯示不同的圖像文件。
 * 
 * 6. **沒有顯示操作測試：**
 *    - 測試在不調用 `display()` 方法的情況下，代理不應觸發任何加載或顯示行為。
 * 
 * 7. **邊緣情況測試：**
 *    - 測試代理能否處理空字符串作為文件名，並正確加載和顯示。
 */

const { ProxyImage } = require('../../../src/structural/proxy/index');

describe('Proxy Pattern', () => {

    // 測試代理在首次顯示圖像時正確加載並顯示
    it('應該在首次顯示圖像時加載並顯示圖像', () => {
        const proxyImage = new ProxyImage('test_image.png');

        console.log = jest.fn();

        proxyImage.display();

        expect(console.log).toHaveBeenCalledWith('Loading test_image.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying test_image.png');
    });

    // 測試代理在首次顯示後不再加載圖像
    it('應該在後續顯示圖像時不再加載圖像', () => {
        const proxyImage = new ProxyImage('test_image.png');

        console.log = jest.fn();

        proxyImage.display(); // 第一次顯示
        expect(console.log).toHaveBeenCalledWith('Loading test_image.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying test_image.png');
        expect(console.log).toHaveBeenCalledTimes(2); // 總共應有2次調用

        console.log.mockClear(); // 清除之前的調用記錄

        proxyImage.display(); // 第二次顯示
        expect(console.log).toHaveBeenCalledWith('Displaying test_image.png');
        expect(console.log).toHaveBeenCalledTimes(1); // 第二次應該只有1次調用
    });

    // 測試多個代理對象各自控制圖像的加載和顯示
    it('應該能夠為不同的代理對象分別控制加載', () => {
        const proxyImage1 = new ProxyImage('image1.png');
        const proxyImage2 = new ProxyImage('image2.png');

        console.log = jest.fn();

        proxyImage1.display(); // 第一次顯示 image1.png
        proxyImage2.display(); // 第一次顯示 image2.png

        expect(console.log).toHaveBeenCalledWith('Loading image1.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying image1.png');
        expect(console.log).toHaveBeenCalledWith('Loading image2.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying image2.png');
        expect(console.log).toHaveBeenCalledTimes(4); // 總共應該有4次調用
    });

    // 測試代理對象多次顯示操作後的狀態保持
    it('應該能夠在多次顯示操作後保持狀態', () => {
        const proxyImage = new ProxyImage('test_image.png');

        console.log = jest.fn();

        proxyImage.display(); // 第一次顯示
        proxyImage.display(); // 第二次顯示
        proxyImage.display(); // 第三次顯示

        expect(console.log).toHaveBeenCalledWith('Loading test_image.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying test_image.png');
        expect(console.log).toHaveBeenCalledTimes(4); // 總共應該有4次調用，1次加載和3次顯示
    });

    // 測試代理對象能正確處理不同文件名的情境
    it('應該能夠正確處理不同文件名的情境', () => {
        const proxyImage1 = new ProxyImage('image1.png');
        const proxyImage2 = new ProxyImage('image2.png');

        console.log = jest.fn();

        proxyImage1.display(); // 第一次顯示 image1.png
        proxyImage1.display(); // 第二次顯示 image1.png

        proxyImage2.display(); // 第一次顯示 image2.png

        expect(console.log).toHaveBeenCalledWith('Loading image1.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying image1.png');
        expect(console.log).toHaveBeenCalledWith('Displaying image1.png');
        expect(console.log).toHaveBeenCalledWith('Loading image2.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying image2.png');
        expect(console.log).toHaveBeenCalledTimes(5); // 總共應該有5次調用，2次加載和3次顯示
    });

    // 測試在沒有顯示操作時，代理不應觸發任何加載或顯示
    it('不應在沒有顯示操作時加載圖像', () => {
        const proxyImage = new ProxyImage('test_image.png');

        console.log = jest.fn();

        // 這裡不調用 display()，因此不應有任何輸出
        expect(console.log).not.toHaveBeenCalled();
    });

    // 測試代理對象能正確處理空字符串作為文件名
    it('應該能夠處理空字符串的文件名', () => {
        const proxyImage = new ProxyImage('');

        console.log = jest.fn();

        proxyImage.display();

        expect(console.log).toHaveBeenCalledWith('Loading  from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying ');
    });
});
