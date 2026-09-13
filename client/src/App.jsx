import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {GuestLayout, AuthLayout} from "./pages/Layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import BuilderPage from "./pages/BuilderPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* Login Routes */}

      <Route element={<GuestLayout />}>
        <Route path='/login' element={<AuthPage mode="login"/>} />
        <Route path='/register' element={<AuthPage mode="register"/>} />
      </Route>

      {/* protected Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/builder/:id' element={<BuilderPage />} />
        <Route path='/preview/:id' element={<PreviewPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
