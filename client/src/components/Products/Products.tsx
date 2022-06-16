import { useEffect, useState } from "react";
import axios from "axios";

import { Container } from "./Products.styles";
import Product from "../Product/Product";

interface Props {
  cat?: string;
  filters?: object;
  sort?: string;
}

const Products: React.FC<Props> = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products/"
        );

        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          //@ts-ignore
          Object.entries(filters).every(([key, value]) =>
            //@ts-ignore
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((product) => (
            <Product key={product._id} img={product.image} id={product._id} />
          ))
        : products
            .slice(0, 5)
            .map((product) => (
              <Product key={product._id} img={product.image} id={product._id} />
            ))}
    </Container>
  );
};

export default Products;
