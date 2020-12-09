import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            // Acá vamos a preguntarle a la gente si es administradora o no
            // Y según eso vamos a mostrar A o B
            //isLogin() && restricted ?
            false ?
            <Redirect to="/login" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;