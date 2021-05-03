import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './app.css'
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from 'root/pages/HomePage';
import { LoginPage } from 'root/pages/LoginPage';
import { RegisterPage } from 'root/pages/RegisterPage';
import { ListPage } from 'root/pages/ListPage';
import { Link } from 'react-router-dom';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }

    return (
        <div class="wrp-app">
        {/* ---------------nav bar----------------- */}
        <div class="topnav" id="myTopnav">
            <a class="active">Home</a>
            {/* <Link >Contact</Link> */}
            {/* <a href="javascript:void(0);" class="icon" onClick="{myFunction}">&#9776;</a> */}
        </div>
        {/* //----------------------------------- */}

        <div className="jumbotron">
            <div className="container">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/list" component={ListPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        </div>
        </div>
    );
    
}

export { App };