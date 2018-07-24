import Component from './component.js';
import {jsxparse} from './jsxparse.js';
import {gendom} from './gendom.js';

let index = 1;
export default class App extends Component{
	constructor(options){
		super(options);
		this.state = {
			user: {name: 'init name'}
		};
		this.changeName = this.changeName.bind(this);
	}
	changeName(){
		this.setState({user: {name: 'changed name ' + index++}})
	}
	render(){
		return gendom(jsxparse(`<div>{this.state.user.name}<button onClick="this.changeName">修改名字</button></div>`, this), this.parentNode);
	}
}