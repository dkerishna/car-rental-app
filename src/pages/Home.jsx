import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BookingCard from '../components/BookingCard';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { useAuth } from '../contexts/useAuth';

export default function Home() {
    const { currentUser } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

        const isAdmin = currentUser.email === "admin@carrental.com";

        const endpoint = isAdmin
            ? "https://car-rental-api-eight.vercel.app/bookings"
            : `https://car-rental-api-eight.vercel.app/bookings?user_id=${currentUser.uid}`;

        fetch(endpoint)
            .then((res) => res.json())
            .then(async (data) => {
                console.log("Fetched bookings data:", data);
                const bookingsWithImages = await Promise.all(
                    data.map(async (booking) => {
                        try {
                            const folderRef = ref(storage, booking.image);
                            const list = await listAll(folderRef);
                            const firstImage = list.items[0];
                            const url = firstImage ? await getDownloadURL(firstImage) : null;
                            console.log(`Loaded image URL for ${booking.id}:`, url);
                            return { ...booking, image_url: url };
                        } catch (err) {
                            console.error(`Image fetch failed for booking ${booking.id}`, err);
                            return {
                                ...booking,
                                image_url: null
                            };
                        }
                    })
                );
                setBookings(bookingsWithImages);
            })
            .catch((err) => {
                console.error("Error loading bookings:", err);
            });
    }, [currentUser]);

    // Delete booking from API and local state
    function deleteBooking(id) {
        axios
            .delete(`https://car-rental-api-eight.vercel.app/bookings/${id}`)
            .then(() => setBookings((prev) => prev.filter((b) => b.id !== id)))
            .catch((err) => console.error("Error deleting booking:", err));
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4 text-warning text-center fw-bold">🔥 CarMod Collective Car Rentals</h2>

            {bookings.length > 0 && (
                <h3 className="text-muted mb-3">Your bookings:</h3>
            )}

            {bookings.length === 0 ? (
                <p className="text-center text-dark">No bookings yet. Please choose a car and create one!</p>
            ) : (
                bookings.map((b) => (
                    <BookingCard key={b.id} booking={b} onDelete={deleteBooking} />
                ))
            )}
        </Container>
    );
}