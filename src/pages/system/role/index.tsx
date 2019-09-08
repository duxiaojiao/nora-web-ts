import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider,Popconfirm} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {StateType} from './model';
import { connect } from 'dva';
import {RoleItem} from './data.d';
import styles from './style.less';
import OperateRole from './components/OperateRole';
import {ConnectProps} from '@/models/connect'
import {ResponseType} from '@/services/common'

const FormItem = Form.Item;
interface RoleProps extends FormComponentProps,ConnectProps {
  // dispatch: Dispatch<any>;
  loading: boolean;
  roleMgt: StateType;
}

interface RoleState {
  modalVisible: boolean;
  formValues: { [key: string]: string };
  record: Partial<RoleItem>;
}

@connect(
  ({
     roleMgt,
     loading,
   }: {
    roleMgt: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    roleMgt,
    loading: loading.models.roleMgt,
  }),
)

class Role extends Component<RoleProps, RoleState> {
  state: RoleState = {
    modalVisible: false,
    formValues: {},
    record: {},
  };

  columns = [{
    title: '角色编码',
    dataIndex: 'roleCode',
    key: 'roleCode',
  }, {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  }, {
    title: '角色描述',
    dataIndex: 'roleDescr',
    key: 'roleDescr',
  },
    {
      title: '操作',
      render: (text: string, record: RoleItem) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title={'确认删除'} okText='确认' cancelText='取消'
                      onConfirm={() => this.handleRemove(record.roleId)}>
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ]


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'roleMgt/fetch',
      payload: {
        current: 1,
        pageSize: 10,
      }
    });
  }

  handleModalVisible = (flag?: boolean, record?: RoleItem) => {
    this.setState({
      modalVisible: !!flag,
      record: record || {},
    });
  };

  handleRemove = (roleId: number) => {
    this.props.dispatch({
      type: 'roleMgt/remove',
      payload: roleId,
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'roleMgt/fetch',
        payload: {
          ...values,
          current: 1,
          pageSize: 10,
        },
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'roleMgt/fetch',
      payload: {},
    });
  };

  handleAdd = (fields: RoleItem) => {
    const {dispatch} = this.props;
    if (fields.roleId) {
      dispatch({
        type: 'roleMgt/update',
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
        type: 'roleMgt/add',
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
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="角色编码">
              {getFieldDecorator('roleCode')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色名称">
              {getFieldDecorator('roleName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色描述">
              {getFieldDecorator('roleDescr')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      roleMgt: { data },
      loading,
    } = this.props;
    const {modalVisible, record} = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return(
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>
            <div>
              <Table
                columns={this.columns}
                dataSource={data.list}
                pagination={data.pagination}
                loading={loading}
                rowKey='roleId'
              />
            </div>
          </div>
        </Card>
        <OperateRole {...parentMethods} modalVisible={modalVisible} record={record}/>
      </PageHeaderWrapper>
    )
  }

}
export default Form.create<RoleProps>()(Role);

