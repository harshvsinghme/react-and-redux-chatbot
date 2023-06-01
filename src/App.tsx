// import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Enroll from "./pages/enroll/Enroll";
import Success from "./pages/success/Success";

function App() {
  // const dispatch = useDispatch();
  // const { isAuthenticated, userInfo } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  // alert("y");
  // if (token) dispatch(validateAuthSession());
  // else dispatch(noToken());
  // }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="enroll">
            <Route index element={<Enroll />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
