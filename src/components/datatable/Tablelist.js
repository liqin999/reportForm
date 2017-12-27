
require("./tablelist.css");
import { Table, Button ,DatePicker, Icon } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
//列表显示数据
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

export default class Tablelist extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        filteredInfo: null,
        sortedInfo: null,
        size: 'default',
      };
      this.handleChange = this.handleChange.bind(this)
      this.clearFilters = this.clearFilters.bind(this)
      this.clearAll = this.clearAll.bind(this)
      this.setAgeSort = this.setAgeSort.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.onChange = this.onChange.bind(this)
  }

  handleChange(pagination, filters, sorter){
     this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }
  
  clearFilters(){
    this.setState({ filteredInfo: null });
  }

  clearAll(){
      this.setState({
        filteredInfo: null,
        sortedInfo: null,
      });
  }

  setAgeSort() {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  onChange(date, dateString) {
     console.log(date, dateString);
  }
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    let {onChange} = this;
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }];
    return (
      <div>
        <div className="table-operations">
            <span className='mr20'>
             日报:
            </span>
            <DatePicker onChange={onChange} className='mr20'/>
            
            <span className='mr20'>
            月报：
            </span>
            <MonthPicker onChange={onChange} placeholder="Select month" className='mr20'/>
            <Button type="primary"  icon="search" size={'default'}>查询</Button>
            <Button type="primary" icon="download" size={'default'}>导出</Button>

        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}