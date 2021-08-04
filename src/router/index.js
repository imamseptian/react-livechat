import React from "react";
import { Route, Switch } from "react-router-dom";
import * as Middleware from "../middleware";
import { ChatRoom, Homepage, FindUsers } from "../views";
import { Login, Register } from "../views/auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Middleware.Authenticated>
          <Homepage />
        </Middleware.Authenticated>
      </Route>
      <Route exact path="/find">
        <Middleware.Authenticated>
          <FindUsers />
        </Middleware.Authenticated>
      </Route>
      <Route exact path="/chat/:identifier">
        <Middleware.Authenticated>
          <ChatRoom />
        </Middleware.Authenticated>
      </Route>

      <Route exact path="/login">
        <Middleware.Guest>
          <Login />
        </Middleware.Guest>
      </Route>
      <Route exact path="/register">
        <Middleware.Guest>
          <Register />
        </Middleware.Guest>
      </Route>
    </Switch>
  );
};

export default Router;
