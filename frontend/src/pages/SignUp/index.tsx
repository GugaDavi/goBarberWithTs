import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";

import logo from "~/assets/logo.svg";

import PathRoutes from "~/routes/const_routes";

// import { Container } from './styles';
import Input from "~/components/Input";
import formValidation from "./formValidations";
import { signUpRequest } from "~/store/modules/auth/actions";

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SingUp() {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const handleSubmit: SubmitHandler<FormData> = async data => {
    const error = await formValidation(data);

    if (error) {
      return formRef.current?.setErrors(error);
    }
    const { name, email, password, confirmPassword } = data;

    dispatch(signUpRequest(name, email, password, confirmPassword));
  };

  return (
    <>
      <img src={logo} alt="Logo" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Criar Conta</button>
        <Link to={PathRoutes.singIn}>Já tenho conta</Link>
      </Form>
    </>
  );
}
