import { Routes, Route } from "react-router-dom";
import { IndexPage } from "./Pages/indexPage";
import { Login } from "./Pages/login";
import { Layout } from "./components/layout";
import { Register } from "./Pages/register";
import axios from "axios";
import { UserContextProvider } from "./context/userContext";
import ProfilePage from "./Pages/ProfilePage";
import PlacePage from "./Pages/placePage";
import PlacesFormPage from "./Pages/placesFormPage";
import SinglePlacePage from "./Pages/singlePlacePage";
import BookingsPage from "./Pages/bookingsPage";
import BookingPage from "./Pages/bookingPage";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage/>}/>
          <Route path="/account/places" element={<PlacePage/>}/>
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<SinglePlacePage/>} />
          <Route path="/account/bookings" element={<BookingsPage/>} />
          <Route path="/account/bookings/:id" element={<BookingPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
