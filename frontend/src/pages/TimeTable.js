import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TableComponent from '../components/TableComponent';
import axios from 'axios';
import { AuthContext } from '../components/context/auth-context';
import { useAuth } from '../components/hooks/auth-hook'; 
import './TimeTable.css';

let periods = {
    "Monday": ["CHE", "Math", "CHE", "CHE", "Math", "CHE", "CHE", "Math"],
    "Tuesday": ["CHE", "Math", "CHE", "CHE", "Math", "CHE", "CHE", "Math"],
    "Wednesday": ["CHE", "Math", "CHE", "CHE", "Math", "CHE", "CHE", "Math"],
    "Thursday": ["CHE", "Math", "CHE", "CHE", "Math", "CHE", "CHE", "Math"],
    "Friday": ["CHE", "Math", "CHE", "CHE", "Math", "CHE", "CHE", "Math"],
    "Saturday": ["CHE", "Math", "CHE", "CHE"]
};

const TimeTable = () => {
    const [loadedTimeTable, setLoadedTimeTable] = useState(null);
    const _class = useAuth()._class;

    useEffect(() => {
        async function fetchTimeTable() {
            try {
                const responseData = await axios.get(`http://localhost:5000/timetable/${_class}`);
                setLoadedTimeTable(responseData.data.timetable);
                console.log(loadedTimeTable);
            } catch (err) {}
        }

        fetchTimeTable();
    }, [_class]);

    return (
        <React.Fragment>
            <div className="timetable-container">
                <Header text="Time Table" />
                <div className="timetable-box">
                    {loadedTimeTable && <TableComponent timetable={loadedTimeTable} />}
                </div>
            </div>
        </React.Fragment>
    );
};

export default TimeTable;