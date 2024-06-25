import React, { useEffect, useState } from "react";

export default function MyApp({ search, setSearch }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15

  const getApi = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const temp = await response.json();
      setData(temp);
      setFilteredData(temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (search.trim() === "") {
        setFilteredData(data);
      } else {
        const lowercasedFilter = search.toLowerCase();
        const filtered = data.filter(item =>
          item.title.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [search, data]);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="search-results">
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th style={{ minWidth: "70%" }}>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">{item.userId}</td>
                  <td>{item.title}</td>
                  <td className="text-center">{item.completed ? "true" : "false"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{marginLeft:"50px"}}>
        <button onClick={() => paginate(1)}>First</button>
        <button onClick={() => paginate(currentPage - 1)}>Previous</button>
        <button onClick={() => paginate(currentPage + 1)}>Next</button>
        <button onClick={() => paginate(Math.ceil(filteredData.length / itemsPerPage))}>Last</button>
      </div>
    </div>
  );
}
