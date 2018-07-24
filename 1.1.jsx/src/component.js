export default class Component{
	constructor(options){
		this.parentNode = options.parentNode;
		setTimeout(()=>{
			this.initData();
			this.root = this.render();
		}, 0)
	}
	initData(){
		Object.assign(this, this.state);
	}
	setState(state){
		this.state = Object.assign(this.state, state);
		this.initData();
		let newNode = this.render();
		this.parentNode.replaceChild(newNode, this.root);
		this.root = newNode;
	}
}