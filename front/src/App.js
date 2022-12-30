import './App.css';

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import NavbarComponnent from "./components/NavbarComponnent";
//import Footer from "./components/Footer"

//pages 
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import Origin from "./pages/Origins/Origin";
import Destiny from "./pages/Destiny/Destiny";
import Login from "./pages/Auth/Login";
import User from "./pages/Auth/User";

// hooks
import { useSelector } from "react-redux";

function App() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponnent />
        <div className="container">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" /> }/>
            <Route path="/accounts" element={user ? <Account /> : <Navigate to="/login" /> } />
            <Route path="/paymentMethods" element={user ? <PaymentMethod /> : <Navigate to="/login" /> }/>
            <Route path="/origins" element={user ? <Origin /> : <Navigate to="/login" /> }/>
            <Route path="/destinys" element={user ? <Destiny /> : <Navigate to="/login" /> }/>
            <Route path="/users" element={user ? user.group==="admin" ? <User /> : <Navigate to="/"/> : <Navigate to="/login"/>} />
            
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            {/* rotas não existentes */}
            <Route path="*" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
