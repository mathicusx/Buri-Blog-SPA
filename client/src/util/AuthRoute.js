import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

// Here we Authenticate Routes Example: Logged in user cannot acces the Register Page or the Login Page.
function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} /> // we check if user is already logged in, if not we are going to use our Component.
      }
    />
  );
}

export default AuthRoute;
