
let propTypes = {
	onDestory:PT.func,
	todo:PT.object,
	onToggle:PT.func,
	itemEditDone:PT.func
}
	

export default class Item extends React.Component{
	 constructor(props) {
	    super(props);
	    this.state = {
	    	isEdit:false,
	    	val:'11'
	    };
	    this.changeEdit = this.changeEdit.bind(this);
	    this.onKeyDown = this.onKeyDown.bind(this);
        this.changeVal = this.changeVal.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.inputKeyDown = this.inputKeyDown.bind(this);
        this.itemEditdo = this.itemEditdo.bind(this);

	}
	changeEdit(){//双击的时候，显示文本框，并且是让todo的值填充
		let {todo} = this.props;
		let val = todo.value;
		this.setState({
			 	isEdit:true,
			 	val
		}, ()=>{this.refs.input.focus();});//this.setState() 改变状态的时候是异步执行的
		//所以在改变状态的同时，执行的动作，应该写在setState的回调函数中
		 // 直接使用原生 API 使 text 输入框获得焦点 使用ref或者dom 元素
		 console.log(this.refs.input)
        
	}
	onKeyDown(e){
		if(e.keyCode != 13) return;
		let {todo} = this.props;
		let val = todo.value;
		this.setState({
			val:val
		});
	}
	changeVal(e){
		this.setState({
			val:e.target.value
		});
	}

	itemEditdo(){//子集的函数名字可以和父集的函数名字一致
		let {todo,itemEditDone} = this.props;
		let val = this.state.val;
		itemEditDone(todo,val);
		this.setState({
			isEdit:false
		});
	}

	inputBlur(e){//文本框失去焦点
		this.itemEditdo()
	}
	inputKeyDown(e){//文本框的回车键 将当前的todo和当前输入框的值
		//传递到app组件 改变todoData的值
		if(e.keyCode != 13) return;
		this.itemEditdo()
	}

	render(){
		let {onDestory,todo,onToggle,itemEditDone} = this.props;// 实现父子组件数据的传递的形式
		let {isEdit,val} = this.state;
		let editClass = "";
		if(isEdit){//根据数据的变化，动态显示类名
			editClass+='editing'
		}else{
			editClass =''
		}
		return (
				<li className={editClass}>
					<div className='view'>
						<input 
							type='checkbox' 
							className='toggle'	
							onChange ={()=>{
								onToggle(todo)
							}}
							checked={todo.hasCompleted}
						/>	
						<label
						onDoubleClick={this.changeEdit}
						onKeyDown={this.onKeyDown}
						>{todo.value}</label>
						<button className="destroy" onClick={()=>{
							onDestory(todo)
						}}>
						</button>
					</div>
					<input 
					 ref="input" 
					 value={val}
					 onChange={this.changeVal}
					 onKeyDown={this.inputKeyDown}
					 onBlur={this.inputBlur}
					 type="text"
					 className="edit"
					  />
				</li>

			)
	}
}


Item.protoTypes  = propTypes