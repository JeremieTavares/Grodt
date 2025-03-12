import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Profile from "./views/Profile.tsx";
import Landing from "./views/Landing.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          {/*<Route path="concerts" element={<Concerts />} /> */}
        </Route>
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
