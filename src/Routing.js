import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import App from "./App.js";
import Svg from "./Svg";
import Canvas from "./Canvas";
import Upload from "./Upload";

export default function Routing() {
  return (
    <Router>
      <div>
        <AuthButton />
        <hr />
        <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home" />

        <OldSchoolMenuLink
          activeOnlyWhenExact={true}
          to="/protected"
          label="Login Page"
        />

        <hr />

        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/protected">
            <PrivateRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </div>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 300); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 300);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <>
      <h1>Welcome!!!</h1>
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </>
  ) : (
    <p>You are not logged in.</p>
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/protected" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  let { path, url } = useRouteMatch();
  return fakeAuth.isAuthenticated ? (
    <>
      <h2>Please select a topic.</h2>
      <ul>
        <li>
          <Link to={`${url}/upload`}>Upload file</Link>
        </li>
        <li>
          <Link to={`${url}/drawing`}>Drawing tools</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={`${path}/upload`}>
          <Upload />
        </Route>
        <Route path={`${path}/drawing`}>
          <Drawing />
        </Route>
      </Switch>
    </>
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );
}

function Drawing() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h3>Topics</h3>
      <ul>
        <li>
          <Link to={`${url}/svg`}>Rendering SVG</Link>
        </li>
        <li>
          <Link to={`${url}/canvas`}>Rendering Canvas</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={`${path}/svg`}>
          <Svg />
        </Route>
        <Route path={`${path}/canvas`}>
          <Canvas />
        </Route>
      </Switch>
    </div>
  );
}
