# Node.js Design Patterns Practice

## 專案簡介

本專案旨在學習和實踐各種設計模式。此部分專注於 Singleton（單例）模式、Factory（工廠）模式、Strategy（策略）模式、Observer（觀察者）模式、Decorator（裝飾者）模式與 Proxy（代理）模式的實現與應用。

## 目錄結構

```
nodejs-design-patterns-practice/
├── src/
│   ├── creational/              # 創建型設計模式
│   │   ├── singleton/
│   │   │   └── index.js
│   │   ├── factory/
│   │   │   ├── index.js
│   │   │   └── ProductFactory.js
│   ├── behavioral/              # 行為型設計模式
│   │   ├── strategy/
│   │   │   ├── index.js
│   │   │   ├── PaymentContext.js
│   │   │   ├── CreditCardStrategy.js
│   │   │   ├── PayPalStrategy.js
│   │   │   └── BankTransferStrategy.js
│   │   ├── observer/
│   │   │   ├── index.js            # 觀察者模式的入口
│   │   │   ├── NewsCategory.js     # 被觀察者類別，代表新聞類別
│   │   │   ├── User.js             # 觀察者類別，代表訂閱的用戶
│   ├── structural/                 # 結構型設計模式
│   │   ├── decorator/
│   │   │   ├── index.js            # 裝飾者模式的入口
│   │   │   ├── BasicCoffee.js      # 基本咖啡類別
│   │   │   ├── Decorator.js        # 裝飾者基類
│   │   │   ├── MilkDecorator.js    # 牛奶裝飾者
│   │   │   ├── SugarDecorator.js   # 糖裝飾者
│   │   ├── proxy/
│   │   │   ├── index.js            # 代理模式的入口
│   │   │   ├── ProxyImage.js       # 代理圖像類別
├── tests/
│   ├── creational/
│   │   ├── singleton.test.js
│   │   ├── factory.test.js
│   ├── behavioral/
│   │   ├── strategy.test.js
│   │   ├── observer.test.js
│   ├── structural/
│   │   ├── decorator.test.js       # 裝飾者模式的測試
│   │   ├── proxy.test.js           # 代理模式的測試
├── .env                         # 環境變量文件
├── .eslintrc.js                 # ESLint 配置
├── .prettierrc                  # Prettier 配置
├── .gitignore                   # Git 忽略文件
├── package.json                 # 專案依賴文件
└── README.md                    # 專案說明文件
```

## TODO 項目

1. **代碼格式化和 linting**:
    - 在專案中增加 linting 和格式化的規則，確保代碼一致性。
    - 可以考慮在 CI/CD 流程中自動檢查代碼風格。

2. **性能優化**:
    - 優化 Observer 和 Strategy 模式中的通知與策略切換，以應對大量訂閱者或策略的情境。

3. **增加測試覆蓋率**:
    - 增加更多邊緣情境和異常處理的測試用例，確保代碼的健壯性。

4. **Refactor**:
    - 未來可能需要重構部分設計模式的實現，以適應更多的業務需求。

## Singleton 模式

### 模式設計

Singleton 模式確保一個類只有一個實例，並提供一個全局訪問點。這樣可以防止在應用程式中多次創建相同的對象，從而節省資源並保持狀態一致性。

### 必要內容

1. **唯一實例**：
    - 使用一個靜態變數來保存類的唯一實例，並確保在應用程式的整個生命周期中只有這一個實例。

2. **全局訪問點**：
    - 提供一個靜態方法或屬性來訪問該唯一實例，並確保其他部分的程式碼可以方便地使用該對象。

3. **防止多重實例化**：
    - 通過將 constructor 設置為私有（或受保護的），防止類的外部程式碼創建新的實例。

### 使用情境

Singleton 模式適用於以下情境：

1. **配置管理**
    - 確保配置對象在整個應用程式中是唯一的，並允許在運行時動態修改配置。

2. **日誌記錄 (Logging)**
    - 確保日誌系統只有一個實例，以統一記錄應用程式的運行狀況。

3. **資料庫連接池 (Database Connection Pool)**
    - 管理一個共享的資料庫連接池，避免創建多個不必要的連接。

4. **狀態管理 (State Management)**
    - 在應用程式中管理全局狀態，確保狀態一致性。

## Factory 模式

### 模式設計

Factory 模式是一種創建型設計模式，用於根據不同的條件或參數創建並返回不同類型的對象。這種模式將對象的創建過程封裝在工廠內部，並且在應用程式中提供統一的接口來創建對象。

### 必要內容

1. **工廠方法**：
    - 工廠方法負責根據傳入的參數或條件來決定創建哪種類型的對象，並將創建邏輯封裝在工廠內部。

2. **多態性**：
    - 不同的子類別實現基類的共同方法，並且可以根據需求添加各自的特有方法，這使得系統更加靈活且易於擴展。

3. **參數驗證**：
    - 工廠方法和子類別的構造函數中進行必要的參數驗證，以確保創建的對象是合法且有效的。

### 使用情境

Factory 模式適用於以下情境：

1. **支付系統**：
    - 根據不同的支付方式（如信用卡、銀行轉賬、PayPal 等）創建對應的支付處理對象，並在工廠中進行參數驗證。

2. **電商平台**：
    - 根據商品類型創建不同的商品對象，如書籍、電子產品等，並在工廠中進行參數檢查和對象創建。

3. **文件處理系統**：
    - 根據文件類型（如 PDF、Word 等）創建不同的文件處理器，並統一管理這些處理器的創建邏輯。

## Strategy 模式

### 模式設計

Strategy 模式是一種行為型設計模式，用於在運行時動態選擇算法或行為。這種模式將算法封裝在獨立的策略類別中，並且通過上下文類別來管理策略的選擇和執行。

### 必要內容

1. **策略類別**：
    - 每個策略類別實現相同的接口，但內部邏輯不同。這些策略可以是不同的算法、行為或邏輯處理方法。

2. **上下文類別**：
    - 上下文類別負責管理策略的選擇和執行。它提供了一個接口，允許客戶端代碼動態設置或切換策略。

3. **動態切換**：
    - 策略模式允許在運行時根據不同條件動態切換策略，而不需要更改客戶端代碼。

### 使用情境

Strategy 模式適用於以下情境：

1. **支付系統**：
    - 根據不同的支付方式應用不同的支付策略，如信用卡支付、銀行轉賬、PayPal 支付等，並允許在運行時動態選擇或切換支付方式。

2. **促銷活動**：
    - 電商平台上的不同促銷活動（如打折、滿減、買一送一）可以作為不同的策略，根據具體情況應用不同的促銷算法。

3. **文件壓縮**：
    - 根據需要使用不同的壓縮算法（如 ZIP、RAR、GZIP）來壓縮文件，並允許在運行時切換壓縮策略。

## Observer 模式

### 模式設計

Observer 模式是一種行為型設計模式，它定義了一種一對多的依賴關係，使得一個對象的狀態改變時，所有依賴於它的對象都會自動收到通知並更新。

### 必要內容

1. **被觀察者（Subject）**：
    - 被觀察者是狀態發生變化時需要通知觀察者的對象。它管理著所有觀察者並負責通知它們。

2. **觀察者（Observer）**：
    - 觀察者是依賴於被觀察者的對象。當被觀察者的狀態發生變化時，觀察者會收到通知並執行相應的行為。

3. **通知機制**：
    - 當被觀察者的狀態改變時，它會自動通知所有已訂閱的觀察者，通常通過調用觀察者的 `update` 方法來實現。

### 使用情境

Observer 模式適用於以下情境：

1. **事件驅動架構**：
    - 在事件驅動的系統中，當一個事件發生時，所有依賴該事件的對象都會自動收到通知並響應。

2. **數據變更通知**：
    - 在數據變更時，通知所有相關的對象更新其狀態。例如，在 MVC 架構中，當模型數據發生變化時，視圖需要自動更新。

3. **多訂閱者系統**：
    - 當系統中存在多個訂閱者，且這些訂閱者需要根據某一主體的狀態變化進行反應時。例如，新聞訂閱系統中，當有新新聞發布時，所有訂閱該新聞類別的用戶都會收到通知。

## Decorator 模式

### 模式設計

Decorator 模式是一種結構型設計模式，它允許你在不改變對象結構的情況下，動態地為對象添加新功能。這種模式將功能分層，並將它們分別封裝在不同的裝飾者中，從而達到動態擴展對象功能的目的。

### 必要內容

1. **基類（Component）**：
    - 基類定義了對象的基本行為。這個類別通常是被裝飾的對象。

2. **裝飾者基類（Decorator）**：
    - 裝飾者基類持有一個基類對象的引用，並且它實現了與基類相同的接口。裝飾者基類可以在不改變原有對象的基礎上為其添加新功能。

3. **具體裝飾者（Concrete Decorator）**：
    - 具體裝飾者是裝飾者基類的子類，負責添加具體的功能或行為。

### 使用情境

Decorator 模式適用於以下情境：

1. **動態添加功能**：
    - 當你需要在運行時為對象動態地添加功能，而不希望修改對象本身的代碼。

2. **功能擴展**：
    - 當現有的類別已經提供了核心功能，但你想要在此基礎上增強或擴展功能，而不改變其原有的接口或行為。

3. **UI 元素裝飾**：
    - 在 GUI 應用中，為一個基本的 UI 元素（如按鈕、文本框）動態添加邊框、陰影、顏色等裝飾效果。

### TODO 項目

1. **擴展性測試**:
    - 在未來考慮增加更多的裝飾者類型，以確保 `Decorator` 模式能夠在擴展新功能時仍保持穩定和一致性。

2. **性能測試**:
    - 添加性能測試，特別是當多層嵌套裝飾者或者在高並發環境下，檢查是否存在性能瓶頸。

3. **文檔與示例更新**:
    - 為 `Decorator` 模式添加更詳細的使用文檔，並提供更多實際應用場景的示例，如在前端框架中的應用，或者如何與其他設計模式結合使用。

4. **邊緣情境測試**:
    - 增加對邊緣情境的測試，如在極端條件下的表現（例如應用非常多的裝飾者，或裝飾者鏈條過長時的行為）。

## Proxy 模式

### 模式設計

Proxy 模式是一種結構型設計模式，它允許你在不改變原始對象的情況下，通過代理來控制對象的訪問或行為。代理對象通常扮演中介的角色，負責對真實對象的訪問控制、延遲初始化、性能優化等功能。

### 必要內容

1. **代理對象**：
    - 代理對象代表了對真實對象的控制接口，通過它來管理真實對象的訪問。

2. **延遲加載**：
    - 在需要使用真實對象時，才進行初始化，這種方式可以避免不必要的性能開銷。

3. **訪問控制**：
    - 可以根據需求對對象的訪問進行控制或限制，防止不必要的訪問。

### 使用情境

Proxy 模式適用於以下情境：

1. **遠程代理**：
    - 當需要通過網絡訪問遠程對象時，代理模式可以隱藏底層的網絡通信細節。

2. **虛擬代理**：
    - 在大型圖像或文件的加載過程中，虛擬代理可以在真正加載之前顯示佔位符或延遲加載。

3. **保護代理**：
    - 在安全控制中，代理可以根據用戶的權限來控制對某些敏感資源的訪問。

## 使用方法

### 安裝依賴

```bash
pnpm install
```

### 運行測試

```bash
pnpm test
```
