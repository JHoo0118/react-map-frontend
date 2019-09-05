import React, { useContext } from "react";
import styled from "styled-components";
import Context from "../context";
import Picture from "../Picture";
import TimeAgo from "../TimeAgo";
import Comments from "../Comment/Comments";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  background-color: ${props => props.theme.whiteColor};
  top: 0;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: "cover";
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 10px 0 10px 20px;
  border-bottom: 1px solid ${props => props.theme.lightGreyColor};
  margin-bottom: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  border-right: 1px solid ${props => props.theme.lightGreyColor};
  margin-right: 10px;
`;

const PictureBox = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 30px;
  max-height: 30px;
  margin-right: 10px;
`;

const Title = styled.span`
  font-family: "Google Sans", Roboto, "Noto Sans KR", Arial, sans-serif;
  font-size: 32px;
`;

const Author = styled.a`
  color: ${props => props.theme.blackColor};
  display: block;
  padding-right: 10px;
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

const CreatedAt = styled.span`
  display: block;
  color: ${props => props.theme.darkGreyColor};
  font-size: 12px;
  text-align: right;
  margin: 15px;
`;

const ContentBox = styled.div`
  margin: 0 10px;
`;

const Content = styled.span`
  font-family: "Google Sans", Roboto, "Noto Sans KR", Arial, sans-serif;
  line-height: 1.5em;
`;

export default ({ data }) => {
  const { state, dispatch } = useContext(Context);
  const {
    id,
    title,
    author,
    content,
    createdAt,
    comments,
    image
  } = state.currentPin;
  const handleTogglePopup = () => {
    dispatch({ type: "SEE_FULL_PHOTO" });
  };

  return (
    <>
      <Wrapper>
        <Image src={image} onClick={handleTogglePopup} />
        <TitleContainer>
          <ProfileContainer>
            <PictureBox>
              <Picture size="sm" url={author.picture} />
            </PictureBox>
            <Author>{author.name}</Author>
          </ProfileContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <ContentBox>
          <Content>{content}</Content>
        </ContentBox>
        <CreatedAt>{TimeAgo(createdAt)}</CreatedAt>
        <Comments id={id} comments={comments} author={author} data={data} />
      </Wrapper>
    </>
  );
};
