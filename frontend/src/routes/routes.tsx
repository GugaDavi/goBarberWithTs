import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";

import ConstPathRoutes from "./const_routes";

import AuthLayout from "../pages/_layouts/auth";
import DefaultLayout from "../pages/_layouts/default";
import { ApplicationState } from "~/store";

interface IRoutesProps {
  component: React.FC<IComponet>;
  isPrivate?: boolean;
  path: string;
  exact?: boolean;
}

interface IComponet {
  props: RouteComponentProps;
}

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  exact = false
}: IRoutesProps) {
  const signed = useSelector<ApplicationState, boolean>(
    state => state.auth.signed
  );

  if (!signed && isPrivate) {
    return <Redirect to={ConstPathRoutes.singIn} />;
  }

  if (signed && !isPrivate) {
    return <Redirect to={ConstPathRoutes.dashboard} />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  console.tron.log(Layout.name);

  return (
    <Route
      exact
      render={props => (
        <Layout>
          <Component props={props} />
        </Layout>
      )}
    />
  );
}
