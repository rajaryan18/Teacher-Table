import React from "react";
import './AdminHome.css';
import { Link } from 'react-router-dom';

const menu = ["Student Details", "Staff Details", "Register Staff", "Update Time Table"];

const AdminHome = () => {
    return (
        <div className="adminhome-container">
            {menu.map((m) => {
                return <div className={`adminhome-menu ${m[2]}`}><Link className="adminhome-link" to={m[2] === "u" ? "../../admin/studentdetails" : m[2] === "a" ? "../../admin/staffdetails" : m[2] === "g" ? "../../admin/signup" : "../../timetable"}>{m}</Link></div>
            })}
        </div>
    );
};

export default AdminHome;