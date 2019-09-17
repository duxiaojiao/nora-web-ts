import React, { Component,Fragment } from 'react';
import {Form, Table, Card, Row, Col, Button, Input, message,Divider,Popconfirm} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import {ConnectProps} from "@/models/connect";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from "./style.less";
import {MenuItem} from "@/pages/system/menu/data";


const { Search } = Input;
interface DictProps extends FormComponentProps,ConnectProps {
}

interface DictState {
}


class Dict extends Component<DictProps, DictState> {

  state: DictState = {
    modalVisible: false,
    record: {},
  };

  columns = [{
    title: '字典编码',
    dataIndex: ' dictCode',
    key: ' dictCode',
  }, {
    title: '字典名字',
    dataIndex: 'dictName',
    key: 'dictName',
  }, {
    title: '字典描述',
    dataIndex: 'descr',
    key: 'descr',
  }
  ]


  handleModalVisible = (flag?: boolean, record?: MenuItem) => {
    this.setState({
      modalVisible: !!flag,
      record: record || {},
    });
  };

  render() {

    return (
      <PageHeaderWrapper>
        <Row gutter={8}>
          <Col span={12}>
            <Card title="字典列表" bordered={false} extra={<div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>
                  <Search
                    placeholder="输入字典名称或描述搜索"
                    onSearch={value => console.log(value)}
                    enterButton
                    style={{width: 300,marginBottom:20}}
                  />
                </div>
                <div>
                  <Table
                    columns={this.columns}
                    // dataSource={data.list}
                    // pagination={data.pagination}
                    // loading={loading}
                    // rowKey='id'
                  />
                </div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="字典明细" bordered={false} extra={<div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
            </div>}>
              <div className={styles.tableList}>
                {/*<div className={styles.tableListForm}>{this.renderSimpleForm()}</div>*/}
                <div>
                  <Table
                    // columns={this.columns}
                    // dataSource={data.list}
                    // pagination={data.pagination}
                    // loading={loading}
                    // rowKey='id'
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    )


  }



}
export default Form.create<DictProps>()(Dict);
