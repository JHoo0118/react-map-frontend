import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import HeaderBar from "../Components/HeaderBar";
import Footer from "../Components/Footer";
import Picture from "../Components/Picture";
import { EDIT_PROFILE } from "../Components/Profile/ProfileQueries";
import { toast } from "react-toastify";
import { GET_PINS_QUERY } from "../Components/Pin/PinQueries";
import { ME } from "../Components/SharedQueries";
import Helmet from "react-helmet";
import Media from "../Components/Media";

const GET_USER = gql`
  query seeUser($name: String!) {
    seeUser(name: $name) {
      id
      name
      email
      password
      picture
      comments {
        id
        text
      }
      pins {
        id
        latitude
        longitude
      }
      isSelf
    }
  }
`;

const Wrapper = styled.div`
  height: 80vh;
  max-width: 820px;
  margin: 0 auto;
`;

const TwoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-top: 40px;

  ${Media.small`justify-items: center;`}
  ${Media.small`grid-template-columns: repeat(1, 1fr);`}
`;

const ProfileGridItem = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 6px;
  width: 100%;
  max-width: 350px;
  min-width: 250px;
  padding: 20px;
`;

const ProfileText = styled.div`
  font-size: 26px;
  margin: 0 auto;
  text-align: center;
`;

const ProflileImageBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  justify-content: center;
  cursor: pointer;
`;

const EditProfileImageBox = styled.div``;

const EditProfileContainer = styled.div`
  position: relative;
  margin-top: 40px;
`;

const ProfileEditText = styled.span`
  display: block;
  font-size: 28px;
  color: ${props => props.theme.blackColor};
  font-family: "Noto Sans KR", sans-serif;
  margin-bottom: 40px;

  ${Media.medium`margin-left: 5px;`}
`;

const EditProfileGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  ${Media.medium`margin: 0 5px;`}
`;

const EditProfileGridItem = styled.div`
  border-top: 2px solid ${props => props.theme.lightGreyColor};
  border-bottom: ${props => props.bottomBorder}px solid
    ${props => props.theme.lightGreyColor};
  border-right: ${props => props.rightBorder}px solid
    ${props => props.theme.lightGreyColor};
  width: 100%;
  padding: 20px;
  grid-column: ${props => props.gridCol};
`;

const EditProfileTitle = styled.span`
  font-weight: 600;
`;

const MoveEditPage = styled.div`
  width: 100%;
  border: ${props => props.theme.whiteBoxBorder};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.whiteColor};
  font-weight: 600;
  background-color: ${props => props.theme.buttonGreenColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #28a745;
  }
  &:focus {
    outline-color: ${props => props.theme.buttonGreenColor};
  }
`;

const ImageInput = styled.input`
  visibility: hidden;
`;

const Label = styled.label``;

const SelectImage = styled.div`
  display: inline-block;
  border: 1px solid #bfbfbf;
  background: #fff;
  height: 32px;
  padding: 10px 12px 0;
  font-weight: 600;
  color: ${props => props.theme.blackColor};
  font-size: 12px;
  cursor: pointer;
  margin-right: 10px;
`;

const BackOriginPicture = styled.div`
  display: inline-block;
  width: 72px;
  border: 1px solid #bfbfbf;
  background: #fff;
  height: 32px;
  padding: 10px 12px 0;
  font-weight: 600;
  color: ${props => props.theme.blackColor};
  font-size: 12px;
  cursor: pointer;
`;

const NameInput = styled.input`
  width: 254px;
  line-height: 27px;
  float: left;
  height: 27px;
  padding: 0 0 0 7px;
  vertical-align: top;
  color: #333;
  border: 1px solid #ccc;
  opacity: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteButton = styled.button`
  min-width: 72px;
  border: 1px solid #bfbfbf;
  background: #fff;
  height: 32px;
  line-height: 32px;
  padding: 0;
  color: ${props => props.theme.blackColor};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const CancelEditProfile = styled.div`
  min-width: 72px;
  border: 1px solid #bfbfbf;
  display: inline-block;
  background: #fff;
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.blackColor};
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default withRouter(({ match: { params: { name } } }) => {
  const [action, setAction] = useState("seeProfile");
  const { data, loading } = useQuery(GET_USER, { variables: { name } });
  useQuery(GET_PINS_QUERY);
  useQuery(ME);
  const [editProfileMutation] = useMutation(EDIT_PROFILE, {
    refetchQueries: () => [{ query: GET_PINS_QUERY }, { query: ME }]
  });
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [control, setControl] = useState("true");
  const [originPicture, setOriginPicture] = useState(false);
  if (!loading && control) {
    setUsername(data.seeUser.name);
    setImage(data.seeUser.image);
    setControl(false);
  }

  const editProfileAction = () => {
    setAction("editProfile");
  };

  const cancelEditProfileAction = () => {
    setAction("seeProfile");
  };

  const SetOriginPicture = () => {
    setOriginPicture(true);
    toast.success("기본 사진으로 변경하였습니다.");
  };

  const HandleImageUpload = async () => {
    const data = new FormData();
    if (!image) {
      return image;
    }
    data.append("file", image);
    data.append("upload_preset", "React Map");
    data.append("cloud_name", "jhoo");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/jhoo/image/upload",
      data
    );
    return res.data.url;
  };

  const HandleSubmit = async event => {
    event.preventDefault();
    let url = "";
    if (originPicture) {
      url = "https://img.icons8.com/dusk/64/000000/cat-profile.png";
    } else {
      url = await HandleImageUpload();
    }
    const { data: editProfile } = await editProfileMutation({
      variables: {
        name: username,
        picture: url
      }
    });
    console.log(editProfile);
    window.location.href = `/${username}`;
  };

  return (
    <>
      {!loading && (
        <>
          <Helmet>
            <title>프로필 | React Map</title>
          </Helmet>
          <HeaderBar name={data.seeUser.name} picture={data.seeUser.picture} />
          {action === "seeProfile" && (
            <>
              <Wrapper>
                <TwoGrid>
                  <ProfileGridItem>
                    <ProfileText>{data.seeUser.name}님의 프로필</ProfileText>
                    <ProflileImageBox onClick={editProfileAction}>
                      <Picture url={data.seeUser.picture} size="lg" />
                    </ProflileImageBox>
                    <MoveEditPage onClick={editProfileAction}>
                      수정하기
                    </MoveEditPage>
                  </ProfileGridItem>
                </TwoGrid>
              </Wrapper>
              <Footer />
            </>
          )}
          {action === "editProfile" && (
            <Wrapper>
              <EditProfileContainer>
                <ProfileEditText>프로필 수정하기</ProfileEditText>
                <EditProfileGridBox>
                  <EditProfileGridItem
                    style={{ backgroundColor: "#EEEEEE" }}
                    rightBorder="2"
                    gridCol="span 1"
                  >
                    <EditProfileTitle>프로필 사진</EditProfileTitle>
                  </EditProfileGridItem>
                  <EditProfileGridItem gridCol="2 / span 3">
                    <EditProfileImageBox>
                      <Picture url={data.seeUser.picture} size="lg" />
                    </EditProfileImageBox>
                    <ImageInput
                      accept="image/*"
                      id="imageSet"
                      type="file"
                      onChange={e => setImage(e.target.files[0])}
                    />
                    <ButtonWrapper>
                      <Label htmlFor="imageSet">
                        <SelectImage>사진변경</SelectImage>
                      </Label>
                      <BackOriginPicture onClick={SetOriginPicture}>
                        기본사진
                      </BackOriginPicture>
                    </ButtonWrapper>
                  </EditProfileGridItem>
                </EditProfileGridBox>
                <EditProfileGridBox>
                  <EditProfileGridItem
                    style={{ backgroundColor: "#EEEEEE" }}
                    bottomBorder="2"
                    rightBorder="2"
                    gridCol="span 1"
                  >
                    <EditProfileTitle>이름</EditProfileTitle>
                  </EditProfileGridItem>
                  <EditProfileGridItem bottomBorder="2" gridCol="2 / span 3">
                    <NameInput
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </EditProfileGridItem>
                </EditProfileGridBox>
              </EditProfileContainer>
              <SubmitButtonWrapper>
                <WhiteButton onClick={HandleSubmit}>적용</WhiteButton>
                <CancelEditProfile onClick={cancelEditProfileAction}>
                  취소
                </CancelEditProfile>
              </SubmitButtonWrapper>
            </Wrapper>
          )}
        </>
      )}
    </>
  );
});
