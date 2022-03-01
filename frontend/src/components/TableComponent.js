import React from 'react';
import './TableComponent.css';

const TableComponent = props => {
    return (
        <table className="timetable-table">
            <tr>
                <td></td>
                <th>I<br /><p className="time">(9:00-9:50)</p></th>
                <th>II<br /><p className="time">(10:00-10:50)</p></th>
                <th>III<br /><p className="time">(11:00-11:50)</p></th>
                <th>IV<br /><p className="time">(12:00-12:50)</p></th>
                <td rowSpan="7" className="lunch-break">L U N C H</td>
                <th>V<br /><p className="time">(13:30-13:20)</p></th>
                <th>VI<br /><p className="time">(13:30-14:20)</p></th>
                <th>VII<br /><p className="time">(14:30-15:20)</p></th>
                <th>VII<br /><p className="time">(15:30-16:20)</p></th>
                <th>VII<br /><p className="time">(16:30-17:20)</p></th>
            </tr>
            <tr>
                <th>Monday</th>
                {props.timetable["monday"].map((p) => {
                    return <td>{p}</td>;
                })}
            </tr>
            <tr>
                <th>Tuesday</th>
                {props.timetable["tuesday"].map((p) => {
                    return <td>{p}</td>;
                })}
            </tr>
            <tr>
                <th>Wednesday</th>
                {props.timetable["wednesday"].map((p) => {
                    return <td>{p}</td>;
                })}
            </tr>
            <tr>
                <th>Thursday</th>
                {props.timetable["thursday"].map((p) => {
                    return <td>{p}</td>;
                })}
            </tr>
            <tr>
                <th>Friday</th>
                {props.timetable["friday"].map((p) => {
                    return <td>{p}</td>;
                })}
            </tr>
            <tr>
                <th>Saturday</th>
                {props.timetable["saturday"].map((p) => {
                    return <td>{p}</td>;
                })}
            </tr>
        </table>
    );
};

export default TableComponent;