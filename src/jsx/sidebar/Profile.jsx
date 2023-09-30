import React from 'react';
// import { NavLink } from 'react-router-dom';
import './Sidebar';
import './dashboard.css';


export default class Profileinfo extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Profile />
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Profile extends React.Component {
    render() {
        return (
            <>
                <div className="shadow-sm profile-info-box">
                    <h5>Profile Details</h5>
                    <hr></hr>
                    <div className="user-add-info">
                        <p className="profile-info-text">Full Name</p>
                        <p className="profile-info-text">Ankit Samant</p>
                    </div>
                    <div className="user-add-info">
                        <p className="profile-info-text">Mobile Number</p>
                        <p className="profile-info-text">8005779031</p>
                    </div>

                    <div className="user-add-info">
                        <p className="profile-info-text">Email ID</p>
                        <p className="profile-info-text">ankit.samant.ank@gmail.com</p>
                    </div>
                    <div className="user-add-info">
                        <p className="profile-info-text">Gender</p>
                        <p className="profile-info-text">MALE</p>
                    </div>
                    <div className="user-add-info">
                        <p className="profile-info-text">Date of Birth</p>
                        <p className="profile-info-text">16/06/1999</p>
                    </div>
                    <div className="user-add-info">
                        <p className="profile-info-text">Location</p>
                        <p className="profile-info-text">Jaipur</p>
                    </div>
                    <div className="user-add-info">
                        <p className="profile-info-text">Alternate Mobile</p>
                        <p className="profile-info-text">not added</p>
                    </div>
                    <div className="user-add-info">
                        <p className="profile-info-text">Hint Name</p>
                        <p className="profile-info-text">not added</p>
                    </div>
                    <button className="pro-ed-btn">Edit</button>
                </div>
            </>
        )
    }
}

