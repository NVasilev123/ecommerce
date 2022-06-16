import {
  Button,
  Container,
  Desc,
  Input,
  InputContainer,
  Title,
} from "./NewsLetter.styles";

import SendIcon from "@mui/icons-material/Send";

const NewsLetter: React.FC = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favourite products</Desc>
      <InputContainer>
        <Input placeholder="Your e-mail" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
