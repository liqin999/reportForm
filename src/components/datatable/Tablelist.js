
require("./tablelist.css");
import { Table, Button ,DatePicker, Icon } from 'antd';
import moment from 'moment';
import RouteIndex from 'components/Routecom/RouteIndex.js';
import dateformat from 'common/tools/date.js';
import { withRouter } from 'react-router-dom';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

var environment = {
    devHttp:"http://ca-web.yun300.cn",
    testHttp:'http://data.yun300.cn',
    conHttp:'http://webapp.data.yun300.cn',
    default:"http://ca-web.yun300.cn"
};

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

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

class Tablelist extends React.Component {
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
        tableType:null,//报表类型
        exportLinkUrl:'dd',// 导出表格的接口
        field_name:''

      };
      this.handleChange = this.handleChange.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.handleQuery = this.handleQuery.bind(this);
      this.handleExportData = this.handleExportData.bind(this);

  }
  componentWillUnmount(){//移除的时候立刻被调用。
        this.setState({
          data:[],//列表数据
          columns:[]//列表的表头信息
        });
  }

  componentDidMount(){//第一次渲染的调用组建
          let {location,changeDefaultTip} = this.props;
          let tableType = location.state.tableType;
          this.setState({
            tableType:tableType
          });

           changeDefaultTip(false);
        
          //this.handleGetData();
          //根据日报还是月报设置默认的日期的参数
          let yearmonthday = dateformat.getNowDate('YMD',{d:1});
          let yearmonth = dateformat.getNowDate('YM',{m:1});
          if(tableType == 0){// 日报
             this.setState({
                time:yearmonthday
              });
          }else if(tableType == 1){//月报
             this.setState({
                time:yearmonth
             });
          }
          
  }
  handleGetData(trueurl){
        //每次查询的时候将表格清空
        this.setState({
                   data:[],
                   columns:[]
        });
        let {location} = this.props;
        let that = this;
        let pathname = location.pathname;
        let databaseId = location.state.databaseId;
        let tableId = location.state.tableId;
        let field_name = location.state.field_name;
        let{time} = this.state;
        //拿到数据id和数据表的id  
        this.setState({
          databaseId,
          tableId,
          field_name
         
        });
       let _postonlyTableUrl = trueurl;
       let postData = {
              'select':
                        {
                        
                          'databaseId':'',
                          'tableId':'',
                        }
                      
       };
       if(time != '' && time !=null){
         postData.select["field_name"]=field_name;
         postData.select["field_value"]=time;
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
            if(!res.data.tableList.data){//没有数据清空列表
                 that.setState({
                   data:[],
                   columns:[]
                 });
                 return;
            };
            let _tabdata = res.data.tableList.data;//列表数据
            let _tabcolumns = res.data.tableList.columns;//列表的表头信息
            that.setState({
                   data:_tabdata,
                   columns:_tabcolumns
            })

             let exportUrl = getDomain() + '/dm/jdbc/exprotAccountList';
             let tableId = that.state.tableId;
             let databaseId = that.state.databaseId;
             let field_name = location.state.field_name;
             let field_value = that.state.time;
             // JSON.stringify会自动将引号加上，然后再由encodeURIComponent解析一遍
             let TableIdKey = encodeURIComponent(JSON.stringify('tableId'));
             let TableIdVal = encodeURIComponent(JSON.stringify(tableId));

             let DatabaseIdKey = encodeURIComponent(JSON.stringify('databaseId'));
             let DatabaseIdVal = encodeURIComponent(JSON.stringify(databaseId));

             let Field_nameKey = encodeURIComponent(JSON.stringify('field_name'));
             let Field_nameVal = encodeURIComponent(JSON.stringify(field_name));

             let Field_valueKey = encodeURIComponent(JSON.stringify('field_value'));
             let Field_valueVal = encodeURIComponent(JSON.stringify(field_value));

             let exportLinkUrl  = exportUrl + '?' + 'select={'+TableIdKey+':'+TableIdVal+','+DatabaseIdKey+':'+DatabaseIdVal+','+Field_nameKey+':'+Field_nameVal+','+Field_valueKey+':'+Field_valueVal+'}';
          
             that.setState({
                exportLinkUrl,
             });

          }
          
        });
  }

   handleChange(pagination, filters, sorter){
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  handleExportData(){//数据导出
      return;
  }

  onChangeDate(date, dateString) {
    
      this.setState({
         time:dateString
      })
  }

  handleQuery(){//数据查询
       //假数据：   'https://easy-mock.com/mock/599d1648059b9c566dcc4206/house/onlyTable';
       //测试数据：  getDomain() + '/dm/jdbc/onlyTable';
      let _url=  'https://easy-mock.com/mock/599d1648059b9c566dcc4206/house/onlyTable';
      this.handleGetData(_url);
  }
  render() {
  let {location} = this.props;
  let pathname = location.pathname;
  //取到id  然后发送请求
  let databaseId = location.state.databaseId;
  let tableId = location.state.tableId;
  let yearmonthday = dateformat.getNowDate('YMD',{d:1});
  let yearmonth = dateformat.getNowDate('YM',{m:1});


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
             <DatePicker 
               onChange={onChangeDate}
               defaultValue={moment(yearmonthday, dateFormat)} 
               format={dateFormat} 
               className='mr20'
              />
            </span>
           
      )
  }else if(tableType == 1){
      dataSeachCom=(
      <span>
         <span className='mr20'>
               月报：
            </span>
            <MonthPicker 
            onChange={onChangeDate} 
            placeholder="Select month" 
            defaultValue={moment(yearmonth, monthFormat)} 
            format={monthFormat}
            className='mr20'/>
      </span>
          
      )
  }
    return (
      <div>
        <div className="table-operations">

            {dataSeachCom}
            <Button type="primary" icon="search" size={'default'} onClick={this.handleQuery}>查询</Button>
            <Button type="primary" icon="download" size={'default'} onClick={this.handleExportData}>
               <a style={{'color':'#fff','marginLeft':'5px'}} href= {this.state.exportLinkUrl} >导出</a>
            </Button>

        </div>
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ pageSize: 10 }} 
          scroll={{ y: 0 }} 
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
//使用withRouter 可以取到match, location, history嵌套层级较多的问题
export default withRouter(Tablelist);