import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useScrollIndicator } from "react-use-scroll-indicator";
import { CardProduct } from "../CardProduct/CardProduct";
import "./Homepage.scss";

const itemPerPage = 6;

export const Homepage = () => {
  const [data, setData] = useState(null);
  const [inputVal, setIntutVal] = useState("");
  const [itemsToShow, showItems] = useState(itemPerPage);
  const [scroll, api] = useScrollIndicator();
  const [isButtonHidden, hideButton] = useState(false);

  useEffect(() => {
    fetch("https://603e38c548171b0017b2ecf7.mockapi.io/homes")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const getData = useCallback(
    (data) => {
      if (data !== null) {
        if (inputVal.length > 3) {
          data = data.filter((product) => {
            if (product.title.toLowerCase().includes(inputVal)) return true;
          });
        }
        data = data.slice(0, itemsToShow);
        return data.map((product) => {
          return (
            <Link
              className="card-item-link"
              to={`/details/${product.id}`}
              key={product.id}
            >
              <CardProduct productItem={product} key={product.id} />
            </Link>
          );
        });
      }
    },
    [data, inputVal, itemsToShow]
  );

  const onInputChange = useCallback(
    (e) => {
      setIntutVal(e.target.value.toLowerCase());
    },
    [setIntutVal]
  );

  const showMoreItems = useCallback(() => {
    showItems(itemsToShow + itemPerPage);
    setTimeout(() => {
        api.activeListener();
    })
  }, [itemsToShow, showItems]);

  return (
    <div className="app">
      <div className="homepage">
        <h3 className="homepage__developments">Our Latest Developments</h3>
        <div className="content-wrapper">
          <div className="input">
            <label htmlFor="input__filter" className="input__label">
              Filter
            </label>
            <input
              id="input__filter"
              onChange={onInputChange}
              value={inputVal}
            ></input>
          </div>
          <div className="products">{getData(data)}</div>
        </div>
        {scroll.value > 93 ? (
          <button className="homepage__see-more" onClick={showMoreItems}>
            See more
            <div className="homepage__arrow"></div>
          </button>
        ) : null}
      </div>
    </div>
  );
};
