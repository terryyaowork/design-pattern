const { ProxyImage } = require('../../../src/structural/proxy/index');

describe('Proxy Pattern', () => {
    /**
     * 測試首次顯示圖像時代理的行為。
     * 代理應在第一次顯示圖像時加載並顯示圖像。
     */
    it('應該在首次顯示圖像時加載並顯示圖像', () => {
        const proxyImage = new ProxyImage('test_image.png');

        console.log = jest.fn();

        proxyImage.display();

        expect(console.log).toHaveBeenCalledWith('Loading test_image.png from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying test_image.png');
    });

    /**
     * 測試後續顯示圖像時代理的行為。
     * 代理應在第一次顯示後不再加載圖像。
     */
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

    /**
     * 測試多次創建代理對象並顯示不同圖像。
     * 每個代理應該能夠正確地控制其對應的圖像加載和顯示。
     */
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

    /**
     * 測試代理對象的多次顯示操作。
     * 代理應該在多次顯示後依然保持狀態，不會多次加載圖像。
     */
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

    /**
     * 測試不同文件名的情況。
     * 代理應該能夠正確處理不同文件名並分別加載和顯示圖像。
     */
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

    /**
     * 測試沒有顯示操作的情況。
     * 如果不調用 display，則不應該觸發任何加載或顯示行為。
     */
    it('不應在沒有顯示操作時加載圖像', () => {
        const proxyImage = new ProxyImage('test_image.png');

        console.log = jest.fn();

        // 這裡不調用 display()，因此不應有任何輸出
        expect(console.log).not.toHaveBeenCalled();
    });

    /**
     * 測試邊緣情況：處理空字符串的文件名。
     * 代理應該能夠處理並顯示空字符串的圖像。
     */
    it('應該能夠處理空字符串的文件名', () => {
        const proxyImage = new ProxyImage('');

        console.log = jest.fn();

        proxyImage.display();

        expect(console.log).toHaveBeenCalledWith('Loading  from disk...');
        expect(console.log).toHaveBeenCalledWith('Displaying ');
    });
});
