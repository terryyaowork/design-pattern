class MarkdownInterpreter {
    constructor() {
        this.rules = [];
    }

    // 增加一個解析規則
    addRule(interpreter) {
        this.rules.push(interpreter);
    }

    
    // 依序應用所有的解析規則來處理輸入的文本
    interpret(context) {
        let result = context.getText();

        // 逐一應用每個規則
        this.rules.forEach(rule => {
            result = rule.interpret(result);
        });

        return result;
    }
}

class BoldInterpreter {
    // 只匹配完整的 **bold**，避免單獨的 * 被錯誤解析
    interpret(text) {
        return text.replace(/\*\*(?!\s)(.+?)(?<!\s)\*\*/g, '<strong>$1</strong>');
    }
}

class ItalicInterpreter {
    // 匹配單個 * 的情況，並確保兩側都有字符，避免不完整標記
    interpret(text) {
        return text.replace(/(?<!\*)\*(?!\*)(\S.*?\S)\*(?!\*)/g, '<em>$1</em>');
    }
}

class HeaderInterpreter {
    interpret(text) {
        return text.replace(/#+\s?(.+)/g, '<h1>$1</h1>');
    }
}

class UnorderedListInterpreter {
    // 解析無序列表並生成 <ul> 和 <li> 元素
    interpret(text) {
        // 修改正則表達式，確保匹配多行無序列表
        return text.replace(/(?:^|\n)(- .+(?:\n- .+)*)/g, (match) => {
            // 將匹配的多行無序列表項拆分，去掉 "- " 開頭，生成 <li> 元素
            const items = match.trim().split('\n').map(item => `<li>${item.substring(2)}</li>`).join('');
            // 返回包含所有 <li> 的 <ul> 標籤
            return `<ul>${items}</ul>`;
        });
    }
}

class OrderedListInterpreter {
    // 解析有序列表並生成 <ol> 和 <li> 元素
    interpret(text) {
        // 修改正則表達式，確保能夠匹配多行有序列表
        return text.replace(/(?:^|\n)(\d+\..+(?:\n\d+\..+)*)/g, (match) => {
            // 將匹配的多行有序列表項目拆分，去掉 "1. " 開頭，生成 <li> 元素
            const items = match.trim().split('\n').map(item => `<li>${item.substring(3)}</li>`).join('');
            // 返回包含所有 <li> 的 <ol> 標籤
            return `<ol>${items}</ol>`;
        });
    }
}

class LinkInterpreter {
    // 匹配並轉換 [文字](鏈接) 為 <a> 標籤
    interpret(text) {
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    }
}

class ImageInterpreter {
    // 匹配並轉換 ![alt](src) 為 <img> 標籤
    interpret(text) {
        // 圖片的正則表達式
        return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    }
}

module.exports = {
    MarkdownInterpreter,
    BoldInterpreter,
    ItalicInterpreter,
    HeaderInterpreter,
    UnorderedListInterpreter,
    OrderedListInterpreter,
    LinkInterpreter,
    ImageInterpreter
};
