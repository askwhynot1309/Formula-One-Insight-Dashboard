import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useApi } from '../hooks/useApi';
import { raceAPI } from '../api/services';
import type { Race } from '../api/services';

const { Title } = Typography;
const CURRENT_YEAR = new Date().getFullYear();

const RacesPage: React.FC = () => {
  const { data, loading, error } = useApi<Race[]>(() => raceAPI.getRacesByYear(CURRENT_YEAR));

  return (
    <div>
      <Title level={2}>Races ({CURRENT_YEAR})</Title>
      {error && <Alert type="error" message="Error loading races" description={error} showIcon style={{ marginBottom: 16 }} />}
      <Table<Race>
        dataSource={data || []}
        loading={loading}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: 'Country', dataIndex: 'country', key: 'country' },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Circuit', dataIndex: 'circuitName', key: 'circuitName' },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RacesPage; 