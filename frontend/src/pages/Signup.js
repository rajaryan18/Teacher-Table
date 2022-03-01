import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 
import Button from '../components/Button';
import { AuthContext } from '../components/context/auth-context';

const Signup = () => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState({
        name: '',
        rollno: '',
        DOB: '',
        _class: '',
        email: '',
        password: ''
    });

    const { name, rollno, DOB, _class, email, password} = data;

    const onSubmitHandler = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const responseData = await axios.post(
                'http://localhost:5000/signup', data, headers
            );
            setData({
                name: '',
                rollno: '',
                DOB: '',
                _class: '',
                email: '',
                password: ''
            });
            //console.log(responseData.data.token);
            auth.login(responseData.data._class, responseData.data.token);
        } catch (err) {}
    };

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="signup-container">
            <Header text="Signup" />
            <div className="signup-box">
                <div className='signup-heading'>
                    <p className='signup-heading-button'><Button inverse to='../'>Back</Button></p>
                    <p className="toLoginP">Already have an account? <Link className="signup-link" to="/">Login</Link></p>
                </div>
                <hr />
                <form className="signup-form" onSubmit={onSubmitHandler}>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Name</p>
                        <input type="text" onChange={onChangeHandler} value={name} name="name" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Roll/University Number</p>
                        <input type="text" onChange={onChangeHandler} value={rollno} name="rollno" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Date of Birth</p>
                        <input type="text" onChange={onChangeHandler} value={DOB} name="DOB" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Class/Section</p>
                        <input type="text" onChange={onChangeHandler} value={_class} name="_class" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">E-mail</p>
                        <input type="email" onChange={onChangeHandler} value={email} name="email" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Password</p>
                        <input type="password" onChange={onChangeHandler} value={password} name="password" required />
                    </div>
                    <div className="signup-submit">
                        <Button type="submit" danger>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;