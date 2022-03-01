import React, { useContext, useState } from 'react';
import './AdminSignup.css';
import axios from 'axios';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { AuthContext } from '../../components/context/auth-context';

const AdminSignup = () => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState({
        name: '',
        dept: '',
        dob: '',
        phno: null,
        email: '',
        password: ''
    });

    const {name, dept, dob, phno, email, password} = data;

    const onSubmitHandler = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const responseData = await axios.post(
                'http://localhost:5000/admin/signup', data, headers
            );
            auth.login(responseData.data.email, responseData.data.token);
        } catch (err) {}
        setData({
            name: '',
            dept: '',
            dob: '',
            phno: null,
            email: '',
            password: ''
        });
    };

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="adminsignup-container">
            <Header text="Signup" />
            <div className="adminsignup-box">
                <div className="adminsignup-button">
                    <Button inverse to="/admin/home">Back</Button>
                </div>
                <form className="signup-form" onSubmit={onSubmitHandler}>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Name</p>
                        <input type="text" onChange={onChangeHandler} value={name} name="name" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Department</p>
                        <input type="text" onChange={onChangeHandler} value={dept} name="dept" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Date of Birth</p>
                        <input type="date" onChange={onChangeHandler} value={dob} name="dob" required />
                    </div>
                    <div className="signup-form-div">
                        <p className="signup-form-p">Phone Number</p>
                        <input type="number" onChange={onChangeHandler} value={phno} name="phno" required />
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
                        <Button type="submit" danger>Register</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;