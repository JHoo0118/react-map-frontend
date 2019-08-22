import React from "react";
import styled from "styled-components";
import Input from "../../Input";
import Button from "../../Button";

const Wrapper = styled.div`
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexColBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.greenBox}
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
`;

const ImgBox = styled.div`
  background-image: url("https://img-wishbeen.akamaized.net/plan/1441245800799_8603567984_fdceae3bea_o.jpg");
  background-size: cover;
  height: 354px;
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
  margin-right: 20px;
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
    <ImgBox />
    <FlexColBox>
      <Form>
        {action === "logIn" && (
          <form onSubmit={onSubmit}>
            <Input placeholder={"이메일"} {...email} type="email" />
            <Input placeholder={"비밀번호"} {...password} type="password" />
            <Button text={"로그인"} />
          </form>
        )}{" "}
        {action === "signUp" && (
          <form onSubmit={onSubmit}>
            <Input placeholder={"이름"} {...name} />
            <Input placeholder={"이메일"} {...email} type="email" />
            <Input placeholder={"비밀번호"} {...password} type="password" />
            <Input
              placeholder={"비밀번호 확인"}
              {...passwordCheck}
              type="password"
            />
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
    </FlexColBox>
  </Wrapper>
);
