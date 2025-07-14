import React from 'react';
import { Typography, Card, Row, Col, Statistic, Spin, Alert } from 'antd';
import { FlagOutlined, CarOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { useApi } from '../hooks/useApi';
import { circuitAPI, driverAPI, teamAPI, raceAPI } from '../api/services';
import ApiStatus from './ApiStatus';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  // API hooks for dashboard statistics
  const { data: circuits, loading: circuitsLoading, error: circuitsError } = useApi(circuitAPI.getCircuits);
  const { data: drivers, loading: driversLoading, error: driversError } = useApi(() => driverAPI.getDrivers({ status: 'Active' }));
  const { data: teams, loading: teamsLoading, error: teamsError } = useApi(teamAPI.getTeams);
  const { data: races, loading: racesLoading, error: racesError } = useApi(() => raceAPI.getRacesByYear(2024));

  // Calculate statistics
  const totalCircuits = circuits?.length || 0;
  const activeDrivers = drivers?.length || 0;
  const totalTeams = teams?.length || 0;
  const racesThisSeason = races?.length || 0;

  // Check if any API calls are loading
  const isLoading = circuitsLoading || driversLoading || teamsLoading || racesLoading;
  // Check if there are any errors
  const hasError = circuitsError || driversError || teamsError || racesError;

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>Welcome to the Formula One Insight</Title>
      <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
        Explore circuits, drivers, teams, races, and results using the navigation menu. This web provides insights and data visualizations for Formula One enthusiasts and analysts.
      </Paragraph>
      <ApiStatus />
      {hasError && (
        <Alert
          message="API Error"
          description="There was an error loading the dashboard data. Please check if the backend server is running."
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Circuits"
              value={totalCircuits}
              prefix={<FlagOutlined />}
              valueStyle={{ color: '#1890ff' }}
              loading={circuitsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Drivers"
              value={activeDrivers}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              loading={driversLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Teams"
              value={totalTeams}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
              loading={teamsLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Races This Season"
              value={racesThisSeason}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              loading={racesLoading}
            />
          </Card>
        </Col>
      </Row>
      {isLoading && !hasError && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16 }}>Loading dashboard data...</Paragraph>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 