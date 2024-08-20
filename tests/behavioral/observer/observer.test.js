/**
 * Observer Pattern 測試總結
 * 
 * 這些測試的目的是確保觀察者模式在一個模擬的新聞訂閱系統中能夠正確運行，
 * 包括訂閱、取消訂閱和發布通知等功能的正確性。
 * 
 * 測試情境包括：
 * 
 * 1. **發布通知給所有訂閱者：**
 *    - 測試當新聞類別發布新消息時，是否所有訂閱了該類別的用戶都能夠正確收到通知。
 * 
 * 2. **只通知已訂閱的用戶：**
 *    - 測試當有新消息發布時，只有訂閱了相關新聞類別的用戶應該收到通知，未訂閱的用戶不應該收到通知。
 * 
 * 3. **取消訂閱的功能：**
 *    - 測試當用戶取消訂閱後，是否不再收到該新聞類別的後續通知，且其他仍然訂閱的用戶應該正常接收通知。
 * 
 * 這些測試情境旨在全面驗證觀察者模式在模擬的新聞訂閱系統中的正確性，確保在面對實際業務需求時，系統能夠有效運行。
 */

const { NewsCategory, User } = require('../../../src/behavioral/observer/index');

describe('Observer Pattern - News Subscription System', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});  // 禁用 console.log
    });

    afterEach(() => {
        jest.restoreAllMocks();  // 恢復 console.log
    });

    /**
     * 測試發布新新聞時是否通知所有訂閱者。
     * 確保所有訂閱了該新聞類別的用戶都能夠正確收到通知。
     */
    it('應該在發布新新聞時通知所有訂閱者', () => {
        const sportsCategory = new NewsCategory('Sports');
        const user1 = new User('John');
        const user2 = new User('Alice');

        // 模擬 console.log 的輸出
        console.log = jest.fn();

        // 訂閱者訂閱新聞類別
        sportsCategory.subscribe(user1);
        sportsCategory.subscribe(user2);

        // 發布新聞，應通知所有訂閱者
        sportsCategory.publish('Team A won the match!');

        // 驗證訂閱者是否收到通知
        expect(console.log).toHaveBeenCalledWith('John received news: Sports: Team A won the match!');
        expect(console.log).toHaveBeenCalledWith('Alice received news: Sports: Team A won the match!');
    });

    /**
     * 測試發布新新聞時是否只通知已訂閱的用戶。
     * 確保只有訂閱了新聞類別的用戶能夠收到通知，其他未訂閱的用戶不應該收到通知。
     */
    it('應該只通知已訂閱的用戶', () => {
        const techCategory = new NewsCategory('Technology');
        const user1 = new User('John');
        const user2 = new User('Alice');

        // 模擬 console.log 的輸出
        console.log = jest.fn();

        // 只有 user1 訂閱了新聞類別
        techCategory.subscribe(user1);

        // 發布新聞，應只通知 user1
        techCategory.publish('New smartphone released!');

        // 驗證訂閱者是否收到通知
        expect(console.log).toHaveBeenCalledWith('John received news: Technology: New smartphone released!');
        expect(console.log).not.toHaveBeenCalledWith('Alice received news: Technology: New smartphone released!');
    });

    /**
     * 測試用戶取消訂閱後是否不再收到通知。
     * 確保取消訂閱的用戶不會收到後續的新聞通知。
     */
    it('應該允許用戶取消訂閱', () => {
        const financeCategory = new NewsCategory('Finance');
        const user1 = new User('John');
        const user2 = new User('Alice');

        // 模擬 console.log 的輸出
        console.log = jest.fn();

        // 訂閱者訂閱新聞類別
        financeCategory.subscribe(user1);
        financeCategory.subscribe(user2);

        // user1 取消訂閱
        financeCategory.unsubscribe(user1);

        // 發布新聞，應只通知仍然訂閱的 user2
        financeCategory.publish('Stock prices are rising!');

        // 驗證訂閱者是否收到通知
        expect(console.log).not.toHaveBeenCalledWith('John received news: Finance: Stock prices are rising!');
        expect(console.log).toHaveBeenCalledWith('Alice received news: Finance: Stock prices are rising!');
    });

    /**
     * 測試在多個訂閱者訂閱和取消訂閱的情況下，系統是否能夠正確處理通知。
     * 確保不論訂閱或取消訂閱的次序如何，通知系統依然能正常運行。
     */
    it('應該正確處理多個訂閱者訂閱和取消訂閱的情況', () => {
        const healthCategory = new NewsCategory('Health');
        const user1 = new User('John');
        const user2 = new User('Alice');
        const user3 = new User('Bob');

        // 模擬 console.log 的輸出
        console.log = jest.fn();

        // 多個用戶訂閱和取消訂閱
        healthCategory.subscribe(user1);
        healthCategory.subscribe(user2);
        healthCategory.unsubscribe(user1);
        healthCategory.subscribe(user3);

        // 發布新聞，應只通知 user2 和 user3
        healthCategory.publish('New health guidelines released!');

        // 驗證訂閱者是否收到通知
        expect(console.log).not.toHaveBeenCalledWith('John received news: Health: New health guidelines released!');
        expect(console.log).toHaveBeenCalledWith('Alice received news: Health: New health guidelines released!');
        expect(console.log).toHaveBeenCalledWith('Bob received news: Health: New health guidelines released!');
    });

    /**
     * 測試異常情況：訂閱或取消訂閱時傳入 null 或 undefined
     */
    it('應該處理異常情況：傳入 null 或 undefined 的訂閱或取消訂閱操作', () => {
        const newsCategory = new NewsCategory('Technology');

        console.log = jest.fn();

        expect(() => newsCategory.subscribe(null)).toThrowError('Subscriber cannot be null or undefined');
        expect(() => newsCategory.unsubscribe(undefined)).toThrowError('Subscriber cannot be null or undefined');
    });

    /**
     * 測試高併發情況下的通知機制
     */
    it('應該在高併發情況下正確通知所有訂閱者', async () => {
        const newsCategory = new NewsCategory('Health');
        const subscribers = Array.from({ length: 1000 }, (_, i) => new User(`User${i + 1}`));
    
        console.log = jest.fn();
    
        // 訂閱所有用戶
        subscribers.forEach(subscriber => newsCategory.subscribe(subscriber));
    
        // 只發佈一次新聞
        newsCategory.publish('New health guidelines released!');
    
        // 驗證所有用戶是否收到了通知
        subscribers.forEach(subscriber => {
            expect(console.log).toHaveBeenCalledWith(`${subscriber.username} received news: Health: New health guidelines released!`);
        });
    });
});
