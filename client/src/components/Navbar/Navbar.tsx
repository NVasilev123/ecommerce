import {
  Container,
  Wrapper,
  Left,
  Center,
  Right,
  Language,
  SearchContainer,
  Input,
  Logo,
  MenuItem,
} from "./Navbar.styles";

import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const quantity = useSelector((state: any) => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search an item" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to={"/"} style={{textDecoration : 'none'}}>
            <Logo>Niki's</Logo>
          </Link>
        </Center>
        <Right>
        <Link to={'/login'} style={{textDecoration : 'none'}}>
          <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to={'/register'} style={{textDecoration : 'none'}}>
          <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
