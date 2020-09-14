import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import CacheConfig from './Components/CacheConfig';
import OrderRegistration from './Components/OrderRegistration';
import NotFound from './Components/NotFound';

const Routes = () => (
    <Switch>
        <Redirect
            exact
            from="/"
            to="/config"/>
        <Route exact path="/config">
            <CacheConfig/>
        </Route>
        <Route exact path="/orders">
            <OrderRegistration/>
        </Route>
        <Route exact path="/not-found">
            <NotFound/>
        </Route>
        <Redirect to="/not-found"/>
    </Switch>
);

export default Routes;
