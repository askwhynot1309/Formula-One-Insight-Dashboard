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
  { key: '/about', icon: <DashboardOutlined />, label: 'About the sport' }, // Added About the sport
];

function getSelectedMenuKey(pathname: string) {
  if (matchPath('/circuits/*', pathname) || pathname.startsWith('/circuits')) return '/circuits';
  if (matchPath('/drivers/*', pathname) || pathname.startsWith('/drivers')) return '/drivers';
  if (matchPath('/teams/*', pathname) || pathname.startsWith('/teams')) return '/teams';
  if (matchPath('/races/*', pathname) || pathname.startsWith('/races')) return '/races';
  if (matchPath('/about', pathname)) return '/about'; // Added about route
  return '/';
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Use improved logic for selectedKey
  const selectedKey = getSelectedMenuKey(location.pathname);

  // About the sport page component
  const AboutTheSportPage = () => (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Title level={2} style={{ color: '#d32f2f' }}>About Formula One</Title>
          <Paragraph style={{ fontSize: 17 }}>
            <b>Formula One (F1)</b> is the highest class of international single-seater auto racing, sanctioned by the FIA. Since 1950, F1 has been the pinnacle of motorsport, featuring the fastest cars, the most advanced technology, and the world's best drivers and teams. Races, known as Grands Prix, are held on circuits and city streets across the globe, combining speed, strategy, and innovation.
          </Paragraph>
          <Paragraph style={{ fontSize: 16 }}>
            The sport is renowned for its rich history, passionate fanbase, and continuous pursuit of excellence both on and off the track. F1 is not just a race—it's a blend of engineering, teamwork, and human skill, pushing the boundaries of what is possible.
          </Paragraph>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <img src="https://logos-world.net/wp-content/uploads/2023/12/F1-Logo.jpg" alt="F1 Car" style={{ width: 220, marginBottom: 16 }} />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
        <Col xs={24} md={8}>
          <Card hoverable style={{ borderTop: '4px solid #d32f2f' }}>
            <Title level={4}>A Rich History</Title>
            <Paragraph>
              Formula One's story began in 1950 at Silverstone. Over the decades, it has evolved into a global phenomenon, producing legendary drivers like Ayrton Senna, Michael Schumacher, and Lewis Hamilton. Each era has brought new heroes, rivalries, and unforgettable moments.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable style={{ borderTop: '4px solid #1976d2' }}>
            <Title level={4}>Cutting-Edge Technology</Title>
            <Paragraph>
              F1 is a showcase for innovation. Teams develop hybrid power units, advanced aerodynamics, and use data analytics to optimize performance. Many technologies pioneered in F1, such as carbon fiber and energy recovery systems, have influenced road cars.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card hoverable style={{ borderTop: '4px solid #388e3c' }}>
            <Title level={4}>A Global Spectacle</Title>
            <Paragraph>
              With races on five continents, F1 unites fans worldwide. Iconic Grands Prix in Monaco, Monza, and Suzuka are highlights of the sporting calendar. The sport's global reach and passionate community make every season a thrilling journey.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center', flexDirection: 'column', boxShadow: '0 2px 8px #f0f1f2' }}>
        <div style={{ width: '100%', maxWidth: 1200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <Title level={2} style={{ margin: 0, color: '#d32f2f', lineHeight: '64px' }}>Formula One Insight</Title>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            style={{ minWidth: 500, fontSize: 16, borderBottom: 'none', background: 'transparent' }}
          />
        </div>
      </Header>
      <Content style={{ margin: '32px 0 0 0', padding: '0 24px', minHeight: 360, background: '#fafafa' }}>
        <div className="content-wrapper" style={{ maxWidth: 1200, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/circuits" element={<CircuitsPage />} />
            <Route path="/circuits/:id" element={<CircuitDetailsPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/drivers/:id" element={<DriverDetailsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailsPage />} />
            <Route path="/races" element={<RacesPage />} />
            <Route path="/about" element={<AboutTheSportPage />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        Formula One Insight ©2024
      </Footer>
    </Layout>
  );
}

export default App;
