import "./CardProduct.scss";

export const CardProduct = (props) => {
  return (
    <div className="card-item">
      <div className="card-item__image-wrapper">
        <img
          className="card-item__image"
          src="https://via.placeholder.com/300x150/FF0000/FFFFFF?text=title"
          width="379px"
          height="233px"
        ></img>
        <div className={`card-item__type ${props.productItem.type === "IndependentLiving" ? "card-item__type_independentLiving" : "card-item__type_supportAvailable"}`}>
          {props.productItem.type === "IndependentLiving"
            ? "Independent living"
            : "Restaurant & Support available"}
        </div>
      </div>
      <div className="card-item__info">
        <div className="card-item__info__title">{props.productItem.title}</div>
        <div className="card-item__info__address">
          {props.productItem.address}
        </div>
        <div className="card-item__info__price">
          New Properties for Sale from 
          <span className="card-item__info__price_highlight">
             &#163;{props.productItem.price}
          </span>
        </div>
        <div className="card-item__info__ownership">
          Shared Ownership Available
        </div>
      </div>
    </div>
  );
};
