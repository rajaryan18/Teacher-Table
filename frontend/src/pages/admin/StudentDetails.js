import React, { useState } from 'react';
import './StudentDetails.css';
import Header from '../../components/Header';
import Button from '../../components/Button';
import axios from 'axios';

// const st = {
//     studentName: 'Raj',
//     rollno: '212',
//     dob: 'dsf',
//     Class: '12',
//     email: 'sdf'
// };

const StudentDetails = () => {
    const [loadedStudent, setLoadedStudent] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [data, setData] = useState({
        name: '',
        rollno: ''
    });
    const {name, rollno} = data;

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/admin/studentdetails/${name}/${rollno}`);
            setDeleted(true);
        } catch (err) {}
    };
    
    const onSubmitHandler = async e => {
        e.preventDefault();

        try {
            const responseData = await axios.get(`http://localhost:5000/admin/studentdetails/${name}/${rollno}`);
            setLoadedStudent(responseData.data);
        } catch (err) {}

        setData({
            name: '',
            rollno: ''
        });
    };

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="studentdetails-conatiner">
            <Header text="Details" />
            <div className="studentdetails-box">
                {!loadedStudent && !deleted && <form onSubmit={onSubmitHandler} className="studentdetails-form">
                    <div className="studentdetails-form-div">
                        <p className="studentdetails-form-p">Name</p>
                        <input type="text" onChange={onChangeHandler} value={name} name="name" required />
                    </div>
                    <div className="studentdetails-form-div">
                        <p className="studentdetails-form-p">Roll No</p>
                        <input type="text" onChange={onChangeHandler} value={rollno} name="rollno" required />
                    </div>
                    <div className="studentdetails-button-div">
                        <Button type="submit" danger>Search</Button>
                    </div>
                </form>}
                {!!loadedStudent && !deleted &&
                    <div className="studentdetails-details">
                        <div className="studentdetails-details-info">
                            <p className="studentdetails-details-info-sub">
                                <b>Name: </b>{loadedStudent.name}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Roll No: </b>{loadedStudent.rollno}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Date of Birth: </b>{loadedStudent.DOB}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Class: </b>{loadedStudent._class}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Email: </b>{loadedStudent.email}
                            </p>
                        </div>
                        <div className="studentdetails-details-pic">
                            <img src="" alt="profile pic" />
                            <Button danger onClick={deleteHandler}>DELETE</Button>
                        </div>
                    </div>         
                }
                {!!loadedStudent && deleted &&
                    <div className='deleted-div'>
                        <p className='deleted-div-p'>SUCCESSFULLY DELETED</p>
                        <Button to='../home' danger>GO BACK</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default StudentDetails;