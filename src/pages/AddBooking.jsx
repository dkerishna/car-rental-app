import BookingForm from "../components/BookingForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export default function AddBooking() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    function handleSubmit(formData) {
        const bookingWithUser = {
            ...formData,
            user_id: currentUser?.uid,
        };

        console.log("Submitting booking:", bookingWithUser);

        axios
            .post("https://car-rental-api-eight.vercel.app/bookings", bookingWithUser)
            .then(() => navigate("/home"))
            .catch((err) => console.error("Error creating booking:", err));
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/home">
                    <Button variant="secondary">← Back to Home</Button>
                </Link>
            </div>

            <h3>Add Booking</h3>
            <BookingForm onSubmit={handleSubmit} />
        </Container>
    );
}