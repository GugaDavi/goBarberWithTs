import * as Yup from "yup";

import { FormData } from "./index";

interface ErrosObject {
  [key: string]: string;
}

const schema: Yup.Schema<FormData> = Yup.object().shape({
  name: Yup.string().min(1, "Esse campo não pode estar vazio"),
  email: Yup.string()
    .email("Insira um e-mail valido")
    .min(1, "Esse campo não pode estar vazio"),
  password: Yup.string().min(6, "Mínimo de 6 digitos"),
  oldPassword: Yup.string().when(
    "password",
    (password: string, field: Yup.StringSchema) =>
      password &&
      field.required("Para atualização de senha, necessario a senha atual")
  ),
  confirmPassword: Yup.string().when(
    "password",
    (password: string, field: Yup.StringSchema) =>
      password &&
      field
        .required("Reconfirme sua senha")
        .oneOf([Yup.ref("password")], "Senhas não conferem")
  )
});

async function validate(data: FormData): Promise<ErrosObject | undefined> {
  try {
    await schema.validate(data, {
      abortEarly: false
    });
  } catch (e) {
    const validationErrors: ErrosObject = {};

    if (e instanceof Yup.ValidationError) {
      for (const error of e.inner) {
        validationErrors[error.path] = error.message;
      }

      return validationErrors;
    }
  }
}

export default validate;
