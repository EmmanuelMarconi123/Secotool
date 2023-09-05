import Header from "../../components/header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../components/routes/home/Home";
import Details from "../../components/routes/details/Details";
import Footer from "../../components/footer/Footer";
import Filters from "../../components/routes/filters/Filters";
import Profile from "../../components/routes/profile/Profile";
import { useAuth } from "../../contexts/AuthContext";
import Favorites from "../../components/routes/favorites/Favorites"

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <body>
      <Header />
      <main className="spacing-grid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/allFilters" element={<Filters />} />
          <Route path="/allProducts/:idCateg" element={<Filters />} />
          <Route path="/favorites" element={<Favorites />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer className="footer" />
    </body>
  );
};

export default AppRoutes;
