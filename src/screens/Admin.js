import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteModal } from "../components/deletemodal/DeleteModal";
import Navbar from "../components/navbar/Navbar";
import {
  getUniqueCustomers,
  getUniqueProjects,
  useLocalStorage,
} from "../GlobalFunctions";
import "./screens.css";

const Admin = () => {
  const [data, setData] = useLocalStorage("user-entries", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [project, setProject] = useState("");

  let total_customers = 0;
  let total_projects = 0;
  let unique_customers = [];
  let unique_projects = [];

  const user_email = localStorage.getItem("user-email");

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-token") === null) {
      navigate("/");
    }
  });

  function removeUndefined(arr) {
    Object.values(arr).map((row) => {
      Object.values(row.entries).map((value) => {
        if (Object.keys(value).length === 0) {
          let index = row.entries.indexOf(value);
          row.entries.splice(index, 1);
        }
      });
    });

    Object.values(arr).map((row) => {
      if (row.entries.length === 0) {
        let index = arr.indexOf(row);
        arr.splice(index, 1);
      }
    });
    return arr;
  }

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

    new_data = removeUndefined(new_data);
    setData(new_data);
  }

  function deleteProject(project) {
    let new_data = data;
    Object.values(new_data).map((row) =>
      Object.values(row.entries).map((value) => {
        if (value.project === project) {
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
    new_data = removeUndefined(new_data);
    setData(new_data);
  }

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
        <button>
          <img
            src={require("../images/delete.png")}
            onClick={() => {
              setCustomer(customer);
              setModalOpen(true);
            }}
            style={{ width: "11px", height: "11px" }}
          />
        </button>
      </div>
    );
  });

  const projects = Object.values(unique_projects).map((project, index) => {
    return (
      <div className="project" key={index}>
        {project}
        <button
          onClick={() => {
            setProject(project);
            setModalOpen(true);
          }}
        >
          <img
            src={require("../images/delete.png")}
            onClick={() => {
              setProject(project);
              setModalOpen(true);
            }}
            style={{ width: "11px", height: "11px" }}
          />
        </button>
      </div>
    );
  });

  return (
    <div className="home-container">
      <Navbar />
      <div className="admin-container">
        {user_email}
        <div className="admin-header">
          <div className="admin-text">Dine kunder og prosjekter</div>
        </div>
        <div className="admin-content-container">
          <div className="customers">
            <div className="admin-info-totalcustomers-container">
              <div className="admin-info-totalcustomers-text">Kunder</div>
              <div className="admin-info-totalcustomers-customers">
                {total_customers}
              </div>
            </div>
            <div className="admin-list-content">{customers}</div>
          </div>
          <div className="projects">
            <div className="admin-info-totalprojects-container">
              <div className="admin-info-totalprojects-text">Prosjekter</div>
              <div className="admin-info-totalprojects-projects">
                {total_projects}
              </div>
            </div>
            <div className="admin-list-content">{projects}</div>
          </div>
        </div>
      </div>
      <div className="admin-footer">
        <Link
          to="/home"
          style={{
            color: "#1d1d1d",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          <button className="info-button">Tilbake</button>
        </Link>
        <button
          className="info-button"
          onClick={() => {
            localStorage.removeItem("user-token");
            navigate("/");
          }}
          style={{ marginLeft: "10px" }}
        >
          Logg ut
        </button>
      </div>
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        customer={customer}
        project={project}
        deleteCustomer={() => deleteCustomer(customer)}
        deleteProject={() => deleteProject(project)}
        setCustomer={() => setCustomer("")}
        setProject={() => setProject("")}
      />
    </div>
  );
};

export default Admin;
