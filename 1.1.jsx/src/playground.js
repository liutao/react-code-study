import {jsxparse} from './jsxparse.js';
import {gendom} from './gendom.js';

function render(jsx, root){
	let template = jsx;
	if (typeof jsx === 'function') {
		template = jsx();
	}
	let ast = jsxparse(template, this);
	gendom(ast, root);
}

render(`<div id="outer">aaa<App></App></div>`, document.getElementById('root'));
