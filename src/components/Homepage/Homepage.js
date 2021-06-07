import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useScrollIndicator } from "react-use-scroll-indicator";
import { useMediaQuery } from "react-responsive";
import { CardProduct } from "../CardProduct/CardProduct";
import "./Homepage.scss";

const itemPerPage = 6;

export const Homepage = () => {
  const [data, setData] = useState(null); //request data
  const [inputVal, setIntutVal] = useState(""); //input value
  const [itemsToShow, showItems] = useState(itemPerPage); //items per page
  const [scroll, api] = useScrollIndicator(); //scroll position to show or hide button

  //media queries

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-device-width: 1223px)",
  });

  //request

  useEffect(() => {
    fetch("https://603e38c548171b0017b2ecf7.mockapi.io/homes")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  //render and filter data
  //hide button "see more" if all items are sliced

  const getData = useCallback(
    (data) => {
      if (data !== null) {
        if (inputVal.length > 3) {
          data = data.filter((product) => {
            if (product.title.toLowerCase().includes(inputVal)) return true
            return false;
          });
        }
        let hideButton = false;
        let beforeSliceLen = data.length;
        data = data.slice(0, itemsToShow);
        let afterSliceLen = data.length;
        if (beforeSliceLen === afterSliceLen) {
          hideButton = true;
        }
        return {
          data: data.map((product) => {
            return (
              <Link
                className="card-item-link"
                to={`/details/${product.id}`}
                key={product.id}
              >
                <CardProduct productItem={product} key={product.id} />
              </Link>
            );
          }),
          hideButton: hideButton,
        };
      } else {
        return { hideButton: false, data: null };
      }
    },
    [inputVal, itemsToShow]
  );

  let { data: dataToRender, hideButton } = getData(data);


  //get input val

  const onInputChange = useCallback(
    (e) => {
      setIntutVal(e.target.value.toLowerCase());
    },
    [setIntutVal]
  );

  //quantity of items per rage
  //triggerd scroll on click to count its position

  const showMoreItems = useCallback(() => {
    showItems(itemsToShow + itemPerPage);
    setTimeout(() => {
      api.activeListener();
    });
  }, [itemsToShow, showItems, api]);

  return (
    <>
      {isDesktop && (
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
              <div
                className={`products ${
                  hideButton ? "products_reduce-padding" : ""
                }`}
              >
                {dataToRender}
              </div>
            </div>
            {scroll.value > 93 ? (
              <button
                className={`homepage__see-more ${
                  hideButton ? "homepage__see-more_hidden" : ""
                }`}
                onClick={showMoreItems}
              >
                See more
                <div className="homepage__arrow"></div>
              </button>
            ) : null}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="app">
          <div className="homepage">
            <h3 className="homepage__developments">Our Latest Developments</h3>
            <div className="content-wrapper content-wrapper-mobile">
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
              <div
                className={`products products-mobile ${
                  hideButton ? "products_reduce-padding" : ""
                }`}
              >
                {dataToRender}
              </div>
            </div>
            {scroll.value > 93 ? (
              <button
                className={`homepage__see-more ${
                  hideButton ? "homepage__see-more_hidden" : ""
                }`}
                onClick={showMoreItems}
              >
                See more
                <div className="homepage__arrow"></div>
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
