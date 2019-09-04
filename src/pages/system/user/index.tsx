import { Form } from 'antd';
import React, { Component } from 'react';
import { StateType } from '@/pages/list/table/list/model';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { UserListItem } from './data.d';

interface UserProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  listTableList: StateType;
}

interface UserState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: UserListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<UserListItem>;
}

@connect(
  ({
    listTableList,
    loading,
  }: {
    listTableList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    listTableList,
    loading: loading.models.rule,
  }),
)
class UserList extends Component<UserProps, UserState> {
  state: UserState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  render() {
    return (
      <PageHeaderWrapper>
        <div>测试自动发布</div>
      </PageHeaderWrapper>
    );
  }
}
export default Form.create<UserProps>()(UserList);
