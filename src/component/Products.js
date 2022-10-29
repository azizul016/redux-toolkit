/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts, STATUS } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  //redux toolkit without thunk
  // const [products, setProducts] = useState([]);

  //redux toolkit with thunk
  const { data: products, status } = useSelector((state) => state.product);
  useEffect(() => {
    //redux toolkit without thunk
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   setProducts(data);
    // };
    // fetchProducts();
    //redux toolkit with thunk
    dispatch(fetchProducts());
  }, []);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUS.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUS.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="productsWrapper">
      {products?.length > 0 &&
        products?.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt="" />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button onClick={() => handleAdd(product)} className="btn">
              Add to cart
            </button>
          </div>
        ))}
    </div>
  );
};

export default Products;
