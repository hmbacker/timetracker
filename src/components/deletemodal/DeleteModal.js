import Modal from "react-modal";
import React from "react";
import "./DeleteModal.css";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    border: "none",
    boxShadow: "0 0 2px 2px #d5d5d5",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#1d1d1d",
    color: "#f1f1f1",
    textAlign: "center",
  },
};

export const DeleteModal = (props) => {
  return (
    <Modal
      isOpen={props.modalOpen}
      style={modalStyles}
      ariaHideApp={false}
      overlayClassName="csv-modal-background"
    >
      Er du sikker på at du vil fjerne{" "}
      {props.customer ? props.customer : props.project} fra alle rapporter?
      {props.customer && (
        <div
          className="delete"
          onClick={() => {
            props.deleteCustomer(props.customer);
            props.setModalOpen(false);
          }}
        >
          Fjern {props.customer}
        </div>
      )}
      {props.project && (
        <div
          className="delete"
          onClick={() => {
            props.deleteProject(props.project);
            props.setModalOpen(false);
          }}
        >
          Fjern {props.project}
        </div>
      )}
      <button
        className="info-button"
        style={{ marginTop: "20px" }}
        onClick={() => {
          props.setCustomer("");
          props.setProject("");
          props.setModalOpen(false);
        }}
      >
        Lukk
      </button>
    </Modal>
  );
};
