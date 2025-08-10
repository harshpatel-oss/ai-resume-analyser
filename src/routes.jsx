import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home is your App.jsx
import Home from "./App.jsx";

// Other route components
import Auth from "../routes/auth.jsx";
// import Upload from "./routes/upload.jsx";
// import Resume from "./routes/resume.jsx";
// import Wipe from "./routes/wipe.jsx";

export default function AppRouter() {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />            {/* Home page */}
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/upload" element={<Upload />} />
        <Route path="/resume/:id" element={<Resume />} />
        <Route path="/wipe" element={<Wipe />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
