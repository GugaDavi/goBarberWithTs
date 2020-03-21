import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState
} from "react";
import { useField } from "@unform/core";

import api from "~/services/api";

import { Container } from "./styles";

interface Props {
  name: string;
}

interface IFile {
  createdFile: {
    id: number;
    url: string;
  };
}

type InputProps = JSX.IntrinsicElements["input"] & Props;

// eslint-disable-next-line react/prop-types
const InputFile: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const handlePreview = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();
      const file = e.target.files?.[0];
      if (!file) {
        setPreview(null);
      } else {
        data.append("file", file);

        const resp = await api.post<IFile>("/files", data);
        const { createdFile } = resp.data;

        setPreview(createdFile.url);
        setFile(createdFile.id);
      }
    },
    []
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "dataset.file",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={name}>
        <img
          src={
            preview || "https://api.adorable.io/avatars/50/abott@adorable.png"
          }
          alt="Preview"
          width="100"
        />
        <input
          name={name}
          type="file"
          id={name}
          data-file={file}
          ref={inputRef}
          onChange={handlePreview}
          {...rest}
        />
      </label>
    </Container>
  );
};

export default InputFile;
