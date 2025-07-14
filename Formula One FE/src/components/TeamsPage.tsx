import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useApi } from '../hooks/useApi';
import { teamAPI } from '../api/services';
import type { Team } from '../api/services';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const TeamsPage: React.FC = () => {
  const { data, loading, error } = useApi<Team[]>(teamAPI.getTeams);

  return (
    <div>
      <Title level={2}>Teams</Title>
      {error && <Alert type="error" message="Error loading teams" description={"Please login to view the data"} showIcon style={{ marginBottom: 16 }} />}
      <Table<Team>
        dataSource={data || []}
        loading={loading}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Country', dataIndex: 'country', key: 'country' },
          { title: 'Founded', dataIndex: 'foundedYear', key: 'foundedYear', width: 100 },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => <Link to={`/teams/${record.id}`}>View Details</Link>,
          },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TeamsPage; 