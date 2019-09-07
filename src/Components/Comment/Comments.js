import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import { CREATE_COMMENT } from "./CommentQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Picture from "../Picture";
import TimeAgo from "../TimeAgo";
import TimeAgoForSelfComment from "../TimeAgoForSelfComment";

const CommentContainer = styled.div`
  border-top: 1px solid ${props => props.theme.lightGreyColor};
  padding-top: 5px;
  overflow-y: auto;
`;

const CommentBox = styled.div`
  display: flex;
  margin-left: 10px;
  margin-bottom: 4px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  list-style: none;
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const PictureBox = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 30px;
`;

const Author = styled.span`
  display: block;
  margin: 0 10px 0 5px;
  font-weight: 600;
  font-size: 18px;
`;

const TextBox = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin: 5px 0;
`;

const CreatedAt = styled.span`
  font-size: 12px;
  color: ${props => props.theme.darkGreyColor};
`;

const AddCommentBox = styled.div`
  width: 98%;
  border: 1px solid ${props => props.theme.darkGreyColor};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 10px auto 0;
`;

const CommentIconBox = styled.div`
  width: 5%;
  padding: 2px;
`;

const Textarea = styled(TextareaAutosize)`
  background-color: ${props => props.theme.whiteColor};
  width: 100%;
  border: none;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default ({ id, comments, data }) => {
  const newComment = useInput("");
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    variables: { pinId: id, text: newComment.value }
  });
  const [selfComments, setSelfComments] = useState([]);
  const onKeyPress = async event => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      newComment.setValue("");
      let now = new Date();
      now = Date.parse(now);
      try {
        createCommentMutation();
        setSelfComments([
          ...selfComments,
          {
            id: Math.floor(Math.random() * 100),
            pinId: id,
            text: newComment.value,
            author: data.me.name,
            picture: data.me.picture,
            createAt: now
          }
        ]);
      } catch {
        toast.error("댓글을 만들 수 없습니다.");
      }
    }
  };
  return (
    <>
      <CommentContainer>
        <CommentBox>
          {comments && (
            <>
              <Comments>
                {comments.map(comment => (
                  <Comment key={comment.id}>
                    <ProfileContainer>
                      <PictureBox>
                        <Picture size="us" url={comment.author.picture} />
                      </PictureBox>
                      <Author>{comment.author.name}</Author>
                    </ProfileContainer>
                    <TextBox>{comment.text}</TextBox>
                    <CreatedAt>{TimeAgo(comment.createdAt)}</CreatedAt>
                  </Comment>
                ))}
                {selfComments.map(
                  comment =>
                    comment.pinId === id && (
                      <Comment key={comment.id}>
                        <ProfileContainer>
                          <PictureBox>
                            <Picture size="us" url={comment.picture} />
                          </PictureBox>
                          <Author>{comment.author}</Author>
                        </ProfileContainer>
                        <TextBox>{comment.text}</TextBox>
                        <CreatedAt>
                          {TimeAgoForSelfComment(comment.createAt)}
                        </CreatedAt>
                      </Comment>
                    )
                )}
              </Comments>
            </>
          )}
        </CommentBox>
      </CommentContainer>
      <AddCommentBox>
        <CommentIconBox>
          <FontAwesomeIcon icon={faComments} size="1x" />
        </CommentIconBox>
        <Textarea
          placeholder="댓글 입력.."
          onKeyPress={onKeyPress}
          value={newComment.value}
          onChange={newComment.onChange}
        />
      </AddCommentBox>
    </>
  );
};
