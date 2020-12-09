import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Typography } from 'antd';
import { ScheduleOutlined, DribbbleOutlined, AudioOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { ActivityCard } from '../../app/core/components';
import axios from 'axios';

const { Content, Footer, Sider } = Layout;
const { Title } = Typography;
const Activity = ({history}) => {
    const [activities, setactivities] = useState({});
    const [showActivity, setShowActivity] = useState('Charlas')
    const token = localStorage.getItem('greenconscious-token');

    useEffect(() => {
        let responseData = {}

        axios.get('http://0.0.0.0:5000/talks', {
            headers: {
                'Authorization': token
            }
        })
        .then(response => {
            responseData['Charlas'] = response.data.Talks;
            axios.get('http://0.0.0.0:5000/activities', {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => {
                responseData['Actividades'] = response.data.Activities;
                axios.get('http://0.0.0.0:5000/entertainments', {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(response => {
                    responseData['Entretenimiento'] = response.data.Entertainments;
                    setactivities(responseData);
                })
            });
        });
    }, [token])

    return(
        <>
            <Layout>
                <Content style={{ padding: '0 0px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Activities</Breadcrumb.Item>
                </Breadcrumb>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100vh' }}>
                        <Menu.Item key="sub1" icon={ <AudioOutlined /> } title="Charlas" onClick={() => setShowActivity('Charlas')}>
                            Charlas
                        </Menu.Item>
                        <Menu.Item key="sub2" icon={ <ScheduleOutlined /> } title="Actividades" onClick={() => setShowActivity('Actividades')}>
                            Actividades
                        </Menu.Item>
                        <Menu.Item key="sub3" icon={ <DribbbleOutlined /> } title="Entretenimiento" onClick={() => setShowActivity('Entretenimiento')}>
                            Entretenimiento
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Row><Title>{ showActivity }</Title></Row>
                    <Row gutter={[4, 4]}>
                    {
                        _.map(activities[showActivity], (act, idx) => {
                            return(
                            <Col flex key={idx}>
                                <ActivityCard history={history} activityType={act.type} activity={act}></ActivityCard>
                            </Col>) 
                        })
                    }
                    </Row>

                </Content>
            </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Green Conscious corp.</Footer>
        </Layout>
      </>
    )
};

export default Activity;