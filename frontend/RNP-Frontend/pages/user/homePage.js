import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Link from 'next/link';

function Homepage() {
  return (
    <div className="d-flex flex-column font font-monospace" style={{ minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark">
        <Link href="/">
          <a className="navbar-brand mx-2">RNP ACCIDENT INVESTIGATION ENHANCEMENT SYSTEM</a>
        </Link>
        <div className="ml-auto">
          <Link href="/user/login">
            <a className="btn btn-primary mx-2">Login</a>
          </Link>
          <Link href="/user/signup">
            <a className="btn btn-outline-primary mx-2">Signup</a>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow-1">
        {/* Jumbotron with Large Image */}
        <div className="jumbotron jumbotron-fluid position-relative" style={{ backgroundImage: 'url("/images/HOMEPAGE.jpeg")', backgroundSize: 'cover', color: 'white', textAlign: 'center', padding: '160px 0', position: 'relative' }}>
          <div className="container">
            <h1 className="display-4">Welcome to RNP-AIES</h1>
            <p className="lead">Explore our services and features.</p>
            <Link href="/user/login">
              <a className="btn btn-primary btn-lg" role="button">Sign In</a>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer bg-primary text-white text-center py-3">
        <div className="container">
          <p>Kigali,Rwanda</p>
          <p>RNP-AIES streamlines accident investigations, 
            serving as a secure information hub. This user-friendly system 
            enables efficient data input and real-time case tracking for participants. 
            With enhanced collaboration and robust security, 
            RNP-AIES ensures a streamlined and transparent process, contributing 
            to safer roadways and a more secure community.</p>
        </div>
      </div>
      <div className="align-items-center" style={{height:"60px"}}>
                <div className="copyright text-center text-xl-left text-muted">
                    <div
                        className="font-weight-bold ml-1 mt-2"
                    >
                       <p style={{fontSize:"1.5em", fontStyle:"bold"}}>© RNP-AIES {new Date().getFullYear()}{" "} - All rights reserved</p>
                    </div>
                </div>
            </div>
    </div>
  );
}

export default Homepage;
