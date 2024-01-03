import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./views/home/home-view";
import Detail from "./views/detail/detail-view";
import { history } from "./helpers/history";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Routes history={history}>
        <Route exact path="/detail" element={<Detail />} />
        <Route exact path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
