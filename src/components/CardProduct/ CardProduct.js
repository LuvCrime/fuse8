import "./ CardProduct.scss";

export const CardProduct = () => {
  return (
    <div className="app">
      <div className="homepage">
        <h3 className="homepage__developments">Our Latest Developments</h3>
        <div className="input">
          <label for="input__filter" className="input__label">Filter</label>
          <input id="input__filter"></input>
        </div>
        <div className="products"></div>
        <button className="homepage__see-more">See more</button>
      </div>
    </div>
  );
}

