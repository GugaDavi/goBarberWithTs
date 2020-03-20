import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Content } from "./styles";

const Auth: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

Auth.propTypes = {
  children: PropTypes.element.isRequired
};

export default Auth;
