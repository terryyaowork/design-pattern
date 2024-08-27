/**
 * Interpreter Pattern 測試總結
 * 
 * 這些測試的目的是驗證 Markdown 解析器的正確性，特別是對於不同的 Markdown 語法（如粗體、斜體、標題、
 * 列表、連結、圖片等）能否正確解析為相應的 HTML 格式。
 * 
 * 測試情境包括：
 * 
 * 1. **粗體文字解析：**
 *    - 測試 **bold** 標記是否能正確解析為 <strong> 標籤。
 * 
 * 2. **斜體文字解析：**
 *    - 測試 *italic* 標記是否能正確解析為 <em> 標籤。
 * 
 * 3. **標題解析：**
 *    - 測試 # 標記是否能正確解析為 <h1> 標籤。
 * 
 * 4. **無序列表解析：**
 *    - 測試無序列表是否能正確解析為 <ul> 和 <li> 標籤。
 * 
 * 5. **有序列表解析：**
 *    - 測試有序列表是否能正確解析為 <ol> 和 <li> 標籤。
 * 
 * 6. **連結解析：**
 *    - 測試 [文字](鏈接) 是否能正確解析為 <a> 標籤。
 * 
 * 7. **圖片解析：**
 *    - 測試 ![alt](src) 是否能正確解析為 <img> 標籤。
 * 
 * 8. **混合樣式解析：**
 *    - 測試當多種樣式（如粗體、斜體、連結、圖片）混合時能否正確解析。
 * 
 * 9. **空字串處理：**
 *    - 測試當輸入為空字串時，解析器是否能返回空字串。
 * 
 * 10. **無匹配規則處理：**
 *     - 測試當輸入不符合任何 Markdown 語法時，是否能正確返回原始文本。
 * 
 * 11. **不完整的 Markdown 標記：**
 *     - 測試當輸入的 Markdown 標記不完整時，解析器是否能正確處理並返回原始文本。
 */
const {
    MarkdownInterpreter,
    BoldInterpreter,
    ItalicInterpreter,
    HeaderInterpreter,
    UnorderedListInterpreter,
    OrderedListInterpreter,
    LinkInterpreter,
    ImageInterpreter
} = require('../../../src/behavioral/interpreter/MarkdownInterpreter');
const InterpreterContext = require('../../../src/behavioral/interpreter/InterpreterContext');

describe('Interpreter Pattern - Markdown Parsing', () => {
    let markdownInterpreter;
    let context;

    beforeEach(() => {
        markdownInterpreter = new MarkdownInterpreter();
        markdownInterpreter.addRule(new BoldInterpreter());
        markdownInterpreter.addRule(new ItalicInterpreter());
        markdownInterpreter.addRule(new HeaderInterpreter());
        markdownInterpreter.addRule(new UnorderedListInterpreter());
        markdownInterpreter.addRule(new OrderedListInterpreter());
        markdownInterpreter.addRule(new ImageInterpreter()); // 先解析圖片
        markdownInterpreter.addRule(new LinkInterpreter());  // 後解析連結
    });

    // 1. 粗體文字解析
    it('應該正確解析粗體文字', () => {
        context = new InterpreterContext('This is **bold** text');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('This is <strong>bold</strong> text');
    });

    // 2. 斜體文字解析
    it('應該正確解析斜體文字', () => {
        context = new InterpreterContext('This is *italic* text');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('This is <em>italic</em> text');
    });

    // 3. 標題解析
    it('應該正確解析標題', () => {
        context = new InterpreterContext('# Heading');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<h1>Heading</h1>');
    });

    // 4. 無序列表解析
    it('應該正確解析無序列表', () => {
        context = new InterpreterContext('- item1\n- item2');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<ul><li>item1</li><li>item2</li></ul>');
    });

    // 5. 有序列表解析
    it('應該正確解析有序列表', () => {
        context = new InterpreterContext('1. item1\n2. item2');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<ol><li>item1</li><li>item2</li></ol>');
    });

    // 6. 連結解析
    it('應該正確解析連結', () => {
        context = new InterpreterContext('[Link text](https://example.com)');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<a href="https://example.com">Link text</a>');
    });

    // 7. 圖片解析
    it('應該正確解析圖片', () => {
        context = new InterpreterContext('![alt text](https://example.com/image.png)');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<img src="https://example.com/image.png" alt="alt text" />');
    });

    // 8. 混合樣式解析
    it('應該正確解析混合樣式', () => {
        context = new InterpreterContext('# Heading with **bold**, *italic*, [link](https://example.com), and image ![alt](https://example.com/image.png)');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<h1>Heading with <strong>bold</strong>, <em>italic</em>, <a href="https://example.com">link</a>, and image <img src="https://example.com/image.png" alt="alt" /></h1>');
    });

    // 9. 空字串處理
    it('應該返回空字串當輸入為空', () => {
        context = new InterpreterContext('');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('');
    });

    // 10. 無匹配規則處理
    it('應該返回原始字串當沒有匹配任何規則', () => {
        context = new InterpreterContext('This is a plain text');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('This is a plain text');
    });

    // 11. 不完整的 Markdown 標記處理
    it('應該處理不完整的 Markdown 標記並返回原始文本', () => {
        context = new InterpreterContext('This is **bold* text');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('This is **bold* text');
    });

    it('應該正確解析混合樣式', () => {
        context = new InterpreterContext('# Heading with **bold**, *italic*, [link](https://example.com), and image ![alt](https://example.com/image.png)');
        const result = markdownInterpreter.interpret(context);
        expect(result).toBe('<h1>Heading with <strong>bold</strong>, <em>italic</em>, <a href="https://example.com">link</a>, and image <img src="https://example.com/image.png" alt="alt" /></h1>');
    });
});
