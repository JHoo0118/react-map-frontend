import React, { useState } from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import Picture from "./Picture";
import { useMutation } from "react-apollo-hooks";

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const ProfileContainer = styled.div`
  width: auto;
  right: 0;
  position: absolute;
  background: transparent;
  z-index: 10;
  display: flex;
  top: 10px;
  right: 20px;
`;

const PictureBox = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 30px;
  max-height: 30px;
  margin-right: 10px;
`;

const ProfileUserName = styled.a`
  color: ${props => props.theme.blackColor};
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
    color: ${props => props.theme.darkGreyColor};
  }
`;

const DropdownBox = styled.div`
  top: 50px;
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
    left: 95%;
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
    <>
      <ProfileContainer>
        <>
          <PictureBox>
            <Picture size="sm" url={picture} />
          </PictureBox>
          <ProfileUserName onClick={handleDropbox}>{name}</ProfileUserName>
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
    </>
  );
};
