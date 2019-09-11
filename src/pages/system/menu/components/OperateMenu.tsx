import {Form, Input, Modal, Select, TreeSelect, InputNumber, Row, Col} from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import {MenuItem} from "../data.d";
import {MenuSelectTree} from "../model";

const FormItem = Form.Item;
const { Option } = Select;
interface OperateMenuProps extends FormComponentProps {
  modalVisible: boolean;
  record: Partial<MenuItem>;
  menuSelectTree: MenuSelectTree[];
  handleAdd: (fieldsValue: MenuItem) => void;
  handleModalVisible: () => void;
}
const OperateMenu: React.FC<OperateMenuProps> = props => {
  const {modalVisible, record, form, handleAdd, handleModalVisible, menuSelectTree} = props;
  const {getFieldDecorator} = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({menuId: record.menuId, ...fieldsValue});
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <Modal
      destroyOnClose
      title="添加菜单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width={800}
    >
      <Row gutter={24}>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="菜单名称"
          >
            {getFieldDecorator('menuName', {
              rules: [{required: true}],
              initialValue: record.menuName,
            })(
              <Input/>
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="菜单编码"
          >
            {getFieldDecorator('menuCode', {
              rules: [{required: true}],
              initialValue: record.menuCode,
            })(
              <Input/>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="上级菜单"
          >
            {getFieldDecorator('parentId', {
              // rules: [{ required: true }],
              initialValue: record.parentId,
            })(
              <TreeSelect
                style={{ maxWidth: 200, width: '100%' }}
                //value={this.state.value}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                treeData={menuSelectTree}
                placeholder="Please select"
                treeDefaultExpandAll
                // onChange={this.onChange}
              />
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="路由"
          >
            {getFieldDecorator('router', {
              initialValue: record.router,
            })(
              <Input/>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="图标"
          >
            {getFieldDecorator('icon', {
              // rules: [{ required: true }],
              initialValue: record.icon,
            })(
              <Input/>
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="菜单类型"
          >
            {getFieldDecorator('menuType', {
              rules: [{required: true, message: '请选择菜单类型！'}],
              initialValue: record.menuType,
            })(
              <Select
                placeholder="选择菜单类型"
                style={{ maxWidth: 200, width: '100%' }}
                // onChange={this.handleSelectChange}
              >
                <Option value="1">一级菜单</Option>
                <Option value="2">子菜单</Option>
                <Option value="3">按钮</Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="请求链接"
          >
            {getFieldDecorator('url', {
              // rules: [{required: true}],
              initialValue: record.url,
            })(
              <Input/>
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="请求方法"
          >
            {getFieldDecorator('method', {
              // rules: [{required: true}],
              initialValue: record.method,
            })(
              <Input/>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}>
          <FormItem
            {...formItemLayout}
            label="排序"
          >
            {getFieldDecorator('sorter', {
              initialValue: record.sorter,
            })(
              <InputNumber min={0} />
            )}
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
};

export default Form.create<OperateMenuProps>()(OperateMenu);
