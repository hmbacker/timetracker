import Modal from "react-modal";
import React from "react";
import { CSVLink } from "react-csv";
import "./CsvModal.css";

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

export const CsvModal = (props) => {
  console.log(props.data);
  return (
    <Modal
      isOpen={props.modalOpen}
      style={modalStyles}
      data={props.data}
      overlayClassName="csv-modal-background"
    >
      Antall timer denne uken er under 40. Vil du fortsatt eksportere til .csv?
      <CSVLink
        data={props.data.entries}
        filename={"timerapport_uke_" + props.data.week + ".csv"}
        enclosingCharacter={""}
        style={{ color: "#f1f1f1", fontSize: "16px", marginTop: "20px" }}
      >
        Eksporter til .csv
      </CSVLink>
      <button
        className="info-button"
        style={{ marginTop: "20px" }}
        onClick={() => {
          props.setModalOpen(false);
        }}
      >
        Lukk
      </button>
    </Modal>
  );
};
