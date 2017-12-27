//引入样式文件
import 'antd/dist/antd.css'
require("./common/style/index.css");

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Iframe from 'components/layout/Iframe';
class App extends React.Component{

constructor(props) {
    super(props);
    this.state={//数据的形式 id  value  hascompleted
    
    }
   
 }

	changeInputVal(ev){
		
	}

	render(){//render是元素的渲染的到页面中的行为

		return(
           <div>
           		<Iframe />
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