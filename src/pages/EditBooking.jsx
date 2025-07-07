import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookingForm";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export default function EditBooking() {
    const { id } = useParams(); // get booking id from URL
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    // Fetch the existing booking on run
    useEffect(() => {
        axios
            .get(`https://car-rental-api-eight.vercel.app/bookings/${id}`)
            .then((res) => setBooking(res.data))
            .catch((err) => console.error("Error loading booking:", err));
    }, [id]);

    function handleUpdate(updatedBooking) {
        axios
            .put(`https://car-rental-api-eight.vercel.app/bookings/${id}`, updatedBooking)
            .then(() => navigate("/home"))
            .catch((err) => console.error("Update error:", err));
    }

    return (
        <Container>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/home">
                    <Button variant="secondary">← Back to Home</Button>
                </Link>
            </div>
            <h3>Edit Booking</h3>
            {booking ? (
                <BookingForm booking={booking} onSubmit={handleUpdate} />
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
}