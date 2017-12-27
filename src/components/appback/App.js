//引入样式文件
import 'antd/dist/antd.css'

require("./common/style/base.css");
require("./common/style/index.css");

import Item from 'components/Item';
import Footer from 'components/Footer';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { Button ,Icon} from 'antd';

class App extends React.Component{

constructor(props) {
    super(props);
    this.state={//数据的形式 id  value  hascompleted
    	todoData:[],
    	inputVal:'',
    	view:"all"
    }
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
    this.onDestory = this.onDestory.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
    this.changeInputVal = this.changeInputVal.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.changeView = this.changeView.bind(this);
    this.itemEditDone = this.itemEditDone.bind(this);
    
 }

handleKeyDownPost(ev){// 在文本框按下enter键的时候执行 s定义数据的形式 按下文本框的时候将值id
// 和状态放进状态中，然后然后根据状态中的数据进行渲染列表  在子列表中根据回传的数据 进行删除元素
	if(ev.keyCode !== 13) return;
	let value = ev.target.value.trim();
	let id = new Date().getTime();
	if(value == ""){
		return
	}
	let todo ={};
	todo.id = id;
	todo.value =value;
	todo.hasCompleted = false;
	let {todoData} =this.state;
    todoData.push(todo);

    this.setState({
    	todoData
    });
   this.state.inputVal = "";

}

	onDestory(todo){//删除指定的元素
		let {todoData} = this.state;
		todoData = todoData.filter((item)=>{
			 return todo.id !==  item.id;
		})
		this.setState({todoData})
	}

	onClearCompleted(){//删除所有完成的事件
		let {todoData} =this.state;
		todoData = todoData.filter((item)=>{
			 return  !item.hasCompleted;
		})
		this.setState({todoData})
	}
	changeInputVal(ev){
		this.setState({
			inputVal:ev.target.value
		})
	}

	toggleAll(e){//将所有的状态选中
		let {checked} = e.target;
		let {todoData} =this.state;
		todoData = todoData.map((el)=>{
			el.hasCompleted = checked;
			return el;
		});
	
		this.setState({todoData})
	}
	onToggle(todo){//判断是哪一条的数据是被勾选上 实现动作的切换
		let {todoData} = this.state;
		todoData = todoData.map((el)=>{
			if(todo.id == el.id){
               el.hasCompleted = !el.hasCompleted;
			}
			 return el;//将状态修改好时候应将值返回出去
		});
		this.setState({todoData})
	}

	changeView(view){
        this.setState({view})
	}
	itemEditDone(todos,vals){
		let {todoData} = this.state;
		todoData.map((el)=>{
			if(el.id == todos.id){
				el.value = vals;
			}
			return el;
		})

	}
	render(){//render是元素的渲染的到页面中的行为
		let items = null;
		let footer = null;
		let section = null;
		let {todoData,inputVal,view} =this.state;
		let leftComplated = todoData.length;
		let {onDestory,onClearCompleted,changeInputVal,onToggle,toggleAll,changeView,itemEditDone} = this;
		let {match:{url},location} = this.props;
		let pathname = location.pathname;
		//通过地址栏的信息进行渲染视图
		items = todoData.filter((el)=>{
			if(el.hasCompleted){//循环的时候，将剩余的条数计算出来
				leftComplated --;
			}
			switch(pathname){
				case '/' :
					return true;
					break;
				case  '/active' :
					return !el.hasCompleted;
					break;
				case '/completed':
				    return el.hasCompleted;
			}
		})

		items = items.map((item,i)=>{// 根据数组的多少就行元素的创建
			
			return (//将列表相关的属性数据和方法传递到子组件中
					 <Item 
					  {...{
					  	onDestory,
					  	todo:item,
					  	onToggle,
					  	itemEditDone,
					  }}  
					 key={i}/>
				)
		});

		if(todoData.length){
			footer=(
				<Footer 
				{...{
					leftComplated,
					onClearCompleted,
					isShowBtn:leftComplated < todoData.length,
					pathname
				}}/>
			);
			section=(
			<section className='main'>
           	   <input 
           	   type="checkbox" 
           	   className='toggle-all'
           	   onChange={toggleAll}
           	    />
           	   <ul className='todo-list'> 
	           	   {items}
           	   </ul>
           	</section>
			)
		}

		return(
           <div>
           	<header className='header'>
				<Button type="primary">Primary</Button>
				<Icon type="wifi" style={{ fontSize: 16, color: '#08c' }} />
           		<input type="text" 
           		value={inputVal} 
           		onChange={changeInputVal}
           		onKeyDown = {this.handleKeyDownPost} 
           		className='new-todo' 
           		placeholder='type somethings here 88'
           		/>	
           	</header>
			{section}
			{footer}
           </div>
		)
	}
}

ReactDOM.render(
  <Router>
	  <div>
	     <Route path="/" component={App}></Route>
	  </div>
  </Router>,
	  document.getElementById('root')
	);

if(module.hot){
	module.hot.accept();
}