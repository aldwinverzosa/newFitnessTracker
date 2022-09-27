import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css';
import LogoutButton from "./logout";



const cohort = "2208-ftb-et-web-ft";
const strangerThings = "https://strangers-things.herokuapp.com/api";

const ViewAllPosts = (props) => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      await getAllPosts();
    };
    getAllData();
  }, []);
  const allitems = props.allitems;

  const getAllPosts = async () => {
    const response = await fetch(`${strangerThings}/${cohort}/posts`);
    getAllPosts();
    const data = await response.json();
    console.log("DATA", data)
    setAllPosts(data.data.posts);
    console.log(data.data);
  };

  return (
    <div>
      <nav>
        <Link className="navBarLink" to="/dashboard">
          Dashboard
        </Link>
       
      </nav>
      <div className="logout2">
        <LogoutButton/>
        </div>
      <h1>All Postings</h1>

      { allPosts.map((singleItem, i) => {
        return (
          <div className="card" key={i}>
            <h2 className="postName">Title: {singleItem.title}</h2>
            <h4>Description: {singleItem.description}</h4>
            <h4>Price: {singleItem.price}</h4>
            <h4>Seller: {singleItem.author.username}</h4>
            <h4>Updated At: {singleItem.updatedAt}</h4>
            <h4>ID: {singleItem._id}</h4>
            <button>See Message</button>


          </div>
        );
      })}
    </div>
  );
};

export default ViewAllPosts;
