import React from "react";
import { Link } from "react-router-dom";

import Notifications from "../Notifications/index";
import Routes from "~/routes/const_routes";
import logo from "~/assets/small-logo.svg";

import { Container, Content, Profile } from "./styles";

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to={Routes.dashboard}>DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>Gustavo Davi</strong>
              <Link to={Routes.profile}>Meu Perfil</Link>
            </div>

            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
