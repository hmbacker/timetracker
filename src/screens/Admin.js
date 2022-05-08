import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import {
  getUniqueCustomers,
  getUniqueProjects,
  useLocalStorage,
} from "../GlobalFunctions";
import "./screens.css";

const Admin = () => {
  const [data, setData] = useLocalStorage("user-entries", []);

  let total_customers = 0;
  let total_projects = 0;
  let unique_customers = [];
  let unique_projects = [];

  const user_email = localStorage.getItem("username");

  function deleteCustomer(customer) {
    let new_data = data;
    Object.values(new_data).map((row) =>
      Object.values(row.entries).map((value) => {
        if (value.customer === customer) {
          try {
            delete value.customer;
            delete value.project;
            delete value.description;
            delete value.date;
            delete value.hours;
            delete value.comment;
          } catch (e) {}
        }
      })
    );
    // console.log(data);
    setData(new_data);
  }
  console.log(data);

  // Object.values(data).map((row) => {
  //   Object.values(row.entries).map((value) => console.log(value));
  // });

  try {
    unique_customers = getUniqueCustomers(data);
    unique_projects = getUniqueProjects(data);

    total_customers = unique_customers.length;
    total_projects = unique_projects.length;
  } catch (e) {}

  const customers = Object.values(unique_customers).map((customer, index) => {
    return (
      <div className="customer" key={index}>
        {customer}
        <button onClick={() => deleteCustomer(customer)}></button>
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
        <div className="admin-text">Dine kunder og prosjekter</div>
        {user_email}
        <div className="admin-content-container">
          <div className="admin-info-container">
            <div className="admin-info-totalcustomers-container">
              <div className="admin-info-totalcustomers-text">Kunder</div>
              <div className="admin-info-totalcustomers-customers">
                {total_customers}
              </div>
            </div>
            <div className="admin-info-totalprojects-container">
              <div className="admin-info-totalprojects-text">Prosjekter</div>
              <div className="admin-info-totalprojects-projects">
                {total_projects}
              </div>
            </div>
          </div>
          {/* <div className="line" style={{ width: "40%", marginTop: "20px" }} /> */}
          <div className="admin-list-container">
            <div className="customers">{customers}</div>
            <div className="projects">{projects}</div>
          </div>
          {/* <div className="line" style={{ width: "40%", marginTop: "20px" }} /> */}
        </div>
      </div>
      <Link to="/home" style={{ color: "#1d1d1d", textDecoration: "none" }}>
        <button className="info-button">Tilbake</button>
      </Link>
    </div>
  );
};

export default Admin;
