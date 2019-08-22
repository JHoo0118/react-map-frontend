import React, { useState } from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { device } from "./Device";
import Picture from "./Picture";
import { useMutation } from "react-apollo-hooks";

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const Header = styled.div`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderColumn = styled.div`
  width: 30%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const Logo = styled.a`
  color: #e6e6e6;
  font-size: 32px;
  font-weight: 700;
  text-decoration: none;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PictureBox = styled.div`
  background-color: #e6e6e6;
  border-radius: 50px;
  max-height: 50px;
  margin-right: 20px;
`;

const ProfileUserName = styled.a`
  color: ${props => props.theme.lightGreyColor};
  display: block;
  text-decoration: none;
  font-size: 40px;
  cursor: pointer;
  text-align: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                     supported by Chrome and Opera */
  &:hover {
    color: ${props => props.theme.lightGreenColor};
  }
`;

const DropdownBox = styled.div`
  top: 60px;
  background-color: rgb(17, 26, 25);
  position: absolute;
  right: 0;
  width: 200px;
  z-index: 30;
  &::after {
    margin-left: -10px;
    border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0) rgb(17, 26, 25);
    border-width: 10px;
    bottom: 100%;
    left: 86%;
    content: " ";
    height: 0px;
    width: 0px;
    position: absolute;
    pointer-events: none;
    border-style: solid;
    box-sizing: border-box;
  }
`;

const DropdownUnOrderedList = styled.ul`
  list-style: none;
  display: block;
  text-align: center;
  margin: 0px;
  padding: 0px;
`;

const DropdownList = styled.li`
  display: list-item;
  padding: 20px 0px;
`;

const DropdownLink = styled.a`
  color: #e6e6e6;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.lightGreenColor};
  }
`;

export default ({ name, picture }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [logOut] = useMutation(LOG_OUT);
  const handleDropbox = () => {
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  return (
    <>
      <Header>
        <HeaderWrapper>
          <HeaderColumn>
            <Logo href="#">React Map</Logo>
          </HeaderColumn>
          <HeaderColumn>
            <ProfileContainer>
              <>
                <PictureBox>
                  <Picture size="md" url={picture} />
                </PictureBox>
                <ProfileUserName onClick={handleDropbox}>
                  {name}
                </ProfileUserName>
                {isOpened && (
                  <DropdownBox>
                    <DropdownUnOrderedList>
                      <DropdownList>
                        <DropdownLink href="#">프로필</DropdownLink>
                      </DropdownList>
                      <DropdownList>
                        <DropdownLink onClick={logOut}>로그아웃</DropdownLink>
                      </DropdownList>
                    </DropdownUnOrderedList>
                  </DropdownBox>
                )}
              </>
            </ProfileContainer>
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
    </>
  );
};
