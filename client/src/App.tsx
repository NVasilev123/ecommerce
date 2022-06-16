import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product/Product";
import ProductList from "./pages/ProductList/ProductList";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state: any) => state.user.currentUser);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products/:category" element={<ProductList />} />

      <Route path="/product/:id" element={<Product />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/success" element={<Success />} />

      <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />

      <Route
        path="/register"
        element={user ? <Navigate to={"/"} /> : <Register />}
      />
    </Routes>
  );
}

export default App;
