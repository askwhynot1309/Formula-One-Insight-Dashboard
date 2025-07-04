import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApiWithParams } from '../hooks/useApi';
import { driverAPI } from '../api/services';
import type { DriverDetails } from '../api/services';
import { Card, Typography, Spin, Alert, Descriptions } from 'antd';

const { Title } = Typography;

const DriverDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const driverId = id ? parseInt(id, 10) : undefined;
  const { data, loading, error } = useApiWithParams<DriverDetails, number>(driverAPI.getDriverDetails, driverId!);

  if (!driverId) return <Alert type="error" message="Invalid driver ID" showIcon />;

  return (
    <div>
      <Link to="/drivers" style={{ marginBottom: 16, display: 'inline-block' }}>&larr; Back to Drivers</Link>
      <Title level={2}>Driver Details</Title>
      {loading && <Spin />}
      {error && <Alert type="error" message="Error loading driver details" description={error} showIcon style={{ marginBottom: 16 }} />}
      {data && (
        <Card>
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
            <Descriptions.Item label="First Name">{data.firstName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{data.lastName}</Descriptions.Item>
            <Descriptions.Item label="Number">{data.number}</Descriptions.Item>
            <Descriptions.Item label="Nationality">{data.nationality}</Descriptions.Item>
            <Descriptions.Item label="Race Wins">{data.raceWin}</Descriptions.Item>
            <Descriptions.Item label="Race Starts">{data.raceStart}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{data.dateOfBirth}</Descriptions.Item>
            <Descriptions.Item label="Image">
              {data.imageUrl ? <img src={data.imageUrl} alt="Driver" style={{ maxWidth: 200 }} /> : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Debut Year">{data.debutYear}</Descriptions.Item>
            <Descriptions.Item label="Status">{data.status}</Descriptions.Item>
            <Descriptions.Item label="Podiums">{data.podiums}</Descriptions.Item>
            <Descriptions.Item label="Poles">{data.poles}</Descriptions.Item>
            <Descriptions.Item label="Fastest Laps">{data.fastestLaps}</Descriptions.Item>
            <Descriptions.Item label="Team Name">{data.teamName}</Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};

export default DriverDetailsPage; 