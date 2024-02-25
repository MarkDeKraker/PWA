import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Update: Import BrowserRouter, Routes, and Route
import TagsPage from "./Pages/TagsPage.tsx";
import Navbar from "./components/NavBar.tsx";
import OfflinePage from "./Pages/OfflinePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/offline" element={<OfflinePage />} />
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);
