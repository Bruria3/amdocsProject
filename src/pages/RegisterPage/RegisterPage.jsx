import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from './useForm'
import { userActions } from '../../_actions';
import validate from "./LoginFormValidationRules";

function RegisterPage() {
    const {submitted, values, errors, handleChange, handleSubmit } = useForm(
        login,
        validate
    );
    // const [user, setUser] = useState({
    //     firstName: '',
    //     lastName: '',
    //     username: '',
    //     // email:'',
    //     password: ''
    // });
    //const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

 //   const [loggedIn, setLoggedIn] = useState(false);

    function login() {
      //setLoggedIn(true);
      props.parentCallback(true);
      return dispatch(userActions.register(values));

    }

    // function handleChange(e) {
    //     const { name, value } = e.target;
    //     setUser(user => ({ ...user, [name]: value }));
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();

    //     setSubmitted(true);
    //     if (user.firstName && user.lastName && user.username && user.password) {
    //         dispatch(userActions.register(user));
    //     }
    // }

    return (
        <div className="col-md-8 offset-md-2">

        <div className="wrp-login">
            <div className="wrp-form">

                <h2>Register</h2>
                <form name="form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={values.firstName} onChange={handleChange} className={'form-control' + (submitted && !values.firstName ? ' is-invalid' : '')} />
                        {errors.firstName &&
                            <div className="invalid-feedback">{errors.firstName}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={values.lastName} onChange={handleChange} className={'form-control' + (submitted && !values.lastName ? ' is-invalid' : '')} />
                        {errors.lastName &&
                            <div className="invalid-feedback">{errors.lastName}</div>
                        }
                    </div>
                    {/* <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !values.email ? ' is-invalid' : '')} />
                    {submitted && !email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div> */}
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={values.username} onChange={handleChange} className={'form-control' + (submitted && !values.username ? ' is-invalid' : '')} />
                        {errors.username &&
                            <div className="invalid-feedback">{errors.username}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={values.password} onChange={handleChange} className={'form-control' + (submitted && !values.password ? ' is-invalid' : '')} />
                         {errors.password&&
                         <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                    </button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
</div>
    );
}

export { RegisterPage };