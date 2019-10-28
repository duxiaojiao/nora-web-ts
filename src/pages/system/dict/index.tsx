import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider,Popconfirm} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import {ConnectProps} from "@/models/connect";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from "./style.less";
import {DictDetail, DictItem} from './data.d';
import {StateType} from './model';
import { connect } from 'dva';
import OperateDict from './components/OperateDict';
import OperateDictItem from './components/OperateDictItem';
import {ResponseType} from "@/services/common";


const { Search } = Input;

interface DictProps extends FormComponentProps, ConnectProps {
  loading: boolean;
  dictMgt: StateType;
}

interface DictState {
  modalVisible: boolean;
  modalVisibleDetail:boolean,
  formValues: { [key: string]: string };
  record: Partial<DictItem>;
  recordDetail: Partial<DictDetail>;
  selectRow:Partial<DictItem>;
}

@connect(
  ({
     dictMgt,
     loading,
   }: {
    dictMgt: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    dictMgt,
    loading: loading.models.dictMgt,
  }),
)
class Dict extends Component<DictProps, DictState> {

  state: DictState = {
    modalVisible: false,
    modalVisibleDetail: false,
    formValues: {},
    record: {},
    recordDetail: {},
    selectRow: {},
  };

  columns = [{
    title: '字典编码',
    dataIndex: 'dictCode',
    key: 'dictCode',
  }, {
    title: '字典名称',
    dataIndex: 'dictName',
    key: 'dictName',
  }, {
    title: '字典描述',
    dataIndex: 'descr',
    key: 'descr',
  },
  {
    title: '操作',
    render: (text: string, record: DictItem) => (
      <Fragment>
        <Button type="primary" icon="edit" onClick={() => this.handleModalVisible(true, record)} style={{width: 50}}/>
        <Popconfirm title={'确认删除'} okText='确认' cancelText='取消'
                    onConfirm={() => this.handleRemove(record.id)}>
          <Button type="danger" icon="delete" style={{width: 50, marginLeft: 5}}/>
        </Popconfirm>
      </Fragment>
    ),
  },
  ]

  columnsDetail = [{
    title: '字典项值',
    dataIndex: 'itemValue',
    key: 'itemValue',
  }, {
    title: '字典项名称',
    dataIndex: 'itemText',
    key: 'itemText',
  }, {
    title: '描述',
    dataIndex: 'descr',
    key: 'descr',
  }, {
    title: '排序',
    dataIndex: 'sorter',
    key: 'sorter',
  },{
    title: '操作',
    render: (text: string, record: DictDetail) => (
      <Fragment>
        <Button type="primary" icon="edit" onClick={() => this.handleModalVisibleDetail(true, record)} style={{width: 50}}/>
        <Popconfirm title={'确认删除'} okText='确认' cancelText='取消'
                    onConfirm={() => this.handleRemoveDetail(record.id)}>
          <Button type="danger" icon="delete" style={{width: 50, marginLeft: 5}}/>
        </Popconfirm>
      </Fragment>
    ),
  },
  ]

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dictMgt/fetch',
      payload: {
        current: 1,
        pageSize: 10,
      }
    });
  }


  handleModalVisible = (flag?: boolean, record?: DictItem) => {
    this.setState({
      modalVisible: !!flag,
      record: record || {},
    });
  };

  handleRemove = (id: number) => {
    this.props.dispatch({
      type: 'dictMgt/remove',
      payload: id,
    });
  };

  handleSearch = (value: string) => {
    this.props.dispatch({
      type: 'dictMgt/fetch',
      payload: {
        current: 1,
        pageSize: 10,
        dictCodeOrName: value,
      }
    });
  };

  handleRemoveDetail = (id: number) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'dictMgt/removeDictItem',
      payload: id,
    }).then((response: ResponseType) => {
      if (response.code === 0) {
        dispatch({
          type: 'dictMgt/fetchDetail',
          payload: {dictId: this.state.selectRow.id, itemValueOrText: ''},
        });
        this.handleModalVisible();
        message.success('删除成功');
      } else {
        message.error(response.msg)
      }
    });
  };

  handleAdd = (fields: DictItem) => {
    const {dispatch} = this.props;
    if (fields.id) {
      dispatch({
        type: 'dictMgt/update',
        payload: fields,
      }).then((response: ResponseType) => {
        if (response.code === 0) {
          this.handleModalVisible();
          message.success('更新成功');
        } else {
          message.error(response.msg)
        }
      });
    } else {
      dispatch({
        type: 'dictMgt/add',
        payload: fields,
      }).then((response: ResponseType) => {
        if (response.code === 0) {
          this.handleModalVisible();
        } else {
          message.error(response.msg)
        }
      })
    }
  }

  handleOnRow = (record: DictItem) => {
    this.setState({
      selectRow: record || {},
    });
    this.props.dispatch({
      type: 'dictMgt/fetchDetail',
      payload: {dictId: record.id, itemValueOrText: ''},
    });
  }

  handleAddDetail = (fields: DictDetail) => {
    const {dispatch} = this.props;
    if (fields.id) {
      dispatch({
        type: 'dictMgt/updateDictItem',
        payload: {dictId: this.state.selectRow.id, ...fields},
      }).then((response: ResponseType) => {
        if (response.code === 0) {
          dispatch({
            type: 'dictMgt/fetchDetail',
            payload: {dictId: this.state.selectRow.id, itemValueOrText: ''},
          });
          this.handleModalVisibleDetail();
          message.success('更新成功');
        } else {
          message.error(response.msg)
        }
      });
    } else {
      dispatch({
        type: 'dictMgt/addDictItem',
        payload: {dictId: this.state.selectRow.id, ...fields},
      }).then((response: ResponseType) => {
        if (response.code === 0) {
          dispatch({
            type: 'dictMgt/fetchDetail',
            payload: {dictId: this.state.selectRow.id, itemValueOrText: ''},
          });
          this.handleModalVisibleDetail();
          message.success('新增成功');
        } else {
          message.error(response.msg)
        }
      })
    }
  }

  handleModalVisibleDetail = (flag?: boolean, record?: DictDetail) => {
    this.setState({
      modalVisibleDetail: !!flag,
      recordDetail: record || {},
    });
  };

  render() {
    const {
      dictMgt: {data, dictDetail},
      loading,
    } = this.props;

    const {modalVisible, record, modalVisibleDetail, recordDetail, selectRow: {id}} = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const detailParentMethods = {
      handleAdd: this.handleAddDetail,
      handleModalVisible: this.handleModalVisibleDetail,
    };
    return (
      <PageHeaderWrapper>
        <Row gutter={8}>
          <Col span={12}>
            <Card title="字典列表" bordered={false} extra={<div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>
                  <Search
                    placeholder="输入字典编码或名字搜索"
                    onSearch={value => this.handleSearch(value)}
                    enterButton
                    style={{width: 300,marginBottom:20}}
                  />
                </div>
                <div>
                  <Table
                    columns={this.columns}
                    dataSource={data.list}
                    pagination={data.pagination}
                    loading={loading}
                    rowKey='id'
                    onRow={record => {
                      return {
                        onClick: event => {this.handleOnRow(record)}, // 点击行
                        onDoubleClick: event => {},
                        onContextMenu: event => {},
                        onMouseEnter: event => {}, // 鼠标移入行
                        onMouseLeave: event => {},
                      };
                    }}
                  />
                </div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="字典明细" bordered={false} extra={id ? <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisibleDetail(true)}>
                新增
              </Button>
            </div> : ''}>
              <div className={styles.tableList}>
                <div>
                  <Table
                    columns={this.columnsDetail}
                    dataSource={id ? dictDetail : []}
                    pagination={false}
                    loading={loading}
                    rowKey='id'
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <OperateDict {...parentMethods} modalVisible={modalVisible} record={record}/>
        <OperateDictItem {...detailParentMethods} modalVisible={modalVisibleDetail} record={recordDetail}/>
      </PageHeaderWrapper>
    )


  }



}
export default Form.create<DictProps>()(Dict);
