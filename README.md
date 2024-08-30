# Node.js Design Patterns Practice

## 專案簡介

本專案旨在學習和實踐各種設計模式，涵蓋了 GoF 提出的 23 種設計模式，包括 Singleton（單例）模式、Factory（工廠）模式、Abstract Factory（抽象工廠）模式、Builder（建造者）模式、Prototype（原型）模式、Adapter（適配器）模式、Bridge（橋接）模式、Decorator（裝飾者）模式、Facade（外觀）模式、Flyweight（享元）模式、Proxy（代理）模式、Chain of Responsibility（責任鏈）模式、Command（命令）模式、Interpreter（解釋器）模式、Iterator（迭代器）模式、Mediator（中介者）模式、Memento（備忘錄）模式、Observer（觀察者）模式、State（狀態）模式、Strategy（策略）模式、Template Method（模板方法）模式和 Visitor（訪問者）模式。


## 目錄結構

```plaintext
nodejs-design-patterns-practice/
├── src/
│   ├── behavioral/                         # 行為型設計模式
│   │   ├── chain_of_responsibility/        # 責任鏈模式的具體實現
│   │   │   ├── CartHandler.js              # 購物車處理
│   │   │   ├── DiscountHandler.js          # 折扣處理
│   │   │   ├── PaymentHandler.js           # 支付處理
│   │   │   └── StockHandler.js             # 庫存處理
│   │   ├── command/                        # 命令模式
│   │   │   ├── Invoker.js                  # 命令執行者
│   │   │   ├── WorkflowReceiver.js         # 工作流接收者
│   │   │   ├── SubmitRequestCommand.js     # 提交命令
│   │   │   ├── ApproveRequestCommand.js    # 審核命令
│   │   │   ├── ReviewRequestCommand.js     # 審查命令
│   │   │   └── ExecuteRequestCommand.js    # 執行命令
│   │   ├── interpreter/                    # 解釋器模式
│   │   │   ├── InterpreterContext.js       # 解釋器上下文，用於存儲和管理輸入的文本
│   │   │   └── MarkdownInterpreter.js      # Markdown 解釋器主類別，負責調用各種子解釋器來解析文本 
│   │   ├── mediator/                       # 中介者模式
│   │   │   ├── OrderMediator.js            # 中介者模式主類別，負責協調庫存、支付和配送
│   │   │   ├── Inventory.js                # 庫存管理系統
│   │   │   ├── Payment.js                  # 支付處理系統
│   │   │   └── Shipping.js                 # 配送系統
│   │   ├── memento/                        # Memento 模式
│   │   │   ├── Caretaker.js                # 管理 Memento 的保存和恢復
│   │   │   ├── Memento.js                  # 用於存儲 Originator 狀態的類別，封裝狀態以便保存與回復
│   │   │   └── Originator.js               # 保存和恢復狀態的主類
│   │   ├── observer/                       # 觀察者模式
│   │   │   ├── index.js                    # 觀察者模式的入口
│   │   │   ├── NewsCategory.js             # 被觀察者類別，代表新聞類別
│   │   │   └── User.js                     # 觀察者類別，代表訂閱的用戶
│   │   ├── state/                          # 狀態模式
│   │   │   ├── Order.js                    # 訂單的狀態處理
│   │   │   ├── PendingState.js             # Pending 狀態
│   │   │   ├── ProcessingState.js          # Processing 狀態
│   │   │   ├── PaymentState.js             # Payment 狀態
│   │   │   ├── DeliveredState.js           # Delivered 狀態
│   │   │   ├── CompletedState.js           # Completed 狀態
│   │   │   └── CancelledState.js           # Cancelled 狀態
│   │   ├── strategy/                       # 策略模式
│   │   │   ├── index.js                    # 策略模式的入口
│   │   │   ├── PaymentContext.js           # 根據策略執行對應的支付行為
│   │   │   ├── CreditCardStrategy.js       # 信用卡支付策略
│   │   │   ├── PayPalStrategy.js           # 實現 PayPal 支付策略
│   │   │   └── BankTransferStrategy.js     # 銀行轉帳支付策略
│   │   ├── template_method/                # 模板方法模式
│   │   │   ├── DataProcessor.js            # 通用數據處理基類
│   │   │   ├── CSVDataProcessor.js         # CSV 文件處理實現
│   │   │   └── JSONDataProcessor.js        # JSON 文件處理實現
│   │   ├── visitor/                        # 訪問者模式
│   │   │   ├── data.json                   # 訪問者模式會用到的測試資料
│   │   │   ├── EmployeeData.js             # 處理員工數據的訪問類別
│   │   │   ├── ReportGenerator.js          # 根據訪問者模式生成報告
│   │   │   ├── ReportVisitor.js            # 訪問者類別，用於訪問數據並生成報告
│   │   │   └── SalesData.js                # 處理銷售數據的訪問類別
│   ├── creational/                         # 創建型設計模式
│   │   ├── abstract_factory/               # 抽象工廠模式
│   │   │   ├── AbstractFactory.js          # 抽象工廠基類，定義工廠接口
│   │   │   ├── USFactory.js                # 美國工廠實現，創建美國產品
│   │   │   ├── EUFactory.js                # 歐洲工廠實現，創建歐洲產品
│   │   │   ├── USProductA.js               # 美國產品A實現類
│   │   │   ├── USProductB.js               # 美國產品B實現類
│   │   │   ├── EUProductA.js               # 歐洲產品A實現類
│   │   │   └── EUProductB.js               # 歐洲產品B實現類
│   │   ├── builder/                        # 建造者模式
│   │   │   ├── Report.js                   # 報告對象類，用於封裝報告的數據和結構
│   │   │   ├── ReportBuilder.js            # 構建報告的核心類
│   │   │   └── ReportDirector.js           # 指導具體的報告構建流程
│   │   ├── singleton/                      # 單例模式
│   │   │   └── index.js
│   │   ├── factory/                        # 工廠模式
│   │   │   ├── index.js                    # 工廠模式的入口
│   │   │   └── ProductFactory.js           # 定義工廠，根據不同參數生成對應的產品實例
│   ├── structural/                         # 結構型設計模式
│   │   ├── adapter/                        # 適配器模式
│   │   │   ├── index.js                    # 適配器模式的入口
│   │   │   ├── IPaymentProcessor.js        # 支付接口
│   │   │   ├── PaymentAdapter.js           # 支付適配器類別
│   │   │   └── OldPaymentSystem.js         # 舊的支付系統
│   │   ├── bridge/                         # 新增的 Bridge 模式
│   │   │   ├── CreditCardProcessor.js      # 信用卡處理器
│   │   │   ├── PayPalProcessor.js          # PayPal 處理器
│   │   │   ├── BankTransferProcessor.js    # 銀行轉帳處理器
│   │   │   ├── OnlinePayment.js            # 線上支付類別
│   │   │   └── OfflinePayment.js           # 線下支付類別
│   │   ├── composite/                      # 組合模式
│   │   │   ├── Category.js                 # 類別類別，用於表示產品分類
│   │   │   ├── Product.js                  # 產品類別，用於表示單一產品
│   │   │   ├── ProductCategory.js          # 產品分類基類，提供通用操作和接口，讓產品和類別能夠統一處理
│   │   ├── decorator/                      # 裝飾者模式
│   │   │   ├── index.js                    # 裝飾者模式的入口
│   │   │   ├── BasicCoffee.js              # 基本咖啡類別
│   │   │   ├── Decorator.js                # 裝飾者基類
│   │   │   ├── MilkDecorator.js            # 牛奶裝飾者
│   │   │   └── SugarDecorator.js           # 糖裝飾者
│   │   ├── facade/                         # 外觀模式
│   │   │   ├── Facade.js                   # 訂單系統的外觀模式
│   │   │   ├── InventoryManager.js         # 庫存管理系統
│   │   │   ├── PaymentProcessor.js         # 支付處理系統
│   │   │   └── ShippingService.js          # 配送系統
│   │   ├── prototype/                      # 原型模式
│   │   │   ├── NestedComponent.js          # 巢狀 ui 元件
│   │   │   └── UIComponent.js              # 初始 ui 元件
│   │   ├── proxy/                          # 代理模式
│   │   │   ├── index.js                    # 代理模式的入口
│   │   │   └── ProxyImage.js               # 代理圖像類別
├── tests/
│   ├── behavioral/                         # 行為型設計模式測試
│   │   ├── chain_of_responsibility.test.js # 責任鏈模式的測試
│   │   ├── command.test.js                 # 命令模式的測試
│   │   ├── interpreter.test.js             # 解釋器模式的測試
│   │   ├── mediator.test.js                # 中介者模式的測試
│   │   ├── observer.test.js                # 觀察者模式的測試
│   │   ├── state.test.js                   # 狀態模式的測試
│   │   ├── strategy.test.js                # 策略模式的測試
│   │   ├── template_method.test.js         # 模板模式的測試
│   │   └── visitor.test.js                 # 訪問者模式的測試
│   ├── creational/                         # 創建型設計模式測試
│   │   ├── abstract_factory.test.js        # 抽象工廠模式的測試
│   │   ├── builder.test.js                 # 建造者模式的測試
│   │   ├── factory.test.js                 # 工廠模式的測試
│   │   └── singleton.test.js               # 單例模式的測試
│   ├── structural/                         # 結構型設計模式測試
│   │   ├── adapter.test.js                 # 適配器模式的測試
│   │   ├── bridge.test.js                  # 新增的橋接器模式測試
│   │   ├── decorator.test.js               # 裝飾者模式的測試
│   │   ├── facade.test.js                  # 外觀模式的測試
│   │   ├── prototype.test.js               # 原型模式的測試
│   │   └── proxy.test.js                   # 代理模式的測試
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

### Chain of Responsibility 模式

#### 模式設計

Chain of Responsibility 模式是一種行為型設計模式，允許多個對象有機會處理請求，將這些對象串成一個處理鏈，請求沿著這個鏈傳遞，直到有對象處理它為止。

#### 使用情境

1. **購物車系統**：
    - 在購物車結算流程中，不同的檢查步驟（如庫存檢查、折扣應用、支付驗證）可以設計成獨立的責任鏈節點，根據業務邏輯按順序處理。
2. **事件處理系統**：
    - 事件在多個對象之間傳遞，直到有對象能夠處理這個事件為止，常見於 GUI 應用中。

### Visitor 模式

#### 模式設計

Visitor 模式是一種行為型設計模式，允許你在不改變類別結構的情況下，將新的操作封裝到訪問者對象中。這使得可以在類別中添加新的功能，而不需要更改現有類別的代碼。

#### 使用情境

1. **報告生成系統**：
   - 用於處理不同類型的數據（如員工數據和銷售數據），並基於這些數據生成報告。
2. **數據分析系統**：
   - 根據訪問者模式處理不同數據結構的訪問行為，對數據進行不同的操作，如數據聚合或格式轉換。
3. **文件處理系統**：
   - 訪問不同文件類型，並應用特定的操作，根據文件內容進行轉換或導出。

#### 測試情境

1. **數據訪問測試**：
   - 測試對不同數據集（如員工數據、銷售數據）的訪問，檢查數據有效性並生成報告。
2. **並發訪問測試**：
   - 測試並發訪問情境，確保訪問者能在多個同時執行的任務中正確工作。
3. **異常數據測試**：
   - 測試異常數據情況下的處理，如缺少欄位的數據或無效數據。
4. **性能測試**：
   - 測試在極端數據量下系統的性能表現。

### Interpreter 模式

#### 模式設計

Interpreter 模式是一種行為型設計模式，用於定義一種語言的文法表示，並建立一個解釋器來解釋這些文法。它常用於語法解析、表達式計算或自定義格式的解析等場景。

#### 使用情境

1. **Markdown 解析系統**：
   - 將 Markdown 語法解析為 HTML，允許用戶使用簡單的標記語法撰寫文件。
2. **表達式計算**：
   - 構建解釋器來解析和計算數學表達式。
3. **語言處理**：
   - 用於自定義語言或 DSL（領域特定語言）的構建和解析。

#### 測試情境

1. **Markdown 解析測試**：
   - 測試解釋器能否正確解析 **粗體**、*斜體*、標題、連結等 Markdown 語法。
2. **混合語法解析測試**：
   - 測試解析包含多種 Markdown 樣式的文本，如標題、粗體、斜體等。
3. **不完整標記處理**：
   - 測試不完整的 Markdown 標記是否能正確返回原始文本。
4. **空輸入測試**：
   - 確保在空輸入的情況下，解析器能正確處理並返回空字串。

### Mediator 模式

#### 模式設計

Mediator 模式是一種行為型設計模式，用於減少多個對象之間的直接依賴關係，透過中介者來協調對象之間的交互。這樣可以讓系統中的對象彼此解耦，專注於自身的職責，並將交互邏輯委派給中介者來處理。

#### 使用情境

1. **訂單管理系統**：
    - Mediator 模式可用於協調訂單的各個處理步驟，包括庫存檢查、支付處理和配送安排，減少這些模組之間的耦合。
2. **聊天應用**：
    - 在多人聊天室中，通過中介者統一處理用戶之間的消息傳遞，避免用戶之間的直接通信。
3. **UI 組件協調**：
    - Mediator 模式可應用於複雜的表單或 UI 元件交互，通過中介者協調不同元件的狀態變化和事件處理，避免元件之間的直接依賴。

#### 測試情境

1. **訂單流程測試**：
    - 測試從庫存檢查到支付成功再到配送完成的完整訂單處理流程。
2. **異常處理測試**：
    - 測試在庫存不足、支付失敗或配送地址無效時的錯誤處理和回滾機制。
3. **高併發處理測試**：
    - 測試在高併發情況下，是否能夠正確處理多個訂單並行進行的情境。
4. **部分商品庫存不足測試**：
    - 測試當訂單中部分商品庫存不足時，中介者能否正確中止訂單處理。

### Memento 模式

#### 模式設計

Memento 模式是一種行為型設計模式，它允許對象保存和恢復其狀態，而不違反封裝原則。這樣對象可以回復到先前的狀態，並支持撤銷操作或恢復過去的狀態。

#### 使用情境

1. **狀態回復**：
   - 當需要允許對象在某一時刻保存狀態並在未來進行回復。
2. **撤銷功能**：
   - 在需要撤銷操作的場景中使用，例如編輯器的撤銷操作。

#### 測試情境

1. **狀態保存與回復**：
   - 測試多個狀態的保存，並確保能夠回復到先前的狀態。
2. **異常處理**：
   - 測試在無可用狀態或索引超出範圍時的異常行為。
3. **大數據與高負載**：
   - 測試大量狀態變更時的性能表現，並確保系統穩定運行。
4. **併發操作**：
   - 測試在多個 Memento 同時保存和回復時的資料完整性。

### Builder 模式

#### 模式設計

Builder 模式是一種創建型設計模式，它允許用戶分步構建複雜對象，而不需要關心其內部構建過程的細節。通過將對象的構建邏輯與表示邏輯分離，Builder 模式可以更靈活地創建不同表示的對象。

#### 使用情境

1. **報告生成**：
    - 用於構建具有多個部分（如標題、圖表、表格、注釋等）的報告，允許用戶按步驟創建報告。
2. **UI 組件構建**：
    - 在創建複雜的 UI 組件時，允許用戶按步驟添加屬性和子元件，最終組合成完整的 UI。
3. **文件生成**：
    - 構建複雜文件（如 Word、PDF），允許用戶按步驟添加段落、圖片、表格等元素。

#### 測試情境

1. **報告標題設置測試**：
    - 測試能否正確設置報告的標題，確保 `buildTitle` 方法的正常運行。
2. **圖表和表格添加測試**：
    - 測試能否正確添加圖表和表格，驗證 `buildChart` 和 `buildTable` 方法的正確性。
3. **無設置任何屬性邊界測試**：
    - 測試在無設置任何屬性的情況下能否正確構建報告，驗證默認值處理。
4. **異步構建過程測試**：
    - 測試異步構建過程中的正確性，確保 `build` 方法在處理異步操作時能正確運行。
5. **重複設置標題測試**：
    - 測試多次設置標題時是否能正確覆蓋，驗證標題的唯一性。
6. **大規模數據處理測試**：
    - 測試大規模數據（如 1000 個圖表和表格）能否正確添加，檢驗系統的處理能力。
7. **異常情況處理測試**：
    - 測試異步操作中的錯誤處理，驗證系統在異常情況下的穩定性。

### Bridge 模式

#### 模式設計

Bridge 模式是一種結構型設計模式，它分離抽象部分和它的實現部分，使它們可以各自獨立地變化。這種模式允許你在保持接口不變的情況下，更換底層實現，適應需求的變化。

#### 使用情境

1. **支付系統**：
    - 允許在不改變支付接口的情況下，切換不同的支付處理器，如信用卡、PayPal、銀行轉帳等。
2. **UI 渲染系統**：
    - 不同的圖形介面使用不同的渲染技術，如 2D、3D 或 WebGL，這樣可以輕鬆切換底層實現。
3. **數據庫訪問層**：
    - 在不同的數據庫之間切換，無需更改訪問接口，使系統更具靈活性。

#### 測試情境

1. **線上支付測試（信用卡處理器）**：
    - 測試使用信用卡處理器進行線上支付。
2. **線下支付測試（PayPal 處理器）**：
    - 測試使用 PayPal 處理器進行線下支付。
3. **高併發支付測試**：
    - 測試高併發情境下的支付處理，確保系統穩定。
4. **異步支付錯誤測試**：
    - 測試支付處理器在異步操作中的錯誤處理。
5. **無效參數測試**：
    - 測試傳入無效金額或其他參數時，系統能正確處理並返回錯誤訊息。

### Abstract Factory 模式

#### 模式設計

Abstract Factory 模式是一種創建型設計模式，提供了一個接口來創建一系列相關或依賴對象，而無需指定具體類別。它允許用戶創建一組相互依賴的對象，並將這些對象的具體實現與其使用方式分離開來。

#### 使用情境

1. **跨平台 UI 組件創建**：
    - 當應用程式需要支持多個平台（如 Windows、MacOS、Linux）並且每個平台上的 UI 組件實現不同時，Abstract Factory 可以幫助統一創建和管理這些平台特定的 UI 元件。
2. **產品家族創建**：
    - 當系統需要創建一組相關的產品對象時（例如不同地區的產品），Abstract Factory 可以確保這些產品的一致性並統一管理它們的創建邏輯。
3. **依賴性對象的創建**：
    - 當一個對象的創建依賴於其他對象，且這些依賴對象的類型可以動態變化時，Abstract Factory 可以幫助解耦創建過程，避免在代碼中硬編碼依賴關係。

#### 測試情境

1. **工廠創建測試**：
    - 測試美國和歐洲工廠是否能夠正確創建各自的產品。
2. **產品異步操作測試**：
    - 測試創建的產品是否能夠正確處理異步操作，驗證 `use` 方法的執行。
3. **多產品異步操作測試**：
    - 測試在多產品的異步操作情境下，系統是否能夠正確運行並管理資源。
4. **異常處理測試**：
    - 測試在異步操作超時或發生錯誤時，系統能否正確處理並回滾資源。

### Composite 模式

#### 模式設計

Composite 模式是一種結構型設計模式，它允許你將對象組合成樹狀結構來表示「部分-整體」的層次結構。Composite 讓用戶可以一致地處理單個對象和對象的組合。

#### 使用情境

1. **產品分類系統**：
    - 在電商平台上，Composite 模式可以用來管理產品分類結構，將單一產品和產品類別（包含多個產品或子類別）組織成樹狀結構，便於管理和顯示。
2. **文件系統**：
    - 用於表示文件和文件夾的層次結構，允許對文件和文件夾進行統一處理，例如遍歷、添加或刪除。
3. **UI 組件樹**：
    - 在 GUI 應用中，Composite 模式可以用來組織和管理 UI 元件的層次結構，允許對單個元件和元件組合進行統一處理。

#### 測試情境

1. **單一產品顯示測試**：
    - 測試單一產品的顯示功能，確保能正確顯示產品名稱。
2. **多產品類別顯示測試**：
    - 測試包含多個產品的類別顯示，確保類別中的所有產品名稱能正確顯示。
3. **嵌套類別結構顯示測試**：
    - 測試嵌套類別結構的顯示功能，確保層次結構中的所有產品和類別能正確顯示。
4. **大規模資料處理測試**：
    - 測試大規模產品數據的處理和顯示性能，確保系統能在合理時間內完成處理。
5. **高併發顯示測試**：
    - 測試高併發情境下的顯示性能，確保在多個顯示請求同時進行時，系統能保持良好性能。
6. **內存使用測試**：
    - 測試在高負載下系統的內存使用情況，確保內存使用在合理範圍內。



## 使用方法

### 安裝依賴

```bash
pnpm install
```

### 運行測試

```bash
pnpm test
```
