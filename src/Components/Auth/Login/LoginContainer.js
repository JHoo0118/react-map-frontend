import React, { useState } from "react";
import LoginPresenter from "./LoginPresenter";
import useInput from "../../../Hooks/useInput";
import { CONFIRM, LOCAL_LOG_IN, CREATE_USER } from "./LoginQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const passwordCheck = useInput("");
  const picture = useInput("");

  const [createUserMutation] = useMutation(CREATE_USER, {
    variables: {
      name: name.value,
      email: email.value,
      password: password.value,
      picture: picture.value
    }
  });

  const [confirmMutation] = useMutation(CONFIRM, {
    variables: {
      email: email.value,
      password: password.value
    }
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (password.value !== "" && email.value !== "") {
        try {
          const {
            data: { confirm: token }
          } = await confirmMutation();
          if (!token) {
            toast.error("계정이 없습니다. 먼저 회원가입을 하세요.");
            setTimeout(() => {
              setAction("signUp");
            }, 3000);
          } else if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("이메일 또는 비밀번호가 틀렸습니다.");
        }
      }
    } else if (action === "signUp") {
      if (
        name.value !== "" &&
        email.value !== "" &&
        password.value !== "" &&
        passwordCheck.value !== ""
      ) {
        try {
          if (password.value !== passwordCheck.value) {
            toast.error("비밀번호와 비밀번호 확인값이 다릅니다.");
          } else {
            const {
              data: { createUser }
            } = await createUserMutation();
            if (!createUser) {
              toast.error("계정을 만들 수 없습니다.");
            } else {
              toast.success("계정이 생성되었습니다.");
              setTimeout(() => setAction("logIn"), 1000);
            }
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("모든 내용을 채워주세요.");
      }
    }
  };

  return (
    <LoginPresenter
      setAction={setAction}
      action={action}
      name={name}
      email={email}
      password={password}
      passwordCheck={passwordCheck}
      onSubmit={onSubmit}
    />
  );
};
