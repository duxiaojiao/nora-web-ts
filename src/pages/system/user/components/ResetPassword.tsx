import { Form, Input, Modal,Icon } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface ResetPwdProps extends FormComponentProps {
  modalVisible: boolean;
  handleReset: (fieldsValue:string) => void;
  handleResetModalVisible: () => void;
}
const ResetPwd: React.FC<ResetPwdProps> = props => {
  const { modalVisible, form, handleReset, handleResetModalVisible, } = props;
  const {getFieldDecorator} = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleReset(fieldsValue.password);
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      destroyOnClose
      title="修改密码"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleResetModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="新密码"
      >
        {getFieldDecorator('password', {
          initialValue: '123456',
          rules: [
            {
              required: true, message: '请输入密码!'
            },
          ],
        })
        (
          <Input
            type="password"
            // onPressEnter={this.handleOk}
            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
            placeholder='密码'
          />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<ResetPwdProps>()(ResetPwd);
