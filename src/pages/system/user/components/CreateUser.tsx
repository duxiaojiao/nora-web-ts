import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import {UserItem} from "@/pages/system/user/data";

const FormItem = Form.Item;

interface CreateUserProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue:UserItem) => void;
  handleModalVisible: () => void;
}
const CreateUser: React.FC<CreateUserProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, } = props;
  const {getFieldDecorator} = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      destroyOnClose
      title="添加用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="用户名"
      >
        {getFieldDecorator('userName', {
          rules: [{required: true}],
          initialValue: '',
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="用户名"
      >
        {getFieldDecorator('empName', {
          rules: [{required: true}],
          initialValue: '',
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="手机号码"
      >
        {getFieldDecorator('phone', {
          initialValue: '',
        })
        (
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="邮箱"
      >
        {getFieldDecorator('email', {
          initialValue: '',
        })
        (
          <Input/>
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateUserProps>()(CreateUser);
