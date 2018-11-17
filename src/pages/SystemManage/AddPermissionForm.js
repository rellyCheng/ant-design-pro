import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider } from 'antd';
import router from 'umi/router';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ permission }) => ({
  permission
}))
@Form.create()
class AddPermissionForm extends React.PureComponent {

  
  changeSourceType = (value) =>{
    const {dispatch} = this.props;
    console.log(value)
    dispatch({
      type: 'permission/getParentPermission',
      payload: {
        type:value,
      },
    });
  }


  render() {
    const { form } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const parentPermissionList = []
    return (
      <Fragment>
        <Form layout="horizontal"  hideRequiredMark>
          <Form.Item {...formItemLayout} label="权限类型">
            {getFieldDecorator('resource_type', {
              rules: [{ required: true, message: '请选择权限类型' }],
            })(
              <Select onChange={this.changeSourceType} placeholder="请选择权限类型">
                <Option value="oneMenu">一级菜单</Option>
                <Option value="twoMenu">二级菜单</Option>
                <Option value="threeMenu">三级菜单</Option>
                <Option value="button">按钮</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item  {...formItemLayout} label="父级菜单">
            {getFieldDecorator('parentId', {
              rules: [{ required: true, message: '请选择父级菜单' }],
            })(
              <Select placeholder="请选择父级菜单">
                {
                    parentPermissionList.map((item)=>{
                        return <Option key={item.id} >{item.name}</Option>
                    })
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="权限描述">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入权限描述' }],
            })(
              <Input placeholder="请输入权限描述"/>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="权限">
            {getFieldDecorator('permission', {
              rules: [{ required: true, message: '请输入权限(英文)' }],
            })(
              <Input placeholder="请输入权限(英文)"/>
            )}
          </Form.Item>
          <div style={{textAlign:'center'}}>
            <Button type="primary" >
              提交
            </Button>
          </div>
        </Form>
      </Fragment>
    );
  }
}

export default AddPermissionForm;