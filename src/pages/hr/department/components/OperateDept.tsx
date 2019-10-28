import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import {DepartmentItem} from "../data.d";

const FormItem = Form.Item;

interface OperateDeptProps extends FormComponentProps {
  modalVisible: boolean;
  record: Partial<DepartmentItem>;
  handleAdd: (fieldsValue: DepartmentItem) => void;
  handleModalVisible: () => void;
}

const OperateDept: React.FC<OperateDeptProps> = props => {
  const {modalVisible, record, form, handleAdd, handleModalVisible,} = props;
  const {getFieldDecorator} = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({id: record.deptId, ...fieldsValue});
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      destroyOnClose
      title="添加部门"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="部门名称"
      >
        {getFieldDecorator('name', {
          rules: [{required: true}],
          initialValue: record.name,
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="上级部门"
      >
        {getFieldDecorator('parentId', {
          initialValue: record.parentId,
        })
        (
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="部门负责人"
      >
        {getFieldDecorator('leader', {
          initialValue: record.leader,
        })
        (
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="排序"
      >
        {getFieldDecorator('sorter', {
          initialValue: record.sorter,
        })
        (
          <Input/>
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<OperateDeptProps>()(OperateDept);
