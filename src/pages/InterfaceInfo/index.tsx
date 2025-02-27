import {PageContainer} from '@ant-design/pro-components';
import {Button, Card, Descriptions, Divider, Form, Input, message, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  getInterfaceInfoByIdUsingGet, invokeInterfaceInfoUsingPost,
} from "@/services/ghostAPI-backend/interfaceInfoController";
import {useParams} from "@@/exports";


/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>([]);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error) {
      message.error("请求失败，" + error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [])

  const onFinish = async (values) => {
    if(!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    }catch (error){
      message.error('操作失败,' + error.message);
    }
    setInvokeLoading(false);
  };


  return (
    <PageContainer title="查看接口文档">
      <Card>
        <Descriptions title={data?.name} column={1}>
          <Descriptions.Item label="接口状态">{data?.status == 0 ? '关闭':'启用'}</Descriptions.Item>
          <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
          <Descriptions.Item label="请求方式">{data?.method}</Descriptions.Item>
          <Descriptions.Item label="请求地址">{data?.url}</Descriptions.Item>
          <Descriptions.Item label="请求参数">{data?.requestParams}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data?.createTime}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{data?.updateTime}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form
          name="invoke"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="userRequestParams"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="调用结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
