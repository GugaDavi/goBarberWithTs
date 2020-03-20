import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormHandles, SubmitHandler } from "@unform/core";

import { Form } from "@unform/web";
import Input from "~/components/Input";
import loginValidation from "./validations";
import { signInRequest } from "~/store/modules/auth/actions";

import logo from "~/assets/logo.svg";

import PathRoutes from "~/routes/const_routes";
import { ApplicationState } from "~/store";

// import { Container } from './styles';

export interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const loading = useSelector<ApplicationState, boolean>(
    state => state.auth.loading
  );

  const handleSubmit: SubmitHandler<FormData> = async (data): Promise<void> => {
    const erros = await loginValidation(data);
    if (erros) {
      return formRef.current?.setErrors(erros);
    }
    dispatch(signInRequest(data.email, data.password));
  };

  return (
    <>
      <img src={logo} alt="Logo" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
        <Link to={PathRoutes.singUp}>Criar conta gratuita</Link>
      </Form>
    </>
  );
}
