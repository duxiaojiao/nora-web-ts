import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import {RoleItem} from "../data.d";

const FormItem = Form.Item;

interface OperateRoleProps extends FormComponentProps {
  modalVisible: boolean;
  record: Partial<RoleItem>;
  handleAdd: (fieldsValue: RoleItem) => void;
  handleModalVisible: () => void;
}
const OperateRole: React.FC<OperateRoleProps> = props => {
  const {modalVisible, record, form, handleAdd, handleModalVisible,} = props;
  const {getFieldDecorator} = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({roleId: record.roleId, ...fieldsValue});
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      destroyOnClose
      title="添加角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="角色编码"
      >
        {getFieldDecorator('roleCode', {
          rules: [{required: true}],
          initialValue: record.roleCode,
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="角色名称"
      >
        {getFieldDecorator('roleName', {
          initialValue: record.roleName,
        })
        (
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="角色描述"
      >
        {getFieldDecorator('roleDescr', {
          initialValue: record.roleDescr,
        })
        (
          <Input/>
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<OperateRoleProps>()(OperateRole);
