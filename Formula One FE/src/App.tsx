import React from 'react';
import { Layout, Menu, Typography, Card, Row, Col, Statistic, Spin, Alert, Button } from 'antd';
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
import { Routes, Route, useNavigate, useLocation, matchPath, Navigate } from 'react-router-dom';
import './App.css';
import DriverDetailsPage from './components/DriverDetailsPage';
import CircuitDetailsPage from './components/CircuitDetailsPage';
import TeamDetailsPage from './components/TeamDetailsPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/circuits', icon: <FlagOutlined />, label: 'Circuits' },
  { key: '/drivers', icon: <CarOutlined />, label: 'Drivers' },
  { key: '/teams', icon: <TeamOutlined />, label: 'Teams' },
  { key: '/races', icon: <TrophyOutlined />, label: 'Races' },
  { key: '/about', icon: <DashboardOutlined />, label: 'About the sport' }, // Added About the sport
];

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

function getSelectedMenuKey(pathname: string) {
  if (matchPath('/circuits/*', pathname) || pathname.startsWith('/circuits')) return '/circuits';
  if (matchPath('/drivers/*', pathname) || pathname.startsWith('/drivers')) return '/drivers';
  if (matchPath('/teams/*', pathname) || pathname.startsWith('/teams')) return '/teams';
  if (matchPath('/races/*', pathname) || pathname.startsWith('/races')) return '/races';
  if (matchPath('/about', pathname)) return '/about'; // Added about route
  return '/';
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          user && user.role === "Admin" ? (
            <Dashboard />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Existing routes */}
      <Route path="/circuits" element={<CircuitsPage />} />
      <Route path="/circuits/:id" element={<CircuitDetailsPage />} />
      <Route path="/drivers" element={<DriversPage />} />
      <Route path="/drivers/:id" element={<DriverDetailsPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/:id" element={<TeamDetailsPage />} />
      <Route path="/races" element={<RacesPage />} />
      <Route path="/about" element={<AboutTheSportPage />} />
    </Routes>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = getSelectedMenuKey(location.pathname);
  const { user, logout } = useAuth();

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
          <div>
            {user ? (
              <span style={{ marginLeft: 16 }}>
                Welcome, <b>{user.username}</b> ({user.role})
                <Button type="link" onClick={logout} style={{ marginLeft: 8 }}>Logout</Button>
              </span>
            ) : (
              <Button type="link" onClick={() => navigate('/login')}>Login</Button>
            )}
          </div>
        </div>
      </Header>
      <Content style={{ margin: '32px 0 0 0', padding: '0 24px', minHeight: 360, background: '#fafafa' }}>
        <div className="content-wrapper" style={{ maxWidth: 1200, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2' }}>
          <AppRoutes />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fff' }}>
        Formula One Insight ©2024
      </Footer>
    </Layout>
  );
}

export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
