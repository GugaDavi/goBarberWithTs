import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Notifications from "../Notifications/index";
import Routes from "~/routes/const_routes";
import logo from "~/assets/small-logo.svg";

import { Container, Content, Profile } from "./styles";
import { ApplicationState } from "~/store";
import { IUser } from "~/store/modules/user/types";

export default function Header() {
  const profile = useSelector<ApplicationState, IUser | undefined>(
    state => state.profile.user
  );

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
              <strong>{profile?.name}</strong>
              <Link to={Routes.profile}>Meu Perfil</Link>
            </div>

            <img
              src={
                profile?.avatar?.url ||
                `https://api.adorable.io/avatars/50/${profile?.email}.png`
              }
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
