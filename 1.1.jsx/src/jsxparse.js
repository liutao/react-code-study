const tagStartReg = /^<([a-zA-Z_][\w\-]*)/; // 匹配标签的开头
const tagStartCloseReg = /^\s*(\/?)>/; // 匹配起始标签的结束
const tagAttrReg = /^\s*([a-zA-Z_@:][\w\-\:]*)(?:(?:=)(?:(?:"([^"]*)")|(?:'([^']*)')))?/; // 属性
const tagEndReg = /^<\/([a-zA-Z_][\w\-]*)>/; // 匹配标签结尾
const textReg = /^[^<]*/;
const eventReg = /^on[A-Z]/;
const dataReg = /\{([^{}]+)\}/g;
import {isReservedTag, getValue} from './common.js';

// template to ast
export function jsxparse(template, obj = {}){
	let index = 0; // 模板解析指针位置
	let stack = [];
	let currentAst = {};
	let root = null;
	while(template){
		let tagStart = template.indexOf('<');
		// 如果tagStart等于零，说明匹配到了标签
		if (tagStart === 0 ) {
			let start = template.match(tagStartReg);
			if (start) {
				handelStart(start);
			};
			let end = template.match(tagEndReg);
			if (end) {
				step(end[0].length);
				stack.pop();
				currentAst = stack[stack.length - 1];
			};
		} else {
			let text = template.match(textReg);
			step(text[0].length);
			let ast = {
				type: String,
				value: handleText(text[0].replace(/\s+/, ' '))
			}
			currentAst.children.push(ast);
			ast.parent = currentAst;
		}
	}
	function handleText(text){
		const result = []
		let lastIndex = 0
		let match, index
		while ((match = dataReg.exec(text))) {
			index = match.index
			if (index > lastIndex) {
				result.push(JSON.stringify(text.slice(lastIndex, index)))
			}
			let data = match[1].trim()
			result.push(`${data === null ? '' : data}`)
			lastIndex = index + match[0].length
		}
		if (lastIndex < text.length) {
			result.push(JSON.stringify(text.slice(lastIndex)))
		}
		return getValue(result.join('+'), obj);
	}
	function handelStart(start){
		let ast = {
			isComponent: false,
			type: start[1],
			attributes: {},
			children: []
		};
		// 如果是非保留标签，则是自定义组件
		if (!isReservedTag(ast.type)) {
			ast.isComponent = true;
		}
		// 指针向后移动
		step(start[0].length);

		// 匹配属性
		let end, attr;
		while(!(end = template.match(tagStartCloseReg)) && (attr = template.match(tagAttrReg))){
			// 事件
			if (eventReg.test(attr[1])) {
				let fnStr = attr[2] || attr[3];
				let eventName = attr[1];
				ast.attributes[eventName] = getValue(fnStr, obj);
			} else {
				let attrValStr = attr[2] || attr[3] // 双引号时是attr[2]，单引号时是attr[3]
				if (dataReg.test(attrValStr)) {
					ast.attributes[attr[1]] = getValue(attrValStr, obj);
				} else {
					ast.attributes[attr[1]] = attrValStr;
				}
			}
			step(attr[0].length);
		}
		if (end) {
			step(end[0].length);
			if (ast.isElse) {
				for (let i = currentAst.children.length - 1; i >= 0; i--) {
					let ifNode = currentAst.children[i];
					if (ifNode.if) {
						ifNode.elseCondition = ast;
						break;
					};
				};
			};
			// 不是单标签
			if (!end[1]) {
				if (!root) {
					root = ast;
				} else if (!ast.isElse){
					currentAst.children.push(ast);
					ast.parent = currentAst;
				}
				stack.push(ast);
				currentAst = ast;
			}
		};
	}
	function step(length){
		index += length;
		template = template.slice(length);
	}
	return root;
}
