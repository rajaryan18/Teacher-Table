import React, { useState } from 'react';
import './StudentDetails.css';
import Header from '../../components/Header';
import Button from '../../components/Button';
import axios from 'axios';

//since student details and staff detail follow the same design, using the same CSS file, 'studentDetails.css'

// const st = {
//     name: 'Raj',
//     phno: '212',
//     dob: 'dsf',
//     dept: '12',
//     email: 'sdf'
// };

const StudentDetails = () => {
    const [loadedStaff, setLoadedStaff] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [data, setData] = useState({
        name: '',
        dept: ''
    });
    const {name, dept} = data;

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/admin/staffdetails/${dept}/${name}`);
            setDeleted(true);
        } catch (err) {}
    };
    
    const onSubmitHandler = async e => {
        e.preventDefault();
        try{
            const responseData = await axios.get(`http://localhost:5000/admin/staffdetails/${dept}/${name}`);
            setLoadedStaff(responseData.data);
        } catch (err) {}
        setData({
            name: '',
            dept: ''
        });
    };

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="studentdetails-conatiner">
            <Header text="Details" />
            <div className="studentdetails-box">
                {!loadedStaff && !deleted && <form onSubmit={onSubmitHandler} className="studentdetails-form">
                    <div className="studentdetails-form-div">
                        <p className="studentdetails-form-p">Name</p>
                        <input type="text" onChange={onChangeHandler} value={name} name="name" required />
                    </div>
                    <div className="studentdetails-form-div">
                        <p className="studentdetails-form-p">Department</p>
                        <input type="text" onChange={onChangeHandler} value={dept} name="dept" required />
                    </div>
                    <div className="studentdetails-button-div">
                        <Button type="submit" danger>Search</Button>
                    </div>
                </form>}
                {!!loadedStaff && !deleted && 
                    <div className="studentdetails-details">
                        <div className="studentdetails-details-info">
                            <p className="studentdetails-details-info-sub">
                                <b>Name: </b>{loadedStaff.name}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Department: </b>{loadedStaff.dept}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Date of Birth: </b>{loadedStaff.DOB}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Phone Number: </b>{loadedStaff.phone}
                            </p>
                            <p className="studentdetails-details-info-sub">
                                <b>Email: </b>{loadedStaff.email}
                            </p>
                        </div>
                        <div className="studentdetails-details-pic">
                            <img src="" alt="profile pic" />
                            <Button danger onClick={deleteHandler}>DELETE</Button>
                        </div>
                    </div>       
                }
                {!!loadedStaff && deleted &&
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