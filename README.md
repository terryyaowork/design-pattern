# Node.js Design Patterns Practice

## 專案簡介

本專案旨在學習和實踐各種設計模式。此部分專注於 Singleton（單例）模式、Factory（工廠）模式與 Strategy（策略）模式的實現與應用。

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
├── tests/                       # 測試文件
│   ├── creational/
│   │   ├── singleton.test.js
│   │   ├── factory.test.js
│   ├── behavioral/
│   │   ├── strategy.test.js
├── .env                         # 環境變量文件
├── .eslintrc.js                 # ESLint 配置
├── .prettierrc                  # Prettier 配置
├── .gitignore                   # Git 忽略文件
├── package.json                 # 專案依賴文件
└── README.md                    # 專案說明文件
```

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

## 工廠模式與策略模式的區別

1. **問題解決的重點不同**：
    - **策略模式** 強調行為的選擇和替換，目的是在運行時根據不同情境選擇不同的算法或行為，關注的是「如何做」。
    - **工廠模式** 強調對象的創建，目的是封裝對象的創建過程，讓客戶端代碼不需要關心具體的實例化邏輯，關注的是「創建什麼」。

2. **適用場景不同**：
    - **策略模式** 適用於需要動態選擇不同算法或行為的場景，例如支付系統中的多種支付方式選擇。
    - **工廠模式** 適用於需要封裝對象創建過程，並且可能創建多種類型對象的場景，例如根據不同的支付方式創建對應的支付處理器。

## 工廠模式與策略模式的組合

在某些情境下，工廠模式與策略模式可以結合使用，這樣可以在創建策略對象時提供更大的靈活性。例如：

### 第三方登入系統

1. **使用工廠模式**：根據不同的登入方式（如 Google、Facebook、GitHub）創建對應的策略對象。
2. **使用策略模式**：動態選擇和執行登入策略，允許在運行時根據用戶選擇的登入方式進行切換。

### 支付系統的擴展

1. **使用工廠模式**：根據不同的支付方式（如信用卡、銀行轉賬、數位錢包）創建對應的支付策略對象。
2. **使用策略模式**：動態選擇和執行支付策略，允許根據不同的條件或用戶選擇在運行時切換支付方式。

## 使用方法

### 安裝依賴

```bash
pnpm install
```

### 運行測試

```bash
pnpm test
```
