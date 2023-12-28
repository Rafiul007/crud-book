import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import {
  Button,
  Table,
  TableBody,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
function Home() {
  const [fetchData, setfetchData] = useState([])

  const fetchUsers = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/books');
          console.log("Response data",response)
          setfetchData(response.data)
          console.log("fetch data",fetchData)
      } catch (error) {
          console.error('Error fetching users:', error);
      }
  };

  useEffect(() => {
      fetchUsers();
  },[])
  const [formData, setFormData] = useState({
    // Define your form fields here
    title: "",
    author: "",
    publishYear: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend to add the data
      const response = await axios.post("http://localhost:3000/api/books/", formData);
      console.log(response)
      // Optionally, you can reset the form after successful submission
      setFormData({
        title: "",
        author: "",
        publishYear: 0,
      });

      alert("Data added successfully!");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>

        <label>
          Published Year:
          <input
            type="number"
            name="publishYear"
            value={formData.publishYear}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Data</button>
      </form>
      <div className="data-container">
        {
          // If there is no book data yet, show this message.
          !fetchData ? (
            "No books have been added yet."
            ) : (
              // Otherwise, render the list of books.
              fetchData.map((item,index)=>{
                return(
                  <div className="book" key={item._id}>
                    <h3>{item.title}</h3>
                    <p>Author: {item.author}, Year: {item.publishYear}</p>
                  </div>
                )
              })
            )
        }
      </div>
    </div>
  );
}

export default Home;
