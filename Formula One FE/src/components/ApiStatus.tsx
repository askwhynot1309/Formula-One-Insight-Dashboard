import React from 'react';
import { Card, Typography, Tag, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useApi } from '../hooks/useApi';
import { circuitAPI } from '../api/services';

const { Text } = Typography;

const ApiStatus: React.FC = () => {
  const { loading, error, data } = useApi(circuitAPI.getCircuits);

  const getStatusIcon = () => {
    if (loading) return <LoadingOutlined style={{ color: '#faad14' }} />;
    if (error) return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
    return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
  };

  const getStatusText = () => {
    if (loading) return 'Connecting...';
    if (error) return 'Connection Failed';
    return 'Connected';
  };

  const getStatusColor = () => {
    if (loading) return 'warning';
    if (error) return 'error';
    return 'success';
  };

  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Space>
        <Text strong>API Status:</Text>
        {getStatusIcon()}
        <Tag color={getStatusColor()}>{getStatusText()}</Tag>
        {data && <Text type="secondary">({data.length} circuits loaded)</Text>}
      </Space>
      {error && (
        <div style={{ marginTop: 8 }}>
          <Text type="danger" style={{ fontSize: 12 }}>
            Error: {error}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default ApiStatus; 