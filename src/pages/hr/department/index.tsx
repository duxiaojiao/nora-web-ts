import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider,Popconfirm} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import {ConnectProps} from "@/models/connect";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {StateType} from "@/pages/system/dict/model";
import {DictDetail, DictItem} from "@/pages/system/dict/data";




interface DepartmentProps extends FormComponentProps, ConnectProps {
  loading: boolean;
  dictMgt: StateType;
}

interface DepartmentState {
  modalVisible: boolean;
  modalVisibleDetail:boolean,
  formValues: { [key: string]: string };
  record: Partial<DictItem>;
  recordDetail: Partial<DictDetail>;
  selectRow:Partial<DictItem>;
}

class Department extends Component<DepartmentProps, DepartmentState> {

  render() {
    return (
      <PageHeaderWrapper>
        <div>
          部门管理
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DepartmentProps>()(Department);
