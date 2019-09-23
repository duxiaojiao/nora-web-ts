import React, { Component,Fragment } from 'react';
import {Form, Upload, Icon, Modal,Card} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import {ConnectProps} from "@/models/connect";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {StateType} from "@/pages/system/dict/model";
import {UploadFile} from 'antd/lib/upload/interface';
import { getToken } from '@/utils/authority';
import {queryPicture} from './service';
import styles from './style.less';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


interface PictureProps extends FormComponentProps, ConnectProps {
  loading: boolean;
  pictureMgt: StateType;
}

interface PictureState {
  previewVisible: boolean;
  previewImage: string,
  fileList: Partial<UploadFile>[];
}

class Picture extends Component<PictureProps, PictureState> {
  state: PictureState = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentDidMount() {
    queryPicture().then(
      res => {
        this.setState({
          fileList: res.data,
        });
      }
    )
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = (fileList: any) => {
    // this.setState({fileList});
    queryPicture().then(
      res => {
        this.setState({
          fileList: res.data,
        });
      }
    )
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderWrapper>
        <Card>
        <div className="clearfix" style={{display:'flex'}}>
          {
            fileList.map(item => (
              <div style={{marginRight: 10,width:700,height:700}} key={item.uid}>
                <a href={item.url} target="_blank">
                  <img src={item.url} style={{width:'auto', height: 'auto',maxWidth:'100%',maxHeight:'100%'}}/>
                </a>
              </div>
            ))
          }
          <Upload
            // action="http://localhost:8000/nora/tools/files"
            action="/nora/tools/files"
            listType="picture-card"
            // fileList={fileList}
            fileList={[]}
            headers={{Authorization: getToken()}}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            data={{module:'pictureWall'}}
            className={styles.pictureCard}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<PictureProps>()(Picture);
