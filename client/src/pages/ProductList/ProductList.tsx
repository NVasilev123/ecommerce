import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Annoucement from "../../components/Annoucment/Annoucement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Products from "../../components/Products/Products";
import {
  Container,
  Filter,
  FilterContainer,
  FilterText,
  Option,
  Select,
  Title,
} from "./ProductList.styles";

const ProductList: React.FC = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState<object>({});
  const [sort, setSort] = useState<string>("newest");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // this renaders the page at the top when we render productsList

  const handleFilters = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select
            defaultValue={"Color"}
            name="color"
            onChange={(e) => handleFilters(e)}
          >
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>gray</Option>
            <Option>green</Option>
          </Select>
          <Select
            defaultValue={"Size"}
            name="size"
            onChange={(e) => handleFilters(e)}
          >
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            defaultValue={"Newest"}
            onChange={(e) => setSort(e.target.value)}
          >
            <Option value={"newest"}>Newest</Option>
            <Option value={"asc"}>Price (asc)</Option>
            <Option value={"desc"}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
