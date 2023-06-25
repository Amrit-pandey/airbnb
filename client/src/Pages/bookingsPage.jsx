import { useState } from "react";
import AccountNavPage from "../components/accountNav";
import { useEffect } from "react";
import axios from "axios";
import PlaceImage from "../components/placeImg";
import { format } from "date-fns/esm";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import BookingsDate from "../components/bookingsDate";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNavPage />
      <div>
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} className="flex bg-gray-200 gap-4 rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImage place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                
                <div className="text-xl font-semibold">
                 <BookingsDate booking={booking} className="mb-2 mt-4 text-gray-500"/>
                  <div className="flex gap-1 font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
