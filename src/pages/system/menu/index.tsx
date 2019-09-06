import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider} from 'antd';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface RoleProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface RoleState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
}

class Menu extends Component<RoleProps, RoleState> {




  render() {


    return(
      <PageHeaderWrapper>
        <div>
          菜单管理
        </div>
      </PageHeaderWrapper>
    )
  }

}
export default Form.create<RoleProps>()(Menu);

