import React, { useState } from "react";
import './Home.css';
import Header from "../components/Header";
import Button from "../components/Button";
import TableComponent from "../components/TableComponent";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const op = ['Dept of Mechanical Engineering', 'Dept of Computer Engineering', 'Dept of E&C Engineering', 'Dept of E&E Engineering'];
    const [tab, setTab] = useState(null);
    const [data, setData] = useState({
        profName: '',
        dept: ''
    });
    const [tableMode, setTableMode] = useState(false);

    const { profName, dept } = data;
    const onSubmitHandler = async e => {
        e.preventDefault();
        let responseData;
        try {
            responseData = await axios.get(`http://localhost:5000/${dept}/${profName}`);
            setTableMode(true);
            setTab(responseData.data.timetable);
        } catch (err) {}

        setData({
            profName: '',
            dept: ''
        });
    };

    const onChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="home-container">
            <Header text="Select Teacher" />
            <div className="home-box">
            <Link className="home-link" to="/timetable">{'Your TimeTable ->'}</Link>
                {!tableMode && <form className="home-form" onSubmit={onSubmitHandler}>
                    <div className="home-form-div">
                        <div className="home-input-div">
                            <select onChange={onChangeHandler} name="dept" className="home-select">
                                {op.map((x) => {
                                    return <option value={x}>{x}</option>
                                })}
                            </select>
                            <br />
                            <input type="text" onChange={onChangeHandler} value={profName} name="profName" required className="home-input" placeholder="Professor Name" />
                        </div>
                        <div className="home-button">
                            <Button type="submit" size="big" radius="round" danger>Submit</Button>
                        </div>
                    </div>
                </form>}
                {tableMode && <TableComponent timetable={tab} />}
            </div>
        </div>
    );
};

export default Home;