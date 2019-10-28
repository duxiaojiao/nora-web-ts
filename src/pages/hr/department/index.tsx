import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider,Popconfirm,Tree} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import {ConnectProps} from "@/models/connect";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {StateType} from "./model";
import {DepartmentItem} from './data.d';
import styles from "./style.less";
import OperateDept from './components/OperateDept';
import { connect } from 'dva';
import {ResponseType} from "@/services/common";




interface DepartmentProps extends FormComponentProps, ConnectProps {
  loading: boolean;
  deptMgt: StateType;
}

interface DepartmentState {
  modalVisible: boolean;
  modalVisibleDetail:boolean,
  formValues: { [key: string]: string };
  record: Partial<DepartmentItem>;
  // recordDetail: Partial<DictDetail>;
  selectRow:Partial<DepartmentItem>;
  checkedKeys:[],
}

@connect(
  ({
     deptMgt,
     loading,
   }: {
    deptMgt: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    deptMgt,
    loading: loading.models.deptMgt,
  }),
)

class Department extends Component<DepartmentProps, DepartmentState> {

  state: DepartmentState = {
    modalVisible: false,
    modalVisibleDetail: false,
    formValues: {},
    record: {},
    // recordDetail: {},
    selectRow: {},
    checkedKeys:[],
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'deptMgt/fetch',
      payload: {}
    });
  }

  handleAdd = (fields: DepartmentItem) => {
    const {dispatch} = this.props;
    // if (fields.id) {
    //   dispatch({
    //     type: 'dictMgt/update',
    //     payload: fields,
    //   }).then((response: ResponseType) => {
    //     if (response.code === 0) {
    //       this.handleModalVisible();
    //       message.success('更新成功');
    //     } else {
    //       message.error(response.msg)
    //     }
    //   });
    // } else {
    //   dispatch({
    //     type: 'dictMgt/add',
    //     payload: fields,
    //   }).then((response: ResponseType) => {
    //     if (response.code === 0) {
    //       this.handleModalVisible();
    //     } else {
    //       message.error(response.msg)
    //     }
    //   })
    // }
  }

  handleModalVisible = (flag?: boolean, record?: DepartmentItem) => {
    this.setState({
      modalVisible: !!flag,
      record: record || {},
    });
  };

  render() {
    const {
      deptMgt: { departmentTree, },
      loading,
    } = this.props;
    const {modalVisible, record, modalVisibleDetail, selectRow: {deptId},checkedKeys} = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper>
        <Row gutter={8}>
          <Col span={12}>
            <Card title="部门树" bordered={false} extra={<div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>}>
              <Tree
                treeData={departmentTree}
                checkable
                checkStrictly
                defaultExpandAll
                defaultExpandedKeys={checkedKeys}
                defaultSelectedKeys={checkedKeys}
                defaultCheckedKeys={checkedKeys}
                style={{width: 300}}
                // onSelect={this.onSelect}
                // onCheck={this.onCheck}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="部门明细" bordered={false}>
            </Card>
          </Col>
        </Row>
        <OperateDept {...parentMethods} modalVisible={modalVisible} record={record}/>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DepartmentProps>()(Department);
