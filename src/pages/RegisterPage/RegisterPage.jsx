import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './register-page.scss'
import { userActions } from '../../_actions';
// import { validate } from 'json-schema';
import validate from './LoginFormValidationRules'

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    })
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        setErrors(validate(user))
    }

    function handleSubmit(e) {
        e.preventDefault();

        setErrors(validate(user));
        console.log(errors)
        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password && !errors.password && !errors.username &&!errors.firstName && !errors.lastName) {
            dispatch(userActions.register(user));
        }
        console.log(errors);
    }
    console.log(errors);

    return (

        <div className="col-md-8">
            <div className="wrp-login">
                <div className="wrp-form">
                    <h2>Register</h2>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                            {submitted && errors.firstName &&
                                <div className="invalid-feedback">{errors.firstName}</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                            {submitted && errors.lastName &&
                                <div className="invalid-feedback">{errors.lastName}</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                            {submitted && errors.username &&
                                <div className="invalid-feedback">{errors.username}</div>
                            }
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                            {submitted && errors.password &&
                                <div className="invalid-feedback">{errors.password}</div>
                            }
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