import * as Yup from "yup";

import { FormData } from "./index";

interface ErrosObject {
  [key: string]: string;
}

const schema: Yup.Schema<FormData> = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatorio"),
  email: Yup.string()
    .email("Insira um e-mail valido")
    .required("O e-mail é obrigatorio"),
  password: Yup.string()
    .min(6, "Mínimo de 6 digitos")
    .required("O password é obrigatorio"),
  confirmPassword: Yup.string().when(
    "password",
    (password: string, field: Yup.StringSchema) =>
      password &&
      field
        .required("O campo confirmar senha é obrigatorio")
        .oneOf([Yup.ref("password")], "As senhas não conferem")
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
