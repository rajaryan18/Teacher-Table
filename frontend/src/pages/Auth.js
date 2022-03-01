import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Auth.css';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import { AuthContext } from '../components/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);

    //login details entered
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = data;

    const onSubmitHandler = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }
        let responseData;
        try {
            if(window.location.pathname.split("/").findIndex((x) => x === 'admin')) {
                responseData = await axios.post(
                    'http://localhost:5000/admin', data, headers
                );
            } else {
                responseData = await axios.post(
                    'http://localhost:5000', data, headers  
                );
            }
            auth.login(responseData.data._class, responseData.data.token);
            auth._class = responseData.data._class;
            console.log(responseData.data._class);
        } catch (err) {}

        setData({
            email: '',
            password: ''
        });
    };

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="app-header">
                <h1 className="app-h1">
                    Student Help
                </h1>
            </div>
            <div className="auth-container">
                <Header text="Login" />
                <div className="auth-box">
                    {window.location.pathname.split("/").findIndex((x) => x === 'admin') < 0 && <p className="toLoginP">Don't have an account? <Link className="auth-link" to="/signup">Signup</Link></p>}
                    <form className="auth-form" onSubmit={onSubmitHandler}>
                        <div className="auth-form-div">
                            <input type="email" onChange={onChangeHandler} value={email} name="email" required placeholder="Enter email" />
                        </div>
                        <div className="auth-form-div">
                            <input type="password" onChange={onChangeHandler} value={password} name="password" required placeholder="Enter password"/>
                        </div>
                        <div className="auth-button">
                            <Button type="submit" size="big" danger>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Auth;