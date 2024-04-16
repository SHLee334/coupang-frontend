import { getProducts } from "../api/product";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productAPI = async () => {
    setLoading(true);
    const response = await getProducts(page);
    const newData = response.data;
    setProducts((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const scroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading
      ) {
        productAPI();
      }
    };

    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [page, loading]);

  return (
    <section className="category-best container">
      {products.map((product) => (
        <div key={product.prodCode}>
          <img
            src={product.prodPhoto?.replace("D:", "http://localhost:8081")}
          />
          <h2>{product.prodName}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </section>
  );
};
export default ProductList;
