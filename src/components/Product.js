import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../App.css";

export default function Product(props) {
  const [products, setProducts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const { id } = useParams();
  console.log("id is", id);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const product = products.find((item) => {
    console.log("item id is", item.id);

    return item.id == id;
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = React.useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    return (
      <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  let nbrstars = product.rating;
  let stars = [];
  let Empty = 5 - nbrstars;

  for (let i = 0; i < nbrstars; i++) {
    stars.push(<i className="fa-solid fa-star star-icon " key={i}></i>);
  }
  for (let i = 0; i < Empty; i++) {
    stars.push(
      <i class="fa-regular fa-star-half-stroke star-icon " key={i}></i>
    );
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 p-5  ">
        <div className="col">
          <div className=" mb-4 cardono ">
            <img
              src={product.image}
              className="card-img img-fluid"
              alt={props.title}
              title={props.title}
            />
          </div>
        </div>

        <div className="col mb-4 pe-md-5 ps-md-5 ">
          <h4 className="card-title mb-2 ">{product.name}</h4>
          <h5 className="card-price">{product.price}$</h5>
          <div className=" d-flex  ">
            {" "}
            <div className="me-2">
              <p>5/5</p>
            </div>{" "}
            <div>{stars}</div>
          </div>

          <h6 classname="shipping">
            {`${product.shippingFees}$ Import Fees Deposit to Algeria`}{" "}
          </h6>

          <div class="  d-flex flex-row mt-4">
            <button className="size me-2" href="#">
              <h3>{product.size}</h3>
              <p>{product.dimensions}</p>
            </button>
            <button className="size" href="#">
              <h3>Small</h3>
              <p>150 by 18inches</p>
            </button>
          </div>
          <div className="Details-Span mt-2">
            <a className=" Details" href="#" onClick={handleDetailsClick}>
              See more details
            </a>
            {showDetails && (
              <div className="row mt-2">
                <div className=" mt-1">
                  <div className="d-flex flex-row info">
                    <h6 className="card-info">Brand: </h6>
                    <p>{product.brand}</p>
                  </div>
                  <div className="d-flex flex-row info">
                    <h6 className="card-info">Model:</h6>
                    <p>{product.title}</p>
                  </div>
                  <div className="d-flex flex-row info">
                    <h6 className="card-info">Color: </h6>
                    <p>{product.color}</p>
                  </div>
                  <div className="d-flex flex-row info">
                    <h6 className="card-info">Weight: </h6>
                    <p>{product.weight}</p>
                  </div>
                  <div className="flex flex-col ">
                    <h6 className="card-info">Description: </h6>
                    <p className="Card-dis">{product.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex flex-column mt-4">
            <button id="add-to-Bag">Add to Bag</button>
            <button classname=" mt-2" id="add-to-Wishlist">
              Add to Wishlist{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
