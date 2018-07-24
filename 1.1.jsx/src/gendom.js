import ComponentCollection from './ComponentCollection.js';
import {createElement} from './dom.js';

export function gendom(ast, parent){
	if (ast.isComponent) {
		new ComponentCollection[ast.type]({parentNode: parent})
		return;
	}
	let el = createElement(ast, false, function(fn, ...args){fn.apply(null, ...args)});
	if (ast.children) {
		ast.children.forEach((child)=>{
			gendom(child, el);
		});
	}
	
	parent.appendChild(el);
	return el;
}