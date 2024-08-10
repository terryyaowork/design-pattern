# Node.js Design Patterns Practice

## 專案簡介

本專案旨在學習和實踐各種設計模式。此部分專注於 Singleton（單例）模式的實現與應用。

## 目錄結構

```
nodejs-design-patterns-practice/
├── src/
│   ├── creational/              # 創建型設計模式
│   │   ├── singleton/
│   │   │   └── index.js
├── tests/                       # 測試文件
│   ├── creational/
│   │   ├── singleton.test.js
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

## 使用方法

### 安裝依賴

```bash
pnpm install
```

### 運行測試

```bash
pnpm test
```
