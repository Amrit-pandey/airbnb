import { useState } from "react";
import Perks from "../components/perks";
import axios from "axios";
import PhotoUploder from "../components/photoUploder";
import AccountNavPage from "../components/accountNav";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100)
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhoto(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
    });
  }, [id]);

  const inputHeader = (text) => {
    return <h1 className="text-2xl mt-4">{text}</h1>;
  };

  const preInput = (header) => {
    return <>{inputHeader(header)}</>;
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if (id) {
      // update
      axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //  new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <div>
        <AccountNavPage />
        <form onSubmit={savePlace}>
          {preInput("Title")}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Your title"
          />
          {preInput("Address")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="Your address"
          />
          {preInput("Photos")}
          <PhotoUploder addedPhoto={addedPhoto} onChange={setAddedPhoto} />
          {preInput("Description")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput("Perks")}
          <div className="grid gap-2 grid-cols-2 md:grid-col-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput("Extra Info")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput("Check in&out times")}
          <div className="grid gap-2 grid-cols-2 md: grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                type="text"
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type="text"
                placeholder="11"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max guests of numbers</h3>
              <input
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                type="number"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                type="text"
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PlacesFormPage;
