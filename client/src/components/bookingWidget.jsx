import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect,setRedirect] = useState('')
  const {user} = useContext(UserContext)

  useEffect(() => {
       if(user) {
        setName(user.username)
       }
  },[user])

  let NumberOfNights = 0;
  if (checkIn && checkOut) {
    NumberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
    console.log(NumberOfNights);
  }

  const bookNow = async (event) => {
    event.preventDefault();
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: NumberOfNights * place.price
    })
    const bookingId = response.data._id
    console.log({bookingId});
    setRedirect(`/account/bookings/${bookingId}`)
  };

  if(redirect) {
    return <Navigate to={redirect}/>
  }


  return (
    <div className="bg-white p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price}/ per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className=" py-3 px-4 ">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className=" py-4 px-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className=" py-4 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {NumberOfNights > 0 && (
          <div className=" py-4 px-4 border-t">
            <label>Your full name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookNow} className="primary mt-4">
        Book this place $
        {NumberOfNights > 0 && (
          <>
            <span>{NumberOfNights * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
