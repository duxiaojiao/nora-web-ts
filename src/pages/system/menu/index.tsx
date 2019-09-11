import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider,Popconfirm} from 'antd';
import {StateType} from './model';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {ConnectProps} from "@/models/connect";
import {MenuItem} from './data.d';
import { connect } from 'dva';
import styles from "./style.less";
import {ResponseType} from "@/services/common";
import OperateMenu from './components/OperateMenu';

interface MenuProps extends FormComponentProps,ConnectProps {
  loading: boolean;
  menuMgt: StateType;
}

interface MenuState {
  modalVisible: boolean;
  formValues: { [key: string]: string };
  record: Partial<MenuItem>;
}

@connect(
  ({
     menuMgt,
     loading,
   }: {
    menuMgt: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    menuMgt,
    loading: loading.models.menuMgt,
  }),
)
class Menu extends Component<MenuProps, MenuState> {
  state: MenuState = {
    modalVisible: false,
    formValues: {},
    record: {},
  };

  columns = [{
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  }, {
    title: '菜单编码',
    dataIndex: 'menuCode',
    key: 'menuCode',
  }, {
    title: '路由',
    dataIndex: 'router',
    key: 'router',
  }, {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
  }, {
    title: '类型',
    dataIndex: 'menuType',
    key: 'menuType',
    render: (val: string) => {
      if (val === '1') {
        return '一级菜单'
      }
      if (val === '2') {
        return '子菜单'
      }
        return '按钮'
    },
  },
    {
      title: '操作',
      render: (text: string, record: MenuItem) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title={'确认删除'} okText='确认' cancelText='取消'
                      onConfirm={() => this.handleRemove(record.menuId)}>
            <a>删除</a>
          </Popconfirm>
        </Fragment>
      ),
    },
  ]

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'menuMgt/fetch',
    });
    dispatch({
      type: 'menuMgt/menuSelectTree',
    });
  }

  handleModalVisible = (flag?: boolean, record?: MenuItem) => {
    this.setState({
      modalVisible: !!flag,
      record: record || {},
    });
  };

  handleRemove = (menuId: number) => {
    this.props.dispatch({
      type: 'menuMgt/remove',
      payload: menuId,
    });
  };

  handleAdd = (fields: MenuItem) => {
    const {dispatch} = this.props;
    if (fields.menuId) {
      dispatch({
        type: 'menuMgt/update',
        payload: fields,
      }).then((response: ResponseType) => {
        if (response.code === 0) {
          this.handleModalVisible();
          message.success('更新成功');
        } else {
          message.error(response.msg)
        }
      });
    } else {
      dispatch({
        type: 'menuMgt/add',
        payload: fields,
      }).then((response: ResponseType) => {
        if (response.code === 0) {
          this.handleModalVisible();
        } else {
          message.error(response.msg)
        }
      })
    }

  }


  render() {
    const {
      menuMgt: {data, menuSelectTree},
      loading,
    } = this.props;
    const {modalVisible, record} = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return(
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            {/*<div className={styles.tableListForm}>{this.renderSimpleForm()}</div>*/}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>
            <div>
              <Table
                columns={this.columns}
                dataSource={data.list}
                pagination={data.pagination}
                loading={loading}
                rowKey='id'
              />
            </div>
          </div>
        </Card>
        <OperateMenu {...parentMethods} modalVisible={modalVisible} record={record} menuSelectTree={menuSelectTree}/>
      </PageHeaderWrapper>
    )
  }

}
export default Form.create<MenuProps>()(Menu);

