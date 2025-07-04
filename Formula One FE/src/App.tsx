import React from 'react';
import { Layout, Menu, Typography, Card, Row, Col, Statistic, Spin, Alert } from 'antd';
import {
  DashboardOutlined,
  CarOutlined,
  TeamOutlined,
  TrophyOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { useApi } from './hooks/useApi';
import { circuitAPI, driverAPI, teamAPI, raceAPI } from './api/services';
import ApiStatus from './components/ApiStatus';
import CircuitsPage from './components/CircuitsPage';
import DriversPage from './components/DriversPage';
import TeamsPage from './components/TeamsPage';
import RacesPage from './components/RacesPage';
import { Routes, Route, useNavigate, useLocation, matchPath } from 'react-router-dom';
import './App.css';
import DriverDetailsPage from './components/DriverDetailsPage';
import CircuitDetailsPage from './components/CircuitDetailsPage';
import TeamDetailsPage from './components/TeamDetailsPage';

const { Header, Sider, Content, Footer } = Layout;
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

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/circuits', icon: <FlagOutlined />, label: 'Circuits' },
  { key: '/drivers', icon: <CarOutlined />, label: 'Drivers' },
  { key: '/teams', icon: <TeamOutlined />, label: 'Teams' },
  { key: '/races', icon: <TrophyOutlined />, label: 'Races' },
];

function getSelectedMenuKey(pathname: string) {
  if (matchPath('/circuits/*', pathname) || pathname.startsWith('/circuits')) return '/circuits';
  if (matchPath('/drivers/*', pathname) || pathname.startsWith('/drivers')) return '/drivers';
  if (matchPath('/teams/*', pathname) || pathname.startsWith('/teams')) return '/teams';
  if (matchPath('/races/*', pathname) || pathname.startsWith('/races')) return '/races';
  return '/';
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Use improved logic for selectedKey
  const selectedKey = getSelectedMenuKey(location.pathname);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>Formula One Insight</Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="content-wrapper" style={{ padding: 24, minHeight: 360 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/circuits" element={<CircuitsPage />} />
              <Route path="/circuits/:id" element={<CircuitDetailsPage />} />
              <Route path="/drivers" element={<DriversPage />} />
              <Route path="/drivers/:id" element={<DriverDetailsPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/teams/:id" element={<TeamDetailsPage />} />
              <Route path="/races" element={<RacesPage />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#fff' }}>
          Formula One Insight Dashboard ©2024
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
