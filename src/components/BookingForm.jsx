import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { useAuth } from "../contexts/useAuth";

export default function BookingForm({ booking, onSubmit }) {
    const { currentUser } = useAuth();
    const [form, setForm] = useState({
        name: '',
        date: '',
        time: '',
        phone_number: '',
        email: '',
        user_id: currentUser?.uid || '',
        car_id: '',
    });

    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch('https://car-rental-api-eight.vercel.app/cars')
            .then((res) => res.json())
            .then(async (data) => {
                // Map cars and attach image URLs
                const carsWithImages = await Promise.all(
                    data.map(async (car) => {
                        try {
                            const folderRef = ref(storage, car.image); // or car.folder_path
                            const list = await listAll(folderRef);
                            const firstImage = list.items[0];
                            const url = firstImage ? await getDownloadURL(firstImage) : null;
                            return { ...car, image_url: url };
                        } catch (err) {
                            console.error(`Failed to load image for ${car.model}`, err);
                            return { ...car, image_url: null };
                        }
                    })
                );
                setCars(carsWithImages);
            })
            .catch((err) => console.error("Error fetching cars:", err));

        if (booking) {
            setForm(booking);
        }
    }, [booking]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const selectedCar = cars.find((car) => car.id === parseInt(form.car_id));
        if (!selectedCar) return alert("Please select a valid car");

        const payload = {
            ...form,
            user_id: currentUser.uid,
            make: selectedCar.make,
            model: selectedCar.model,
            year: selectedCar.year,
            transmission: selectedCar.transmission,
        };

        onSubmit(payload);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Select
                    name="car_id"
                    value={form.car_id}
                    onChange={handleChange}
                    className="mb-3"
                    required
                >
                    <option value="">Select a car to rent</option>
                    {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                            {car.make} {car.model} ({car.year}) - {car.transmission}
                        </option>
                    ))}
                </Form.Select>
                <Form.Group className="mb-2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        name="time"
                        min="06:00"
                        max="18:00"
                        value={form.time}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Control
                    name="name"
                    placeholder="Full name as stated on ID"
                    value={form.name}
                    onChange={handleChange}
                    className="mb-2"
                />
                <Form.Control
                    type='tel'
                    name="phone_number"
                    pattern="^\+60[1-9][0-9]{7,8}$|^601[0-9]{7,8}$"
                    placeholder="Phone Number (+60123456789)"
                    value={form.phone_number}
                    onChange={handleChange}
                    className="mb-2"
                />
                <Form.Control
                    type='email'
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="mb-2"
                />
                <Button type="submit">Save</Button>
            </Form>

            <hr />
            <h4 className="mt-4">Available Cars</h4>
            {cars.map((car) => (
                <div key={car.id} className="d-flex align-items-start mb-4 p-3 bg-dark text-white rounded shadow-sm border border-secondary">
                    <img
                        src={car.image_url || "https://via.placeholder.com/150"}
                        alt={`${car.make} ${car.model}`}
                        style={{
                            width: "180px",
                            height: "auto",
                            objectFit: "cover",
                            marginRight: "1rem",
                            borderRadius: "8px"
                        }}
                    />
                    <div>
                        <h5>{car.make} {car.model} ({car.year})</h5>
                        <p><strong>Modifications:</strong> {car.modifications}</p>
                        <p><strong>Horsepower:</strong> {car.horsepower} hp</p>
                        <p><strong>Transmission:</strong> {car.transmission}</p>
                        <p><strong>Age Limit:</strong> {car.age_limit} years</p>
                    </div>
                </div>
            ))}
        </>
    );
}