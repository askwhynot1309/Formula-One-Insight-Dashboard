import React from 'react';
import { Table, Typography, Spin, Alert, Tag } from 'antd';
import { useApi } from '../hooks/useApi';
import { driverAPI } from '../api/services';
import type { Driver } from '../api/services';
import { Link } from 'react-router-dom';
import UpdateDriverModal from './UpdateDriverModal';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const { Title } = Typography;

const DriversPage: React.FC = () => {
  const { data, loading, error, refetch } = useApi<Driver[]>(() => driverAPI.getDrivers({}));
  const { user } = useAuth();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const handleUpdateClick = (driver: any) => {
    setSelectedDriver(driver);
    setUpdateModalOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateModalOpen(false);
    setSelectedDriver(null);
  };

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
            render: (_, record) => (
              <>
                <Link to={`/drivers/${record.id}`}>View Details</Link>
                {user?.role === 'admin' && (
                  <>
                    {' | '}
                    <a onClick={() => handleUpdateClick(record)}>Update</a>
                  </>
                )}
              </>
            ),
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
      {updateModalOpen && selectedDriver && (
        <UpdateDriverModal
          open={updateModalOpen}
          onClose={handleUpdateClose}
          driver={selectedDriver}
          onUpdated={refetch}
        />
      )}
    </div>
  );
};

export default DriversPage; 