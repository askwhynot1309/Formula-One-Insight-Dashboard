import React from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useApi } from '../hooks/useApi';
import { teamAPI } from '../api/services';
import type { Team } from '../api/services';
import { Link } from 'react-router-dom';
import UpdateTeamModal from './UpdateTeamModal';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const { Title } = Typography;

const TeamsPage: React.FC = () => {
  const { data, loading, error, refetch } = useApi<Team[]>(teamAPI.getTeams);
  const { user } = useAuth();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const handleUpdateClick = (team: any) => {
    setSelectedTeam(team);
    setUpdateModalOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateModalOpen(false);
    setSelectedTeam(null);
  };

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
            render: (_, record) => (
              <>
                <Link to={`/teams/${record.id}`}>View Details</Link>
                {user?.role === 'admin' && (
                  <>
                    {' | '}
                    <a onClick={() => handleUpdateClick(record)}>Update</a>
                  </>
                )}
              </>
            ),
          }
        ]}
        pagination={{ pageSize: 10 }}
      />
      {updateModalOpen && selectedTeam && (
        <UpdateTeamModal
          open={updateModalOpen}
          onClose={handleUpdateClose}
          team={selectedTeam}
          onUpdated={refetch}
        />
      )}
    </div>
  );
};

export default TeamsPage; 