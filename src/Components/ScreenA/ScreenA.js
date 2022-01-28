import React, { useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import "./ScreenA.css";
import useStore from "../../hooks/useStore";
import CalculationCard from "../CalculationCard/CalculationCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ScreenA = () => {
  const [calculationTitle, setCalculationTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    calculations,
    page,
    pageCount,
    setPage,
    calculationsCount,
    setCalculations,
    setCalculationsCount,
  } = useStore();
  const handleCalculate = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      alert("File is empty");
      return;
    }
    const formData = new FormData();
    formData.append("calculationTitle", calculationTitle);
    formData.append("file", file);
    axios.post("http://localhost:5000/calculation", formData).then((data) => {
      console.log(data);
      if (data.data.result.acknowledged) {
        setFile(null);
        setCalculationTitle("");
        setCalculationsCount(calculationsCount + 1);
        setCalculations([data.data.insertCalculateData, ...calculations]);
        setLoading(false);
        e.target.reset();
      }
    });
  };
  return (
    <Container>
      <h1 className="text-center mt-3">Screen A</h1>
      <div className="screenA-container">
        <div>
          <h4 className="p-2">Total results: {calculationsCount}</h4>
          <div className="calculation-result-card-container" id="calculations">
            <InfiniteScroll
              dataLength={calculations.length}
              next={() => setPage(page + 1)}
              hasMore={calculations.length === calculationsCount ? false : true}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>End of result</b>
                </p>
              }
              scrollableTarget="calculations"
              loader={
                <div className="text-center">
                  <Spinner animation="grow" />
                </div>
              }
            >
              {loading && (
                <div>
                  <h5 className="text-center">Please wait...</h5>
                </div>
              )}
              <DragDropContext
                onDragEnd={(param) => {
                  const sourceIndex = param.source.index;
                  const destinationIndex = param.destination.index;
                  console.log(sourceIndex, destinationIndex);
                  calculations.splice(
                    destinationIndex,
                    0,
                    calculations.splice(sourceIndex, 1)[0]
                  );

                  fetch("http://localhost:5000/updatePosition", {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify([
                      calculations[sourceIndex],
                      calculations[destinationIndex],
                    ]),
                  });
                  setCalculations([...calculations]);
                }}
              >
                <Droppable droppableId="droppable-1">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {calculations.map((calculation, i) => (
                        <CalculationCard
                          key={calculation._id}
                          i={i}
                          calculation={calculation}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </InfiniteScroll>
          </div>
          <div className="text-center d-flex justify-content-center mb-4">
            {[...Array(pageCount).keys()].map((number) => (
              <p
                className={`${number === page ? "bg-black" : ""} dot`}
                key={number}
              ></p>
            ))}
          </div>
        </div>
        <div className="data-input-section">
          <div className="p-3">
            <h3>Input</h3>
            <form onSubmit={handleCalculate}>
              <div className="title-input-area mb-3 d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  className="title-input"
                  placeholder="Calculation title"
                  required
                  onBlur={(e) => setCalculationTitle(e.target.value)}
                />
                <p className="m-0">Required</p>
              </div>
              <div className="title-input-area mb-3 d-flex justify-content-between align-items-center">
                <FileUploader
                  handleChange={(e) => setFile(e)}
                  name="file"
                  value={file}
                  className="file-input"
                  minSize={0}
                ></FileUploader>
                <p className="m-0">Optional</p>
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="calculate-btn"
              >
                Calculate
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ScreenA;
