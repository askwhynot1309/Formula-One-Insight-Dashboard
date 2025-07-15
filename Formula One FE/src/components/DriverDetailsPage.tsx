import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApiWithParams } from '../hooks/useApi';
import { driverAPI } from '../api/services';
import type { DriverDetails } from '../api/services';
import { Card, Typography, Spin, Alert, Descriptions, Row, Col, Button } from 'antd';
import UpdateDriverModal from './UpdateDriverModal';
import { useAuth } from '../context/AuthContext';
import { EditOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DriverDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const driverId = id ? parseInt(id, 10) : undefined;
  const { data, loading, error } = useApiWithParams<DriverDetails, number>(driverAPI.getDriverDetails, driverId!);
  const [imageError, setImageError] = useState(false);
  const { user } = useAuth();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleUpdateClick = () => setUpdateModalOpen(true);
  const handleUpdateClose = () => setUpdateModalOpen(false);

  if (!driverId) return <Alert type="error" message="Invalid driver ID" showIcon />;

  return (
    <div>
      <Link to="/drivers" style={{ marginBottom: 16, display: 'inline-block' }}>&larr; Back to Drivers</Link>
      <Title level={2}>Driver Details</Title>
      {user?.role === 'admin' && data && (
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ marginBottom: 16 }}
          onClick={handleUpdateClick}
        >
          Update Driver
        </Button>
      )}
      {loading && <Spin />}
      {error && <Alert type="error" message="Error loading driver details" description={error} showIcon style={{ marginBottom: 16 }} />}
      {data && (
        <Card>
          <Row gutter={[32, 16]} align="middle">
            <Col xs={24} md={16}>
              <Descriptions bordered column={1} size="middle">
                {/* <Descriptions.Item label="ID">{data.id}</Descriptions.Item> */}
                <Descriptions.Item label="First Name">{data.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{data.lastName}</Descriptions.Item>
                <Descriptions.Item label="Number">{data.number}</Descriptions.Item>
                <Descriptions.Item label="Nationality">{data.nationality}</Descriptions.Item>
                <Descriptions.Item label="Race Wins">{data.raceWin}</Descriptions.Item>
                <Descriptions.Item label="Race Starts">{data.raceStart}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {new Date(data.dateOfBirth).toISOString().split('T')[0]}
                </Descriptions.Item>
                <Descriptions.Item label="Debut Year">{data.debutYear}</Descriptions.Item>
                <Descriptions.Item label="Status">{data.status}</Descriptions.Item>
                <Descriptions.Item label="Podiums">{data.podiums}</Descriptions.Item>
                <Descriptions.Item label="Poles">{data.poles}</Descriptions.Item>
                <Descriptions.Item label="Fastest Laps">{data.fastestLaps}</Descriptions.Item>
                <Descriptions.Item label="Team Name">{data.teamName}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              {data.imageUrl && data.imageUrl.trim() !== '' && !imageError ? (
                <img
                  src={data.imageUrl}
                  alt="Driver"
                  style={{ maxWidth: 220, width: '100%', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.12)', background: '#f0f0f0', margin: '0 auto' }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div style={{ color: '#888', fontStyle: 'italic', marginTop: 32 }}>No image available</div>
              )}
            </Col>
          </Row>
        </Card>
      )}
      {updateModalOpen && data && (
        <UpdateDriverModal
          open={updateModalOpen}
          onClose={handleUpdateClose}
          driver={{ ...data, id: driverId }}
          onUpdated={() => { handleUpdateClose(); window.location.reload(); }}
        />
      )}
    </div>
  );
};

export default DriverDetailsPage; 