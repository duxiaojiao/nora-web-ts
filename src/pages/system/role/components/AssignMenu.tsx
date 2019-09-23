import { Form, Input, Modal,Icon,Tree } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React, { Component }  from 'react';
import { AntTreeNodeSelectedEvent } from 'antd/lib/tree';
import {ConnectProps} from "@/models/connect";

interface AssignMenuProps extends FormComponentProps,ConnectProps {
  modalVisible: boolean;
  handleAssign: (fieldsValue:string[]) => void;
  handleAssignModalVisible: () => void;
  roleId:number;
  treeData:any;
  roleMenus:[];
}

export interface AssignMenuState {
  visible: boolean,
  destroy: boolean,
  checkedKeys: string[],
}
class AssignMenu extends Component<AssignMenuProps, AssignMenuState> {
  static defaultProps = {
    handleAssign: () => {},
    handleAssignModalVisible: () => {},
    treeData: [],
  };

  static getDerivedStateFromProps(nextProps: AssignMenuProps, preState: AssignMenuState) {
    if (nextProps.roleMenus.length>0) {
      return {
        checkedKeys: nextProps.roleMenus,
      };
    }
    return null;
  }

  constructor(props: AssignMenuProps) {
    super(props);
    this.state = {
      visible: false,
      destroy: true,
      checkedKeys:[],
    };
  }

  okHandler = () => {
    const {handleAssign} = this.props;
    handleAssign(this.state.checkedKeys);
    this.setState({
      checkedKeys: [],
    })
  };

  onSelect = (selectedKeys:string[], info:AntTreeNodeSelectedEvent) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys: string[] | {
    checked: string[];
    halfChecked: string[];
  }, info: AntTreeNodeSelectedEvent) => {
    console.log('onCheck', checkedKeys, info);
    this.setState(
      {checkedKeys: checkedKeys.checked}
    )
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
      destroy: true,
      checkedKeys:[],
    });
    this.props.handleAssignModalVisible();
  };

  render() {
    const {modalVisible, treeData} = this.props;
    const {checkedKeys} = this.state;
    return (
      <Modal
        destroyOnClose
        title="分配菜单"
        visible={modalVisible}
        onOk={this.okHandler}
        onCancel={this.hideModelHandler}
      >
        <Tree
          treeData={treeData}
          checkable
          checkStrictly
          defaultExpandedKeys={checkedKeys}
          defaultSelectedKeys={checkedKeys}
          defaultCheckedKeys={checkedKeys}
          style={{width: 300}}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        />
      </Modal>
  );
  }
}

export default Form.create<AssignMenuProps>()(AssignMenu);
