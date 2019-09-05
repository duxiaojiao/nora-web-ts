import { Form,Table } from 'antd';
import React, { Component } from 'react';
import {StateType} from './model';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { UserItem } from './data.d';

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
  }]

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

  render() {
    const {
      userMgt: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <div>
          <Table
            columns={this.columns}
            dataSource={data.list}
            pagination={data.pagination}
            loading={loading}
            rowKey={'key'}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create<UserProps>()(User);
