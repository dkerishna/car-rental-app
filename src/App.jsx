import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBooking from "./pages/AddBooking";
import EditBooking from "./pages/EditBooking";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing"
import Home from "./pages/Home";
import Layout from "./components/Layout";
import CarListPage from "./pages/CarListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<CarListPage />} />
          <Route path="/add" element={<AddBooking />} />
          <Route path="/edit/:id" element={<EditBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;