import { useEffect, useState } from "react";
import Annoucement from "../../components/Annoucment/Annoucement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import {
  Bottom,
  Container,
  Details,
  Image,
  Info,
  Product,
  ProductColor,
  ProductDetails,
  ProductId,
  ProductName,
  ProductPrice,
  ProductSize,
  Summary,
  Title,
  Top,
  TopButton,
  TopText,
  TopTexts,
  Wrapper,
  Hr,
  ProductAmountContainer,
  ProductAmount,
  ProductQuantity,
  SummaryTitle,
  SummaryItem,
  SummaryItemText,
  SummaryItemPrice,
  Button,
} from "./Cart.styles";
import { userRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const KEY = process.env.REACT_APP_STRIPE;
  const cart = useSelector((state: any) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();

  const onToken = (token: any) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          //@ts-ignore
          tokenId: stripeToken.id,
          amount: 500,
        });

        history("/success", { state: res.data });
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.totalPrice, history]);

  return (
    <Container>
      <Navbar />
      <Annoucement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton theme="normal">CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Our Whislist</TopText>
          </TopTexts>
          <TopButton theme="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((p: any) => (
              <Product key={p._id}>
                <ProductDetails>
                  <Image src={p.image} />
                  <Details>
                    <ProductName>
                      <b>Prodcut</b> {p.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {p._id}
                    </ProductId>
                    <ProductColor color={p.color} />
                    <ProductSize>
                      <b>Size:</b> {p.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                <ProductPrice>
                  <ProductAmountContainer>
                    <AddIcon />
                    <ProductQuantity>{p.quantity}</ProductQuantity>
                    <RemoveIcon />
                  </ProductAmountContainer>
                  <ProductAmount>$ {p.price * p.quantity}</ProductAmount>
                </ProductPrice>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type="normal">
              <SummaryItemText>sddsa</SummaryItemText>
              <SummaryItemPrice>80$</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="normal">
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>8.90$</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="normal">
              <SummaryItemText>Discount Shipping</SummaryItemText>
              <SummaryItemPrice>-8.90$</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.totalPrice}$</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Niki's Shop"
              billingAddress
              shippingAddress
              description={`Your total cost is $${cart.totalPrice}`}
              amount={cart.totalPrice * 100}
              token={onToken}
              //@ts-ignore
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
