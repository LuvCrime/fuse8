import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Homepage } from "../Homepage/Homepage";
import { ProductPage } from "../ProductPage/ProductPage"

const App = () => {
  return (
    <Router  basename="/fuse8">
      <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/details/id" exact component={ProductPage} />
      </Switch>
    </Router>
  );
};

export default App;
