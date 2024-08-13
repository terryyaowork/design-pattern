const { NewsCategory, User } = require('../../../src/behavioral/observer/index');

describe('Observer Pattern - News Subscription System', () => {
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
});
