import {
  ProColumns, ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef, useState} from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onCancel, onSubmit} = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if(formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable type="form" formRef={formRef} columns={columns} form={{initialValues: values}} onSubmit={async (value) => {
        onSubmit?.(value as API.InterfaceInfo);
      }}/>
    </Modal>

  );
};
export default UpdateModal;
