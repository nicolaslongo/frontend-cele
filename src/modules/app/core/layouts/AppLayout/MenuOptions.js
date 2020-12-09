import React from 'react';
import {
  // ExperimentOutlined,
  HomeOutlined,
  // SearchOutlined,
} from '@ant-design/icons';

const MenuOptions = [
  {
    key: 'home',
    title: 'Inicio',
    url: `/`,
    exact: true,
    icon: <HomeOutlined />,
  },
  // {
  //   key: 'search',
  //   title: 'Búsqueda',
  //   url: `/search`,
  //   exact: false,
  //   icon: <SearchOutlined />,
  // }
];

export default MenuOptions;
