import {Form, Table, Card, Row, Col, Button, Input, message,Divider} from 'antd';
import React, { Component,Fragment } from 'react';
import {StateType} from './model';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { UserItem } from './data.d';
import CreateUser from './components/CreateUser';

import styles from './style.less';

const FormItem = Form.Item;
interface UserProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  userMgt: StateType;
}

interface UserState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: UserItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<UserItem>;
}

@connect(
  ({
     userMgt,
     loading,
   }: {
    userMgt: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userMgt,
    loading: loading.models.userMgt,
  }),
)
class User extends Component<UserProps, UserState> {
  state: UserState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [{
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '员工姓名',
    dataIndex: 'empName',
    key: 'empName',
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '邮箱',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: '操作',
    render: (text:string, record:UserItem) => (
      <Fragment>
        <a onClick={() => this.handleModalVisible(true)}>更新</a>
        <Divider type="vertical" />
        <a href="">删除</a>
      </Fragment>
    ),
  },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userMgt/fetch',
      payload: {
        current: 1,
        pageSize: 10,
      }
    });
  }

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
        type: 'userMgt/fetch',
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
      type: 'userMgt/fetch',
      payload: {},
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields: UserItem) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'userMgt/add',
      payload: fields,
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('userName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号码">
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(<Input placeholder="请输入" />)}
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
      userMgt: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
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
                rowKey='userId'
              />
            </div>
          </div>
        </Card>
        <CreateUser {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}
export default Form.create<UserProps>()(User);
