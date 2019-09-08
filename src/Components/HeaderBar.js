import React, { useState } from "react";
import styled from "styled-components";
import Picture from "./Picture";
import { useMutation } from "react-apollo-hooks";
import { LOG_OUT } from "./Auth/Login/LogoutQueries";
import Media from "../Components/Media";

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: ${props => props.theme.headerBlackColor};
`;

const LogoBox = styled.div`
  width: 30%;
  margin-left: 20px;

  ${Media.medium`width: 40%;`}
  ${Media.small`width: 50%;`}
`;

const Logo = styled.a`
  font-size: 28px;
  color: ${props => props.theme.whiteColor};
  font-family: "Noto Sans KR", sans-serif;
  text-decoration: none;
`;

const HeaderInfoBox = styled.div`
  width: 70%;
`;

const HeaderProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const PictureBox = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 30px;
  height: 46px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileUserName = styled.a`
  color: ${props => props.theme.whiteColor};
  display: block;
  text-decoration: none;
  font-size: 24px;
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
    color: ${props => props.theme.lightGreyColor};
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
    left: 88%;
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
  width: 70%;
  margin: 0px auto;
  &:not(:last-child) {
    border-bottom: ${props => props.theme.whiteBoxBorder};
  }
`;

const DropdownLink = styled.a`
  color: #e6e6e6;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.darkGreyColor};
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
    <HeaderBox>
      <LogoBox>
        <Logo href="/">React Map</Logo>
      </LogoBox>
      <HeaderInfoBox></HeaderInfoBox>
      <HeaderProfileBox>
        <PictureBox>
          <Picture url={picture} size="md" />
        </PictureBox>
        <ProfileUserName onClick={handleDropbox}>{name}</ProfileUserName>
      </HeaderProfileBox>
      {isOpened && (
        <DropdownBox>
          <DropdownUnOrderedList>
            <DropdownList>
              <DropdownLink href={name}>프로필</DropdownLink>
            </DropdownList>
            <DropdownList>
              <DropdownLink href="/">지도</DropdownLink>
            </DropdownList>
            <DropdownList>
              <DropdownLink onClick={logOut}>로그아웃</DropdownLink>
            </DropdownList>
          </DropdownUnOrderedList>
        </DropdownBox>
      )}
    </HeaderBox>
  );
};
