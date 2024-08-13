/**
 * User 類別表示一個訂閱新聞的用戶。
 * 當用戶訂閱的新聞類別有新新聞發布時，用戶會收到通知。
 */
class User {
    /**
     * @param {string} username - 用戶的名稱。
     */
    constructor(username) {
        this.username = username; // 用戶的名稱
    }
    /**
     * TODO: 考慮進一步抽象 User 類別，以便將來容易擴展不同類型的訂閱者行為。
     */


    /**
     * 當收到新新聞通知時，執行此方法。
     * @param {string} news - 收到的新新聞內容。
     */
    update(news) {
        console.log(`${this.username} received news: ${news}`);
    }
}

module.exports = User;
