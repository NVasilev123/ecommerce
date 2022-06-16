import { useState } from "react";
import axios from "axios";
import {
  Aggrement,
  Button,
  Container,
  Form,
  Input,
  Title,
  Wrapper,
  Error,
} from "./Register.styles";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        username,
        password,
      });
      history("/login");
    } catch (err) {}
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            onChange={(e) => setRepeatPass(e.target.value)}
            type="password"
          />
          <Aggrement>
            By creating an account , I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Aggrement>
          {password !== repeatPass && <Error>Password must match</Error>}
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
