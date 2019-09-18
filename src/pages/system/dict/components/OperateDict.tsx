import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import {DictItem} from "../data.d";

const FormItem = Form.Item;

interface OperateDictProps extends FormComponentProps {
  modalVisible: boolean;
  record: Partial<DictItem>;
  handleAdd: (fieldsValue: DictItem) => void;
  handleModalVisible: () => void;
}

const OperateDict: React.FC<OperateDictProps> = props => {
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
      title="添加字典"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="字典编码"
      >
        {getFieldDecorator('dictCode', {
          rules: [{required: true}],
          initialValue: record.dictCode,
        })(
          <Input/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="字典名称"
      >
        {getFieldDecorator('dictName', {
          initialValue: record.dictName,
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
    </Modal>
  );
};

export default Form.create<OperateDictProps>()(OperateDict);
