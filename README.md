# Node.js Design Patterns Practice

## 專案簡介

本專案旨在學習和實踐各種設計模式。此部分專注於 Singleton（單例）模式、Factory（工廠）模式、Strategy（策略）模式、Observer（觀察者）模式、Decorator（裝飾者）模式與 Proxy（代理）模式的實現與應用。

## 目錄結構

```plaintext
nodejs-design-patterns-practice/
├── src/
│   ├── creational/                         # 創建型設計模式
│   │   ├── singleton/                      # 單例模式
│   │   │   └── index.js
│   │   ├── factory/                        # 工廠模式
│   │   │   ├── index.js                    # 工廠模式的入口
│   │   │   └── ProductFactory.js           # 定義工廠，根據不同參數生成對應的產品實例
│   ├── behavioral/                         # 行為型設計模式
│   │   ├── command/                        # 命令模式
│   │   │   ├── Invoker.js                  # 命令執行者
│   │   │   ├── WorkflowReceiver.js         # 工作流接收者
│   │   │   ├── SubmitRequestCommand.js     # 提交命令
│   │   │   ├── ApproveRequestCommand.js    # 審核命令
│   │   │   ├── ReviewRequestCommand.js     # 審查命令
│   │   │   └── ExecuteRequestCommand.js    # 執行命令
│   │   ├── strategy/                       # 策略模式
│   │   │   ├── index.js                    # 策略模式的入口
│   │   │   ├── PaymentContext.js           # 根據策略執行對應的支付行為
│   │   │   ├── CreditCardStrategy.js       # 信用卡支付策略
│   │   │   ├── PayPalStrategy.js           # 實現 PayPal 支付策略
│   │   │   └── BankTransferStrategy.js     # 銀行轉帳支付策略
│   │   ├── observer/                       # 觀察者模式
│   │   │   ├── index.js                    # 觀察者模式的入口
│   │   │   ├── NewsCategory.js             # 被觀察者類別，代表新聞類別
│   │   │   ├── User.js                     # 觀察者類別，代表訂閱的用戶
│   │   ├── template_method/                # 模板方法模式
│   │   │   ├── DataProcessor.js            # 通用數據處理基類
│   │   │   ├── CSVDataProcessor.js         # CSV 文件處理實現
│   │   │   └── JSONDataProcessor.js        # JSON 文件處理實現
│   ├── structural/                         # 結構型設計模式
│   │   ├── adapter/                        # 適配器模式
│   │   │   ├── index.js                    # 適配器模式的入口
│   │   │   ├── IPaymentProcessor.js        # 支付接口
│   │   │   ├── PaymentAdapter.js           # 支付適配器類別
│   │   │   ├── OldPaymentSystem.js         # 舊的支付系統
│   │   ├── decorator/                      # 裝飾者模式
│   │   │   ├── index.js                    # 裝飾者模式的入口
│   │   │   ├── BasicCoffee.js              # 基本咖啡類別
│   │   │   ├── Decorator.js                # 裝飾者基類
│   │   │   ├── MilkDecorator.js            # 牛奶裝飾者
│   │   │   ├── SugarDecorator.js           # 糖裝飾者
│   │   ├── facade/                         # 外觀模式
│   │   │   ├── Facade.js                   # 訂單系統的外觀模式
│   │   │   ├── InventoryManager.js         # 庫存管理系統
│   │   │   ├── PaymentProcessor.js         # 支付處理系統
│   │   │   ├── ShippingService.js          # 配送系統
│   │   ├── prototype/                      # 原型模式
│   │   │   ├── NestedComponent.js          # 巢狀 ui 元件
│   │   │   ├── UIComponent.js              # 初始 ui 元件
│   │   ├── proxy/                          # 代理模式
│   │   │   ├── index.js                    # 代理模式的入口
│   │   │   └── ProxyImage.js               # 代理圖像類別
├── tests/
│   ├── creational/                         # 創建型設計模式測試
│   │   ├── singleton.test.js               # 單例模式的測試
│   │   ├── factory.test.js                 # 工廠模式的測試
│   ├── behavioral/                         # 行為型設計模式測試
│   │   ├── command.test.js                 # 命令模式的測試
│   │   ├── observer.test.js                # 觀察者模式的測試
│   │   ├── strategy.test.js                # 策略模式的測試
│   │   ├── template_method.test.js         # 模板模式的測試
│   ├── structural/                         # 結構型設計模式測試
│   │   ├── decorator.test.js               # 裝飾者模式的測試
│   │   ├── proxy.test.js                   # 代理模式的測試
│   │   ├── adapter.test.js                 # 適配器模式的測試
│   │   ├── facade.test.js                  # 外觀模式的測試
├── .env                                    # 環境變量文件
├── .eslintrc.js                            # ESLint 配置
├── .prettierrc                             # Prettier 配置
├── .gitignore                              # Git 忽略文件
├── package.json                            # 專案依賴文件
└── README.md                               # 專案說明文件
```

## 各設計模式概述

### Singleton 模式

#### 模式設計

Singleton 模式確保一個類只有一個實例，並提供一個全局訪問點。這樣可以防止在應用程式中多次創建相同的對象，從而節省資源並保持狀態一致性。

#### 使用情境

1. **配置管理**
    - 確保配置對象在整個應用程式中是唯一的，並允許在運行時動態修改配置。
2. **日誌記錄 (Logging)**
    - 確保日誌系統只有一個實例，以統一記錄應用程式的運行狀況。
3. **資料庫連接池 (Database Connection Pool)**
    - 管理一個共享的資料庫連接池，避免創建多個不必要的連接。
4. **狀態管理 (State Management)**
    - 在應用程式中管理全局狀態，確保狀態一致性。

### Factory 模式

#### 模式設計

Factory 模式是一種創建型設計模式，用於根據不同的條件或參數創建並返回不同類型的對象。這種模式將對象的創建過程封裝在工廠內部，並且在應用程式中提供統一的接口來創建對象。

#### 使用情境

1. **支付系統**：
    - 根據不同的支付方式創建對應的支付處理對象，並在工廠中進行參數驗證。
2. **電商平台**：
    - 根據商品類型創建不同的商品對象，並在工廠中進行參數檢查和對象創建。
3. **文件處理系統**：
    - 根據文件類型創建不同的文件處理器，並統一管理這些處理器的創建邏輯。

### Strategy 模式

#### 模式設計

Strategy 模式是一種行為型設計模式，用於在運行時動態選擇算法或行為。

#### 使用情境

1. **支付系統**：
    - 根據不同的支付方式應用不同的支付策略，如信用卡支付、銀行轉賬、PayPal 支付等。
2. **促銷活動**：
    - 電商平台上的不同促銷活動可以作為不同的策略，根據具體情況應用不同的促銷算法。
3. **文件壓縮**：
    - 根據需要使用不同的壓縮算法來壓縮文件，並允許在運行時切換壓縮策略。

### Observer 模式

#### 模式設計

Observer 模式是一種行為型設計模式，它定義了一種一對多的依賴關係，使得一個對象的狀態改變時，所有依賴於它的對象都會自動收到通知並更新。

#### 使用情境

1. **事件驅動架構**：
    - 在事件驅動的系統中，當一個事件發生時，所有依賴該事件的對象都會自動收到通知並響應。
2. **數據變更通知**：
    - 在數據變更時，通知所有相關的對象更新其狀態。例如，在 MVC 架構中，當模型數據發生變化時，視圖需要自動更新。
3. **多訂閱者系統**：
    - 當系統中存在多個訂閱者，且這些訂閱者需要根據某一主體的狀態變化進行反應時。例如，新聞訂閱系統中，當有新新聞發布時，所有訂閱該新聞類別的用戶都會收到通知。

### Decorator 模式

#### 模式設計

Decorator 模式是一種結構型設計模式，它允許你在不改變對象結構的情況下，動態地為對象添加新功能。

#### 使用情境

1. **動態添加功能**：
    - 當需要在運行時為對象動態地添加功能，而不希望修改對象本身的代碼。
2. **功能擴展**：
    - 當現有的類別已經提供了核心功能，但你想要在此基礎上增強或擴展功能。
3. **UI 元素裝飾**：
    - 在 GUI 應用中，為一個基本的 UI 元素動態添加邊框、陰影、顏色等裝飾效果。

### Proxy 模式

#### 模式設計

Proxy 模式是一種結構型設計模式，它允許你在不改變原始對象的情況下，通過代理來控制對象的訪問或行為。

#### 使用情境

1. **遠程代理**：
    - 代理模式可以隱藏網絡通信細節
2. **虛擬代理**：
    - 在大型圖像或文件的加載過程中，虛擬代理可以在真正加載之前顯示佔位符或延遲加載。
3. **保護代理**：
    - 在安全控制中，代理可以根據用戶的權限來控制對某些敏感資源的訪問。

### Adapter 模式

#### 模式設計

Adapter 模式是一種結構型設計模式，它允許不兼容的接口協同工作，通過適配器將一個類的接口轉換成客戶端期望的另一個接口。

#### 使用情境

1. **舊系統整合**：
    - 當需要將新的系統與現有的舊系統集成時，適配器模式可以有效地協調兩者之間的通信。
2. **API 適配**：
    - 在更換或升級 API 時，使用適配器來保持向後兼容，避免修改現有代碼。
3. **第三方庫整合**：
    - 當需要整合第三方庫並使用不同的接口時，適配器模式可以幫助進行接口的適配和轉換。

### Facade 模式

#### 模式設計

Facade 模式是一種結構型設計模式，它提供了一個統一的接口來對外簡化子系統的交互，隱藏複雜的子系統實現細節，從而讓應用程式更易於使用。

#### 使用情境

1. **訂單處理系統**：
    - 使用 Facade 模式將庫存管理、支付處理、物流配送等子系統進行封裝，對外只提供一個簡單的訂單處理接口。
2. **第三方系統集成**：
    - 通過 Facade 模式將多個第三方 API 的調用進行封裝，對外提供簡單一致的接口來進行操作。
3. **複雜業務邏輯**：
    - 當一個系統涉及多個子系統，且這些子系統之間的互動邏輯較為複雜時，使用 Facade 模式可以減少調用者的認知負擔，避免直接操作各子系統。

### Template Method 模式

#### 模式設計

Template Method 模式是一種行為型設計模式，它定義了一個操作的骨架，並允許子類別在不改變操作結構的情況下重新定義該操作的某些步驟。此模式有助於將重複邏輯抽取到父類別中，並允許具體的子類別自定義一些具體的細節實現。

#### 使用情境

1. **文件處理系統**：
    - 處理不同格式的文件，例如 CSV、JSON，確保文件的讀取、驗證、解析等操作都遵循相同的流程。
2. **數據分析管道**：
    - 定義一個通用的數據處理流程，如數據載入、預處理、分析等，允許每個步驟根據具體的數據格式進行定制化實現。
3. **報表生成**：
    - 生成不同格式的報表，如 PDF、Excel，允許每個報表的格式和內容進行自定義。

### Command 模式

#### 模式設計

Command 模式是一種行為型設計模式，它將請求封裝成對象，從而使你可以用不同的請求、排隊或記錄請求日誌來參數化對象。

#### 使用情境

1. **工作流系統**：
    - 使用 Command 模式實現工作流中的提交、審核、執行和撤銷操作。
2. **撤銷/重做功能**：
    - 提供撤銷和重做功能，允許使用者回溯或重做操作，並管理操作歷史。
3. **批量操作**：
    - 用於批量處理多個命令，允許並行執行多個命令。

### State 模式

#### 模式設計

State 模式是一種行為型設計模式，它允許對象在內部狀態發生改變時改變其行為。當系統中需要根據狀態進行不同的行為操作時，使用 State 模式可以將這些行為封裝在不同的狀態類中。

#### 使用情境

1. **訂單處理系統**：
   - 訂單在不同狀態（如 Pending、Processing、Payment、Delivered、Completed）下具有不同的行為。State 模式通過封裝每個狀態的行為，允許訂單根據其當前狀態進行相應的操作。
2. **工作流程管理**：
   - 當一個工作流需要根據當前的步驟來改變行為時，State 模式可以幫助將每個步驟的邏輯封裝在不同的狀態中，從而更好地控制工作流的流轉。

#### 測試情境

- 測試訂單從 Pending 狀態逐步流轉到 Completed 狀態。
- 測試在特定狀態下進行不允許的操作時，系統會阻止這些操作。
- 測試高併發情境下，訂單的狀態轉換是否正確處理。
- 測試網絡中斷或資源不足時的異常情境處理。

### Prototype 模式

#### 模式設計
Prototype 模式允許對象能夠通過複製來創建新的對象，避免重新初始化類別，提高效能。

#### 使用情境
1. **UI 組件複製**：
    - 根據不同參數快速複製 UI 元件，而不必重新初始化或重新設計。
2. **嵌套結構深層複製**：
    - 深層複製包含複雜嵌套的對象，確保不同對象不共享內部狀態。
3. **效能優化**：
    - 在高效能需求的情境中通過複製現有對象，避免耗時的初始化。
4. **區塊鏈智能合約開發**：
    - Prototype 模式可以用來快速複製智能合約模板。能節省資源，還可以在鏈上複製合約時避免重新部署或初始化的耗時過程，提升合約的部署效率，並確保每個合約副本的行為保持一致。

#### 測試情境
- 測試 UI 組件的複製與修改。
- 測試嵌套對象的深層複製與修改，確保不同對象互不影響。
- 測試邊界情境下的行為，如處理 null、undefined 及極大值。
- 壓力測試：大量對象複製的效能檢查。



## 使用方法

### 安裝依賴

```bash
pnpm install
```

### 運行測試

```bash
pnpm test
```
