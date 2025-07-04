import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useApi } from '../hooks/useApi';
import { circuitAPI } from '../api/services';
import type { Circuit } from '../api/services';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const CircuitsPage: React.FC = () => {
  const { data, loading, error } = useApi<Circuit[]>(circuitAPI.getCircuits);

  return (
    <div>
      <Title level={2}>Circuits</Title>
      {error && <Alert type="error" message="Error loading circuits" description={error} showIcon style={{ marginBottom: 16 }} />}
      <Table<Circuit>
        dataSource={data || []}
        loading={loading}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Location', dataIndex: 'location', key: 'location' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => <Link to={`/circuits/${record.id}`}>View Details</Link>,
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CircuitsPage; 