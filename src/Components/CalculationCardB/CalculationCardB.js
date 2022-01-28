import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CalculationCardB = ({ calculation, i }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(typeof calculation.calculationResult.toString());
  return (
    <div className="result-card d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <p className="me-3 m-0">
          {" "}
          ={calculation.calculationResult.toString().slice(0, 5)}
        </p>
        <p className="m-0 fw-bold">{calculation.calculationTitle}</p>
      </div>
      <button
        onClick={handleShow}
        className="btn btn-secondary see-input-button"
      >
        See Input
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input of the calculation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed src={`http://localhost:5000/${calculation.filePath}`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalculationCardB;
