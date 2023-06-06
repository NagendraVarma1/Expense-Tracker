import React from "react";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Navbar
      style={{ border: "1px solid black", justifyContent: "space-between" }}
    >
      <h5 style={{marginLeft: '2px'}}>Welcome to Expense Tracker</h5>

      <p
        style={{
          backgroundColor: "rgb(232, 232, 232)",
          padding: "1px 10px",
          borderRadius: "5px",
          margin: '2px'
        }}
      >
        Your Profile is incomplete.<NavLink to={'/profile'}>Complete Now</NavLink>
      </p>
    </Navbar>
  );
};

export default Home;
