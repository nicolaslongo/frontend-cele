import React from 'react';
import { Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Routes as RoutesLogin } from '../../login';
import { Home } from '../../home';
import { Search } from '../../search'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'

// LocalProvider configuration
import esES from 'antd/es/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const App = () => {
  return (
    <ConfigProvider locale={esES}>
    <Switch>
        <PublicRoute restricted={false} component={RoutesLogin} path="/login" exact></PublicRoute>
        <PrivateRoute restricted={true} component={ Home } path="/"></PrivateRoute>
        <PrivateRoute restricted={true} component={ Search } path="/search"></PrivateRoute >
    </Switch>
    </ConfigProvider>
  );
};

export default App;