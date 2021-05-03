import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from 'root/pages/HomePage';
import { LoginPage } from 'root/pages/LoginPage';
import { RegisterPage } from 'root/pages/RegisterPage';
import { ListPage } from 'root/pages/ListPage';
import { NavBar } from '../_components/NavBar/NavBar'

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <Router history={history}>
            <NavBar></NavBar>

            <div className="jumbotron">
                <div className="container">

                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/list" component={ListPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }

                </div>
            </div>
        </Router>

    );

}

export { App };