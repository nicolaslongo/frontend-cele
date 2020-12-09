import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppLayout } from '../core/layouts';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            //isLogin()
            true ?
                <AppLayout>
                    <Component {...props} />
                </AppLayout>
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;