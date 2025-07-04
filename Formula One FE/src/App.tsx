import React from 'react';
import { Layout, Menu, Typography, Card, Row, Col, Statistic } from 'antd';
import {
  DashboardOutlined,
  CarOutlined,
  TeamOutlined,
  TrophyOutlined,
  FlagOutlined,
  TableOutlined
} from '@ant-design/icons';
import './App.css';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">
          F1 Insight
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="circuits" icon={<FlagOutlined />}>
            Circuits
          </Menu.Item>
          <Menu.Item key="drivers" icon={<CarOutlined />}>
            Drivers
          </Menu.Item>
          <Menu.Item key="teams" icon={<TeamOutlined />}>
            Teams
          </Menu.Item>
          <Menu.Item key="races" icon={<TrophyOutlined />}>
            Races
          </Menu.Item>
          <Menu.Item key="results" icon={<TableOutlined />}>
            Results
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>Formula One Insight Dashboard</Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="content-wrapper" style={{ padding: 24, minHeight: 360 }}>
            <Title level={3} style={{ marginBottom: 24 }}>Welcome to the Formula One Insight</Title>
            <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
              Explore circuits, drivers, teams, races, and results using the navigation menu. This web provides insights and data visualizations for Formula One enthusiasts and analysts.
            </Paragraph>
            
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Circuits"
                    value={23}
                    prefix={<FlagOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Active Drivers"
                    value={20}
                    prefix={<CarOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Teams"
                    value={10}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Races This Season"
                    value={24}
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: '#fa8c16' }}
                  />
                </Card>
              </Col>
            </Row>
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
