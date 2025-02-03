import React from "react";
import Header from "./Header";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import Food from "./Food";

const Track = () => {
  const loggedData = useContext(UserContext);

  const [foodItems, setFoodItems] = useState([]);

  const [food, setFood] = useState(null);

  function searchFood(event) {
    if (event.target.value.length !== 0) {
      fetch(`http://localhost:8000/foods/${event.target.value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedData.loggedUser.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === undefined) {
            setFoodItems(data);
          } else {
            setFoodItems([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFoodItems([]);
    }
  }

  return (
    <>

<section className="container track-container">
  <Header />
  <div className="header-section">
    <h2 className="heading">Nutrition Tracker</h2>
    <p className="subheading">Track your daily food intake and stay healthy!</p>
  </div>

  <div className="search">
    <input
      className="search-inp"
      onChange={searchFood}
      type="search"
      placeholder="Search Food Item"
    />
    {foodItems.length !== 0 ? (
      <div className="search-results">
        {foodItems.map((item) => (
          <p
            className="item"
            onClick={() => {
              setFood(item);
            }}
            key={item._id}
          >
            {item.name}
          </p>
        ))}
      </div>
    ) : null}
  </div>

  {food !== null ? <Food food={food} /> : null}
</section>


      
    </>
  );
};

export default Track;
