/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useData = () => {
  const [recall, setRecall] = useState(false);
  const [page, setPage] = useState(0);
  const [calculationsCount, setCalculationsCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/calculations/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCalculationsCount(data.count);
        const numOfPage = Math.ceil(data.count / 5);
        setPageCount(numOfPage);
        setCalculations([...calculations, ...data.calculations]);
      });
  }, [recall, page]);
  return {
    calculations,
    setRecall,
    page,
    setPage,
    recall,
    calculationsCount,
    setCalculationsCount,
    setCalculations,
    pageCount,
  };
};

export default useData;
