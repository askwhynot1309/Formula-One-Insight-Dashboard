import React from 'react';
import { Table, Typography, Spin, Alert, Tag } from 'antd';
import { useApi } from '../hooks/useApi';
import { driverAPI } from '../api/services';
import type { Driver } from '../api/services';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const DriversPage: React.FC = () => {
  const { data, loading, error } = useApi<Driver[]>(() => driverAPI.getDrivers({}));

  return (
    <div>
      <Title level={2}>Drivers</Title>
      {error && <Alert type="error" message="Error loading drivers" description={"Please login to view the data"} showIcon style={{ marginBottom: 16 }} />}
      <Table<Driver>
        dataSource={data || []}
        loading={loading}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
          { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
          { title: 'Number', dataIndex: 'number', key: 'number', width: 80 },
          { title: 'Nationality', dataIndex: 'nationality', key: 'nationality' },
          { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> },
          { title: 'Team', dataIndex: 'teamName', key: 'teamName' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => <Link to={`/drivers/${record.id}`}>View Details</Link>,
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default DriversPage; 