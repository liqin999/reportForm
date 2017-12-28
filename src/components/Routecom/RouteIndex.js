import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt
} from 'react-router-dom';
import Tablelist from 'components/datatable/Tablelist.js';
export default class RouteIndex extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
             database:[],
             myIndex:0
	    }
   
     }
     componentWillReceiveProps(){//组件的声明周期的使用    componentWillReceiveProps
     
     	let database = this.props.database
     	this.setState({database:database})
     }
     render(){
       	
     	let {database} = this.state;
     	let RouteCon = null;
     	var routeHtml = [];
     	 	//创建路由链接对应的组件页面
     	 	if(database.length == 0){
     	 		//alert(0)
     	 	}else{
               	for(var i=0;i<database.length;i++){
               		var cur = database[i].options;
               		for(var j=0;j<cur.length;j++){
               			var nowCur = cur[j];
               			var tabname = nowCur.tabname;
               			routeHtml.push(<Route path={`/${tabname}`} key={Math.random()} component={Tablelist}/>)
                         
               		}
               	}
     	 	}
	    	
     	return(
     			<div>
     			  {routeHtml}
     			</div>
     			
     		 
     	      )
     }
}