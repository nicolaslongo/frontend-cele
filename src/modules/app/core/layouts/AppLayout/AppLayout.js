import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Modal } from 'antd';
import MenuOptions from './MenuOptions';
import { LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './AppLayout.css';

const { Content, Sider } = Layout;
const { confirm } = Modal;
const localstorage = window.localStorage;

const logout = () => {
  return confirm({
    title: 'Desea cerrar sesión?',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      return new Promise((resolve, reject) => {
        localstorage.removeItem('match_credentials');
        resolve((window.location.href = '/login'));
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
};

const SiderMenu = ({ MenuOptions, collapsed }) => (
  <ul className="sider-menu-list">
    {MenuOptions.map((item, index) => {
      const { title, url, exact, icon } = item;
      return (
        <li key={index} className="sider-menu-item">
          <NavLink
            key={index}
            to={url}
            exact={exact}
            activeClassName="selected"
            title={title}
          >
            <span className="navlink-icon">{icon}</span>
            <span className="navlink-title" data-collapsed={collapsed}>
              {title}
            </span>
          </NavLink>
        </li>
      );
    })}
    <li className="sider-menu-item">
      <NavLink to="#" exact={true} title="logout">
        <span className="navlink-icon" onClick={logout}>
          <LogoutOutlined />
        </span>
        <span className="navlink-title" data-collapsed={collapsed}>
          Logout
        </span>
      </NavLink>
    </li>
  </ul>
);

const AppLayout = ({ children }) => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(true);

  return (
    <Layout className="app-layout">
      <Sider
        theme="light"
        className="app-sider"
        collapsible
        width={154}
        collapsedWidth={54}
        collapsed={isSiderCollapsed}
        onCollapse={() => setIsSiderCollapsed((prevState) => !prevState)}
      >
        
        <SiderMenu MenuOptions={MenuOptions} collapsed={isSiderCollapsed} />
      </Sider>
      <Layout className="app-content-layout">
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
