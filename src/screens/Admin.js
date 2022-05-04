import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { getUniqueCustomers, getUniqueProjects } from "../GlobalFunctions";
import "./screens.css";

const Admin = () => {
  let total_customers = 0;
  let total_projects = 0;
  let unique_customers = [];
  let unique_projects = [];

  try {
    // const data = JSON.parse(localStorage.getItem("user-entries"));

    // let all_customers = [];
    // let all_projects = [];

    // Object.values(data).map((row) => {
    //   Object.values(row.entries).map((value) => {
    //     all_customers.push(value.customer);
    //     all_projects.push(value.project);
    //   });
    // });

    // unique_customers = [...new Set(all_customers)];
    // unique_projects = [...new Set(all_projects)];

    unique_customers = getUniqueCustomers();
    unique_projects = getUniqueProjects();

    total_customers = unique_customers.length;
    total_projects = unique_projects.length;
  } catch (e) {
    console.log(e);
  }

  const customers = Object.values(unique_customers).map((customer, index) => {
    return (
      <div className="customer" key={index}>
        {customer}
      </div>
    );
  });

  const projects = Object.values(unique_projects).map((project, index) => {
    return (
      <div className="project" key={index}>
        {project}
      </div>
    );
  });

  return (
    <div className="home-container">
      <Navbar />
      <div className="admin-container">
        <div className="admin-customers">{total_customers} kunder</div>
        <div className="admin-projects">{total_projects} prosjekter</div>
        <div className="customers">{customers}</div>
        <div className="projects">{projects}</div>
      </div>
      <Link to="/home" style={{ color: "#1d1d1d", textDecoration: "none" }}>
        <button className="info-button">Tilbake</button>
      </Link>
    </div>
  );
};

export default Admin;
