import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./autenticaciones/AuthRoutes/AuthRoutes";
import AppRoutes from "./autenticaciones/AppRoutes/AppRoutes";


function App() {
  return (

      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
 
  );
}

export default App;

