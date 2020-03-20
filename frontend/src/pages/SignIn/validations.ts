import * as Yup from "yup";

import { FormData } from "./index";

interface ErrosObject {
  [key: string]: string;
}

const schema: Yup.Schema<FormData> = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail valido")
    .required("O e-mail é obrigatorio"),
  password: Yup.string()
    .min(6, "Mínimo de 6 digitos")
    .required("O password é obrigatorio")
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
