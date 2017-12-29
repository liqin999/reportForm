
import { Layout, Menu, Breadcrumb, Icon ,Tag } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink ,
  HashRouter
} from 'react-router-dom';

import cfg from 'common/config/config.json';
import RouteIndex from 'components/Routecom/RouteIndex.js';
var environment = {
    devHttp:"http://ca-web.yun300.cn",
    testHttp:'http://data.yun300.cn',
    conHttp:'http://webapp.data.yun300.cn',
    default:"http://ca-web.yun300.cn"
};
//判断接口环境
function getDomain(){
    switch (window.location.host) {
        case 'ca-web.yun300.cn':
            return environment.devHttp;
        case 'data.yun300.cn':
            return environment.testHttp;
        case 'webapp.data.yun300.cn':
            return environment.conHttp;
        default:
            return environment.default;
    }
}

export default class Iframe extends React.Component{

constructor(props) {
    super(props);
    this.state={
    	 previews: [],
    	 authors: [],
    	 database:[],//默认请求的数据库和数据表
    }
   
 }

  componentDidMount(){//从后台获得数据   $.get(`${cfg.url}/getPreview`)
  //假数据：    'https://easy-mock.com/mock/599d1648059b9c566dcc4206/house/getdatabase';
  //测试数据：  getDomain() + '/dm/jdbc/allTables';
  let that = this;
  let _getallTableUrl =    getDomain() + '/dm/jdbc/allTables';
     $.get(_getallTableUrl)
        .done(ret=>{
        	if(typeof(ret) == 'string'){
                ret = JSON.parse(ret);	
        	 };
        
             that.setState({
                    database: ret.data.database
             });
        });
  }

 render(){
 	let SubMenuCon = null;//路由链接
 	let MenuItemCon = null;
 	let {database} = this.state;
 	//循环创建路由的链接对象
 	SubMenuCon = database.map((item,index)=>{//两层嵌套的map循环
		MenuItemCon = item.options.map((_item,_index)=>{
			return (
				/*<Menu.Item key={_item.id}>{_item.tabname}</Menu.Item>*/
        <Menu.Item key={_item.id}>
            {<Link to={{ 
            	pathname:`/${_item.tabname}`,
            	state: {
            	 	databaseId: item.id,
            	 	tableId:_item.id,
            	 	tableType:_item.type,
            	 	field_name:_item.condition
            	 }
            }}>
               {_item.tabname}
            </Link>}
        </Menu.Item>
			)
 		});
 		return (//组件之间数据的传递
 			<SubMenu key={index} key={item.id} data-parentId={item.id} title={<span><Icon type="user" />{item.database}</span>}>
			    {MenuItemCon} 
            </SubMenu>
 			)
 	});

 return (
  <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>数据报表展示</Breadcrumb.Item>
      </Breadcrumb>
      <HashRouter>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
		    {SubMenuCon}

          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
             <RouteIndex database={database}/>
        </Content>
      </Layout>
	  </HashRouter>
    </Content>


    <Footer style={{ textAlign: 'center' }}>
	    <div>
	       版权所有 © 1999-2017 北京中企网动力数码科技有限公司    Copyright © 1999-2017 300.cn All Rights Reserved
	    </div>
	    <div>
	       京公网安备11030102010293号 京ICP证010249号
	    </div>
    </Footer>
  </Layout>
 		)
 }

}