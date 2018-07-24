export default class Component{
	constructor(options){
		this.parentNode = options.parentNode;
		setTimeout(()=>{
			this.root = this.render();
		}, 0)
	}
	setState(state){
		this.state = Object.assign(this.state, state);
		let newNode = this.render();
		this.parentNode.replaceChild(newNode, this.root);
		this.root = newNode;
	}
}