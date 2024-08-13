/**
 * NewsCategory 類別表示一個新聞類別。
 * 它作為被觀察者，當有新新聞發布時，會通知所有訂閱的觀察者。
 */
class NewsCategory {
    /**
     * @param {string} categoryName - 新聞類別的名稱。
     */
    constructor(categoryName) {
        this.categoryName = categoryName; // 新聞類別的名稱
        this.subscribers = [];            // 訂閱者列表
        this.latestNews = null;           // 最新的新聞
    }

    /**
     * 添加一個訂閱者到訂閱列表中。
     * @param {Object} observer - 要添加的訂閱者。
     */
    subscribe(observer) {
        /**
         * TODO: 檢查訂閱者是否已經訂閱，防止重複訂閱同一新聞類別。
         */
        this.subscribers.push(observer);
    }

    /**
     * 從訂閱列表中移除一個訂閱者。
     * @param {Object} observer - 要移除的訂閱者。
     */
    unsubscribe(observer) {
        /**
         * TODO: 檢查訂閱者是否已訂閱，避免取消未訂閱的訂閱者時出現錯誤。
         */
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
    }

    /**
     * 通知所有訂閱者，告知他們最新的新聞。
     */
    notify() {
        /**
         * TODO: 在大量訂閱者的情況下，考慮引入批量通知或異步通知以提高性能。
         */
        for (const subscriber of this.subscribers) {
            subscriber.update(this.latestNews);
        }
    }

    /**
     * 發布新的新聞，並通知所有訂閱者。
     * @param {string} news - 新的新聞內容。
     */
    publish(news) {
        /**
         * TODO: 探索使用策略模式來處理不同訂閱者只關心特定類型新聞的情況，以使系統更加靈活。
         */
        this.latestNews = `${this.categoryName}: ${news}`;
        this.notify();
    }
}

module.exports = NewsCategory;
