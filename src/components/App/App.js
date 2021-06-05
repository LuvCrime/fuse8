import React, { useState, useEffect } from "react";
import "./App.scss";

const App = () => {
  const [data, setData] = useState({ products: [] });

  useEffect(() => {
    fetch("https://603e38c548171b0017b2ecf7.mockapi.io/homes")
      .then((res) => res.json())
      .then((res) => setData({ products: res }));
  }, []);

  console.log(data);

  return (
    <div className="app">
      <div className="homepage">
        <h3 className="homepage__developments">Our Latest Developments</h3>
        <div className="content-wrapper">
          <div className="input">
            <label htmlFor="input__filter" className="input__label">
              Filter
            </label>
            <input id="input__filter"></input>
          </div>
          <div className="products"></div>
        </div>
        <button className="homepage__see-more">See more
        <div className="homepage__arrow"></div></button>
      </div>
    </div>
  );
};

export default App;
