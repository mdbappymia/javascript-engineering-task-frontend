import React from "react";
import { Container } from "react-bootstrap";
import "./ScreenB.css";
import useStore from "../../hooks/useStore";
import InfiniteScroll from "react-infinite-scroll-component";
import CalculationCardB from "../CalculationCardB/CalculationCardB";

const ScreenB = () => {
  const { calculationsCount, calculations, pageCount, page } = useStore();

  return (
    <Container>
      <h1 className="text-center mt-3">Screen B</h1>
      <div className="screenA-container">
        <div>
          <h4 className="p-2">Total results: {calculationsCount}</h4>
          <div className="calculation-result-card-container-b" id="calculation">
            <InfiniteScroll
              dataLength={calculations.length}
              hasMore={calculations.length === calculationsCount ? false : true}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>End of result</b>
                </p>
              }
              scrollableTarget="calculation"
              loader={
                <div className="text-center">
                  <p>Scroll A Screen</p>
                </div>
              }
            >
              <div>
                {calculations?.map((data) => (
                  <CalculationCardB key={data._id} calculation={data} />
                ))}
              </div>
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
      </div>
    </Container>
  );
};

export default ScreenB;
