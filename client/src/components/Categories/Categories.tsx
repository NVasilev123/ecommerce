import { Container } from "./Categories.styles";
import { categories } from "../../data";
import CategoryItem from "../CategoryItem/CategoryItem";

const Categories: React.FC = () => {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          img={category.img}
          cat={category.category}
        />
      ))}
    </Container>
  );
};

export default Categories;
