import React from 'react';
import { Input, Form } from 'antd';
import './Login.css';

const FormItem = Form.Item;
const Password = Input.Password;
//const localstorage = window.localStorage;

const loginLayout = {
  wrapperCol: {
    offset: 3,
  },
};

const Login = ({ history }) => {
  const token = localStorage.getItem('match_credentials');
  const { pathname } = history.location;
  if (token && pathname === '/login') history.push('/');

  function login({ username, password }) {

  }

  return (
    <>
      <div className="wrapper">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-header">¡Bienvenidxs!</div>
            <Form name="login" onFinish={login}>
              <FormItem
                name="username"
                rules={[{ required: true, message: 'Ingrese su email!' }]}
              >
                <Input placeholder="E-mail" />
              </FormItem>
              <FormItem
                name="password"
                rules={[{ required: true, message: 'Ingrese su contraseña!' }]}
              >
                <Password placeholder="Contraseña" />
              </FormItem>
              <FormItem {...loginLayout}>
                <button type="submit" className="login-submit-button">
                  <span className="submit-text">Ingresar</span>
                </button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
