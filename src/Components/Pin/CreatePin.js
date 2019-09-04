import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import Context from "../context";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_PIN, GET_PINS_QUERY } from "./PinQueries";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
`;

const Header = styled.div`
  width: 100%;
  color: ${props => props.theme.greenColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const HeaderText = styled.span`
  font-size: 36px;
  font-weight: 600;
`;

const HeaderIconContainer = styled.div`
  margin-right: 40px;
  color: ${props => props.theme.greenColor};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleTextareaContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.darkGreyColor};
  margin-right: 34px;
  width: 100%;
`;

const TitleTextarea = styled.textarea`
  margin-right: 14px;
  width: 100%;
  border: none;
  background-color: ${props => props.theme.whiteColor};
  resize: none;
  overflow: auto;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.darkGreyColor};
  }
`;
const ImageInputContainer = styled.div`
  width: 10%;
  background-color: ${props => props.theme.whiteColor};
  color: ${props => props.theme.blackColor};
  border: none;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: none;
  }
`;

const ImageInput = styled.input`
  visibility: hidden;
`;

const Label = styled.label`
  width: 100%;
`;

const CameraImage = styled(FontAwesomeIcon)`
  &:hover {
    opacity: 0.6;
  }
`;
const ContentTextareaContainer = styled.div`
  border: 1px solid ${props => props.theme.darkGreyColor};
  width: 100%;
  margin-top: 26px;
  padding-bottom: 40px;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  background-color: ${props => props.theme.whiteColor};
  overflow: auto;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.darkGreyColor};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  justify-content: space-between;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  width: 46%;
  background-color: ${props => props.theme.greenColor};
  border: none;
  font-weight: 600;
  &:focus {
    outline-color: ${props => props.theme.buttonGreenColor};
  }
  &:hover {
    background-color: none;
  }
`;

const DiscardButton = styled.button`
  width: 46%;
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.whiteColor};
  border: none;
  font-weight: 600;
  &:focus {
    outline-color: #fb213c;
  }
  &:hover {
    background-color: ${props => props.theme.buttonRedColor};
  }
`;

export default ({ draft }) => {
  const { dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  useQuery(GET_PINS_QUERY);
  const [createPinMutation] = useMutation(CREATE_PIN, {
    refetchQueries: () => [{ query: GET_PINS_QUERY }]
  });

  const HandleDeleteDraft = () => {
    setTitle("");
    setImage("");
    setContent("");
    dispatch({ type: "HANDLE_TOGGLE_BUTTON" });
    dispatch({ type: "DELETE_DRAFT" });
  };

  const HandleImageUpload = async () => {
    const data = new FormData();
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
    const url = await HandleImageUpload();
    const { data: createPin } = await createPinMutation({
      variables: {
        title: title,
        content: content,
        image: url,
        latitude: draft.latitude,
        longitude: draft.longitude
      }
    });
    await dispatch({ type: "CREATE_PIN", payload: createPin.createPin });
    toast.success("핀이 생성되었습니다.");
    HandleDeleteDraft();
  };

  return (
    <Container>
      <Header>
        <HeaderIconContainer>
          <FontAwesomeIcon icon={faImage} size="4x" />
        </HeaderIconContainer>
        <HeaderText>핀 만들기</HeaderText>
      </Header>
      <TitleContainer>
        <TitleTextareaContainer>
          <TitleTextarea
            placeholder="제목"
            rows="1"
            cols="16"
            maxLength="16"
            onChange={e => setTitle(e.target.value)}
          />
        </TitleTextareaContainer>
        <ImageInputContainer>
          <ImageInput
            accept="image/*"
            id="image"
            type="file"
            onChange={e => setImage(e.target.files[0])}
          />
          <Label htmlFor="image">
            <CameraImage
              icon={faCameraRetro}
              size="2x"
              style={{ color: image && "green" }}
            />
          </Label>
        </ImageInputContainer>
      </TitleContainer>

      <ContentTextareaContainer>
        <ContentTextarea
          placeholder="내용"
          rows="8"
          cols="32"
          maxLength="600"
          onChange={e => setContent(e.target.value)}
        />
      </ContentTextareaContainer>
      <ButtonContainer>
        <SubmitButton
          type="submit"
          disabled={!title.trim() || !content.trim() || !image}
          onClick={HandleSubmit}
        >
          만들기
        </SubmitButton>
        <DiscardButton onClick={HandleDeleteDraft}>취소</DiscardButton>
      </ButtonContainer>
    </Container>
  );
};
