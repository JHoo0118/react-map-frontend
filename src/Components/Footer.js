import React from "react";
import styled from "styled-components";
import Media from "./Media";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  margin: 25px auto;
  width: calc(36% - 1px);
  min-width: 400px;

  ${Media.small`visibility: hidden;`}
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.blackColor};
  text-decoration-line: none;
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">서비스</Link>
      </ListItem>
      <ListItem>
        <Link href="#">회사 소개</Link>
      </ListItem>
      <ListItem>
        <Link href="#">개발자</Link>
      </ListItem>
      <ListItem>
        <Link href="#">도움말</Link>
      </ListItem>
      <ListItem>
        <Link href="#">고객센터</Link>
      </ListItem>
    </List>
    <Copyright>ReactMap {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);
