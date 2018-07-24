
// 这里做简单示例，正常应该是所有的html标签
export function isReservedTag(tag){
	return ['div', 'p', 'span', 'a', 'button'].indexOf(tag.toLowerCase()) > -1;
}

export function getValue(str, obj){
	return new Function(`with(this){return ${str};}`).bind(obj)();
}