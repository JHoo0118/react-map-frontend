import React from "react";
import styled from "styled-components";
import Input from "../../Input";
import Button from "../../Button";
import Footer from "../../Footer";
import Helmet from "react-helmet";

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
  ${props => props.theme.whiteBox}
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
`;

const ImgBox = styled.div`
  background-image: url("https://img-wishbeen.akamaized.net/plan/1441245800799_8603567984_fdceae3bea_o.jpg");
  background-size: cover;
  box-shadow: rgba(31, 51, 73, 0.1) 0px 0px 30px 6px;
  height: 424px;
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
  margin-right: 20px;
`;

const StateChanger = styled(Box)`
  color: ${props => props.theme.blackColor};
  box-shadow: rgba(31, 51, 73, 0.1) 0px 0px 30px 6px;
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  box-shadow: rgba(31, 51, 73, 0.1) 0px 0px 30px 6px;
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

const Label = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 600;
  padding: 0px;
  min-width: 236px;
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
  <>
    <Wrapper>
      <ImgBox />
      <FlexColBox>
        <Form>
          {action === "logIn" && (
            <>
              <Helmet>
                <title>로그인 | React Map</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Label>이메일</Label>
                <Input placeholder={""} {...email} type="email" />
                <Label>비밀번호</Label>
                <Input placeholder={""} {...password} type="password" />
                <Button text={"로그인"} />
              </form>
            </>
          )}{" "}
          {action === "signUp" && (
            <>
              <Helmet>
                <title>회원가입 | React Map</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Label>이름</Label>
                <Input placeholder={""} {...name} />
                <Label>이메일</Label>
                <Input placeholder={""} {...email} type="email" />
                <Label>비밀번호</Label>
                <Input placeholder={""} {...password} type="password" />
                <Label>비밀번호 확인</Label>
                <Input placeholder={""} {...passwordCheck} type="password" />
                <Button text={"회원가입"} />
              </form>
            </>
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
    <Footer />
  </>
);
