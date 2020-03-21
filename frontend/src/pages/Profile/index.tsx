import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";

import { Container } from "./styles";
import Input from "~/components/Input";
import InputFile from "~/components/InputFile";

import { ApplicationState } from "~/store";
import { IUser } from "~/store/modules/user/types";
import profileUpdateValidator from "./validations";
import { updateProfileRequest } from "~/store/modules/user/actions";
import { signOut } from "~/store/modules/auth/actions";

export interface FormData {
  name?: string;
  email?: string;
  avatar_id?: number;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Profile() {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const user: IUser | undefined = useSelector<
    ApplicationState,
    IUser | undefined
  >(state => state.profile.user);

  const handleUserUpdate: SubmitHandler<FormData> = async data => {
    const error = await profileUpdateValidator(data);
    if (error) {
      return formRef.current?.setErrors(error);
    }

    const {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
      avatar_id
    } = data;

    dispatch(
      updateProfileRequest({
        name,
        email,
        avatar_id,
        oldPassword,
        password,
        confirmPassword
      })
    );
  };

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={handleUserUpdate}
        initialData={{
          name: user?.name,
          email: user?.email,
          avatar_id: user?.avatar
        }}
      >
        <InputFile name="avatar_id" />

        <Input name="name" type="text" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar Perfil</button>
      </Form>

      <button type="button" onClick={handleSingOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
