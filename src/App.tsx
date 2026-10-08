import { Navigate, Route, Routes } from "react-router-dom";
import { ServiceDetailsPage } from "./pages/ServiceDetailsPage";
import { ServicesPage } from "./pages/ServicesPage";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/:id/details" element={<ServiceDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
