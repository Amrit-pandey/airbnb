import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddressLink from "../components/addressLink"
import PlaceGallery from "../components/placeGallery"
import BookingsDate from "../components/bookingsDate"

const BookingPage = () => {
    const {id} = useParams()
    const [booking,setBooking] = useState(null)
    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response => {
             const foundBooking = response.data.find(({_id}) => _id === id)
             if(foundBooking) {
                setBooking(foundBooking)
             }
            })
        }
    },[id])

    if(!booking) {
        return ''
    }
    return(
        <div className="my-8">
            <h2 className="text-3xl">{booking.place.title}</h2>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between">
                <div>
                <h2 className="text-2xl mb-2">your booking information</h2>
                <BookingsDate booking={booking}/>
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
    )
}

export default BookingPage