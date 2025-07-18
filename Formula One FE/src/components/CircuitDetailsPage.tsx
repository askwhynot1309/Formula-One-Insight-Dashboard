import React, { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApiWithParams } from '../hooks/useApi';
import { circuitAPI } from '../api/services';
import { Card, Typography, Spin, Alert, Descriptions, Table } from 'antd';

const { Title } = Typography;

type FastestLap = {
  driverName: string;
  teamName: string;
  lapTime: string;
  raceName: string;
};

type CircuitDetailsApi = {
  name: string;
  description: string;
  type: string;
  location: string;
  imageUrl: string | null;
  fastestLapsPerYear: FastestLap[];
};

const CircuitDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const circuitId = id ? parseInt(id, 10) : undefined;
  const getCircuitDetails = useCallback((circuitId: number) => circuitAPI.getCircuitDetails(circuitId).then(res => ({ data: res.data })), []);
  const { data, loading, error } = useApiWithParams<CircuitDetailsApi, number>(getCircuitDetails, circuitId!);

  if (!circuitId) return <Alert type="error" message="Invalid circuit ID" showIcon />;

  return (
    <div>
      <Link to="/circuits" style={{ marginBottom: 16, display: 'inline-block' }}>&larr; Back to Circuits</Link>
      <Title level={2}>Circuit Details</Title>
      {loading && <Spin />}
      {error && <Alert type="error" message="Error loading circuit details" description={error} showIcon style={{ marginBottom: 16 }} />}
      {(!loading && !error && !data) && (
        <Alert type="warning" message="Circuit not found" showIcon style={{ marginBottom: 16 }} />
      )}
      {data && (
        <Card>
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
            <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
            <Descriptions.Item label="Type">{data.type}</Descriptions.Item>
            <Descriptions.Item label="Location">{data.location}</Descriptions.Item>
            {/* <Descriptions.Item label="Image">
              {data.imageUrl ? <img src={data.imageUrl} alt="Circuit" style={{ maxWidth: 300 }} /> : 'N/A'}
            </Descriptions.Item> */}
            <Descriptions.Item label="Image">
              {data.imageUrl && data.imageUrl.trim() !== '' ? (
                <img
                  src={data.imageUrl}
                  alt="Circuit"
                  style={{ maxWidth: 300, borderRadius: 8, background: '#f0f0f0' }}
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                'N/A'
              )}
          </Descriptions.Item>
          </Descriptions>
          <Title level={4} style={{ marginTop: 24 }}>Fastest Laps Each Year</Title>
          <Table<FastestLap>
            dataSource={data.fastestLapsPerYear || []}
            rowKey={row => `${row.driverName}-${row.teamName}-${row.raceName}`}
            columns={[
              { title: 'Driver', dataIndex: 'driverName', key: 'driverName' },
              {
                title: 'Lap Time',
                dataIndex: 'lapTime',
                key: 'lapTime',
                render: (text) => {
                  if (!text) return '';
                  
                  const [mm, rest] = text.split(':');
                  const [ss, ms] = rest.split('.');

                  const minutes = parseInt(mm, 10);
                  const seconds = parseInt(ss, 10);
                  const milliseconds = ms.slice(0, 3); // take first 3 digits only

                  return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds}`;
                }
              },
              { title: 'Race', dataIndex: 'raceName', key: 'raceName' },
            ]}
            pagination={false}
            style={{ marginTop: 16 }}
          />
        </Card>
      )}
    </div>
  );
};

export default CircuitDetailsPage; 