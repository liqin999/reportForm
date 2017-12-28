
require("./tablelist.css");
import { Table, Button ,DatePicker, Icon } from 'antd';

import RouteIndex from 'components/Routecom/RouteIndex.js';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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

export default class Tablelist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        filteredInfo: null,
        sortedInfo: null,
        size: 'default',//按钮大小
        databaseId:null,// 数据库id
        tableId:null,//数据表id
        status:null,//日报或者月报
        time:'',//查询的时间
        data:[],//列表数据
        columns:[],//列表的表头信息
        tableType:null//报表类型

      };
      this.handleChange = this.handleChange.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.handleQuery = this.handleQuery.bind(this);
  }
  componentWillUnmount(){//移除的时候立刻被调用。
       this.setState({
          data:[],//列表数据
          columns:[]//列表的表头信息
        });
  }

  componentDidMount(){//第一次渲染的调用组建
          let {location} = this.props;
          let tableType = location.state.tableType;
          this.setState({
            tableType:tableType
          });
          console.log(tableType+"ok")
          this.handleGetData();
  }
  handleGetData(){
     let {match:{url},location} = this.props;
        let that = this;
        let pathname = location.pathname;
        let databaseId = location.state.databaseId;
        let tableId = location.state.tableId;
        let{time} = this.state;
        //拿到数据id和数据表的id  
        console.log("数据库id:"+databaseId+";表id:"+tableId);
        this.setState({
          databaseId,
          tableId
        });
        //假数据：    'https://easy-mock.com/mock/599d1648059b9c566dcc4206/house/onlyTable';
       //测试数据：  getDomain() + '/dm/jdbc/onlyTable';
       let _postonlyTableUrl = getDomain() + '/dm/jdbc/onlyTable';
       let postData = {
              'select':
                        {
                        
                          'databaseId':'',
                          'tableId':''
                        }
                      
       };
       if(time != '' && time !=null){
         postData.select["time"]=time;
       }
       postData.select["databaseId"]=databaseId;
       postData.select["tableId"]=tableId;
     
      if(typeof postData.select == "object"){
          postData.select =JSON.stringify(postData.select);
        }
       $.ajax({
          type: 'POST',
          url: _postonlyTableUrl,
          data: postData,
          success: function(res){
            if(typeof(res) == 'string'){
                res = JSON.parse(res);
            };
              
              let _tabdata = res.data.tableList.data;//列表数据
              let _tabcolumns = res.data.tableList.columns;//列表的表头信息
              that.setState({
                   data:_tabdata,
                   columns:_tabcolumns
              })
          }
          
        });
  }

   handleChange(pagination, filters, sorter){
    //console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  onChangeDate(date, dateString) {
     console.log(date, dateString);
      this.setState({
         time:dateString
      })
  }

  handleQuery(){
      this.handleGetData();
  }
  render() {
  let {match:{url},location} = this.props;
  let pathname = location.pathname;
  //取到id  然后发送请求
  let databaseId = location.state.databaseId;
  let tableId = location.state.tableId;

  let { sortedInfo, filteredInfo ,data,columns} = this.state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  let {onChangeDate} = this;
  let tableType = location.state.tableType;
  let dataSeachCom = null;
  if(tableType == 0){
     dataSeachCom=(
            <span>
              <span className='mr20'>
             日报:
             </span>
             <DatePicker onChange={onChangeDate} className='mr20'/>
            </span>
           
      )
  }else if(tableType == 1){
      dataSeachCom=(
      <span>
         <span className='mr20'>
               月报：
            </span>
            <MonthPicker onChange={onChangeDate} placeholder="Select month" className='mr20'/>
      </span>
          
      )
  }
    return (
      <div>
        <div className="table-operations">

            {dataSeachCom}
            <Button type="primary"  icon="search" size={'default'} onClick={this.handleQuery}>查询</Button>
            <Button type="primary" icon="download" size={'default'}>导出</Button>

        </div>
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ pageSize: 5 }} 
          scroll={{ y: 0 }} 
          onChange={this.handleChange}
        />
      </div>
    );
  }
}