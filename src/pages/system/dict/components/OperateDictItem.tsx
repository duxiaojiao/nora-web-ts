import {Form, Input, Modal, InputNumber} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import {DictDetail} from "../data.d";

const FormItem = Form.Item;

interface OperateDictItemProps extends FormComponentProps {
  modalVisible: boolean;
  record: Partial<DictDetail>;
  handleAdd: (fieldsValue: DictDetail) => void;
  handleModalVisible: () => void;
}

const OperateDictItem: React.FC<OperateDictItemProps> = props => {
  const {modalVisible, record, form, handleAdd, handleModalVisible,} = props;
  const {getFieldDecorator} = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({id: record.id, ...fieldsValue});
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      destroyOnClose
      title="添加字典明细"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="字典项值"
      >
        {getFieldDecorator('itemValue', {
          rules: [{required: true}],
          initialValue: record.itemValue,
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="字典项文本"
      >
        {getFieldDecorator('itemText', {
          rules: [{required: true}],
          initialValue: record.itemText,
        })
        (
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="字典描述"
      >
        {getFieldDecorator('descr', {
          initialValue: record.descr,
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
          <InputNumber min={0} />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<OperateDictItemProps>()(OperateDictItem);
