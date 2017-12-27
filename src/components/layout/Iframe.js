
import { Layout, Menu, Breadcrumb, Icon ,Tag } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import Tablelist from 'components/datatable/Tablelist.js';
import cfg from 'common/config/config.json';
export default class Iframe extends React.Component{

constructor(props) {
    super(props);
    this.state={
    	 previews: [],
    	 authors: []
    }
   
 }

  componentDidMount(){//从后台获得数据
     $.post(`${cfg.url}/getPreview`)
        .done(ret=>{
            if(ret.code===0){
            	console.log(ret)
                this.setState({
                    previews: ret.data
                });
            }
        });
  }

 render(){
 	return (
  <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>数据报表展示</Breadcrumb.Item>
      
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Tablelist />
        </Content>
      </Layout>
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