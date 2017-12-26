import {Link} from 'react-router-dom';
let propTypes = {
	leftComplated:PT.number,
	onClearCompleted:PT.func,
	isShowBtn:PT.bool,
	pathname:PT.string
}
	
export default class Footer extends React.Component{
 constructor(props) {
    super(props);
 }
	render(){
    let {leftComplated,isShowBtn,onClearCompleted,pathname} = this.props;

    let showBtnComponent = null;

    if(isShowBtn){
    	showBtnComponent = (//f父子组件之间的事件的
    			<button className='clear-completed' onClick={
    				onClearCompleted
    			}>
					clear all Completed
				</button>

    		)
    }

		return (
			<footer className='footer'>
				<span className="todo-count">
					<strong>{leftComplated}</strong>
					<span>item left</span>
				</span>
				<ul className="filters">
					 <li>
						<Link to="/" className={pathname === '/' ? 'selected' :''}>All</Link>
					 </li>
				     <li>
				         <Link to="/active" className={pathname === '/active' ? 'selected' :''}>Active</Link>
					 </li>
					 <li>
					    <Link to="/completed" className={pathname === '/completed' ? 'selected' :''}>Completed</Link>
					 </li>
				</ul>
				{showBtnComponent}
			</footer>


			)
	}

}


Footer.protoTypes  = propTypes
