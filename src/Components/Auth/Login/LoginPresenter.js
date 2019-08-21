import React from "react";
import styled from "styled-components";
import Input from "../../Input";
import Button from "../../Button";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  ${props => props.theme.greenBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  color: white;
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.lightGreenColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
export default ({
  setAction,
  action,
  name,
  email,
  password,
  passwordCheck,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"이메일"} {...email} type="email" />
          <Input placeholder={"비밀번호"} {...password} />
          <Button text={"로그인"} />
        </form>
      )}{" "}
      {action === "signUp" && (
        <form onSubmit={onSubmit}>
          <Input placeholder={"이름"} {...name} />
          <Input placeholder={"이메일"} {...email} type="email" />
          <Input placeholder={"비밀번호"} {...password} />
          <Input placeholder={"비밀번호 확인"} {...passwordCheck} />
          <Button text={"회원가입"} />
        </form>
      )}
    </Form>
    {action !== "confirm" && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            계정이 없으신가요?{" "}
            <Link onClick={() => setAction("signUp")}>가입하기</Link>
          </>
        ) : (
          <>
            계정이 있으신가요?{" "}
            <Link onClick={() => setAction("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
