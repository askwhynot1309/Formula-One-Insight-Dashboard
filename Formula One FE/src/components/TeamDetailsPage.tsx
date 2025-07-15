import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApiWithParams } from '../hooks/useApi';
import { teamAPI } from '../api/services';
import type { TeamDetails, Driver } from '../api/services';
import { Card, Typography, Spin, Alert, Descriptions, Row, Col, Table, Button } from 'antd';
import UpdateTeamModal from './UpdateTeamModal';
import { useAuth } from '../context/AuthContext';
import { EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TeamDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const teamId = id ? parseInt(id, 10) : undefined;
  const { data, loading, error } = useApiWithParams<TeamDetails, number>(teamAPI.getTeamDetails, teamId!);
  const [logoError, setLogoError] = useState(false);
  const { user } = useAuth();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleUpdateClick = () => setUpdateModalOpen(true);
  const handleUpdateClose = () => setUpdateModalOpen(false);

  if (!teamId) return <Alert type="error" message="Invalid team ID" showIcon />;

  return (
    <div>
      <Link to="/teams" style={{ marginBottom: 16, display: 'inline-block' }}>&larr; Back to Teams</Link>
      <Title level={2}>Team Details</Title>
      {user?.role === 'admin' && data && (
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ marginBottom: 16 }}
          onClick={handleUpdateClick}
        >
          Update Team
        </Button>
      )}
      {loading && <Spin />}
      {error && <Alert type="error" message="Error loading team details" description={error} showIcon style={{ marginBottom: 16 }} />}
      {data && (
        <Card>
          <Row gutter={[32, 16]} align="middle">
            <Col xs={24} md={16}>
              <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
                <Descriptions.Item label="Country">{data.country}</Descriptions.Item>
                <Descriptions.Item label="Founded Year">{data.foundedYear}</Descriptions.Item>
                <Descriptions.Item label="Base Location">{data.baseLocation}</Descriptions.Item>
                <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                <Descriptions.Item label="Team Principal">{data.teamPrincipal}</Descriptions.Item>
                <Descriptions.Item label="Engine Suppliers">{data.engineSuppliers}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              {data.logoUrl && data.logoUrl.trim() !== '' && !logoError ? (
                <img
                  src={data.logoUrl}
                  alt="Team Logo"
                  style={{ maxWidth: 180, width: '100%', margin: '0 auto' }}
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div style={{ color: '#888', fontStyle: 'italic', marginTop: 32 }}>No logo available</div>
              )}
            </Col>
          </Row>
          <Title level={4} style={{ marginTop: 32 }}>Drivers</Title>
          <Table<Driver>
            dataSource={data.drivers || []}
            rowKey="id"
            columns={[
              { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
              { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
              { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
              { title: 'Number', dataIndex: 'number', key: 'number', width: 80 },
              { title: 'Nationality', dataIndex: 'nationality', key: 'nationality' },
              { title: 'Status', dataIndex: 'status', key: 'status' },
            ]}
            pagination={false}
            style={{ marginTop: 16 }}
          />
        </Card>
      )}
      {updateModalOpen && data && (
        <UpdateTeamModal
          open={updateModalOpen}
          onClose={handleUpdateClose}
          team={{ ...data, id: teamId }}
          onUpdated={() => { handleUpdateClose(); window.location.reload(); }}
        />
      )}
    </div>
  );
};

export default TeamDetailsPage; 