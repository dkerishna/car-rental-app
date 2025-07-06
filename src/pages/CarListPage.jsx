import { useState, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../firebase";
import { Link } from "react-router-dom";

export default function CarListPage() {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [modalImages, setModalImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("https://be747605-0b85-4019-9dd2-b9cf3cd337c2-00-39np0mdq01620.pike.replit.dev/cars")
            .then((res) => res.json())
            .then(async (data) => {
                const carsWithImages = await Promise.all(
                    data.map(async (car) => {
                        try {
                            const folderRef = ref(storage, car.image);
                            const list = await listAll(folderRef);
                            const firstImage = list.items[0];
                            const url = firstImage ? await getDownloadURL(firstImage) : null;
                            return { ...car, image_url: url, image_items: list.items };
                        } catch (err) {
                            console.error(`Failed to load image for ${car.model}`, err);
                            return { ...car, image_url: null, image_items: [] };
                        }
                    })
                );
                setCars(carsWithImages);
            })
            .catch((err) => console.error("Error fetching cars:", err));
    }, []);

    const handleSeeMore = async (car) => {
        try {
            const images = await Promise.all(
                car.image_items.map((item) => getDownloadURL(item))
            );
            setModalImages(images);
        } catch (err) {
            console.error("Failed to load gallery images:", err);
            setModalImages([]);
        }

        setSelectedCar(car);
        setShowModal(true);
    };

    return (
        <Container className="py-4 text-white">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/home">
                    <Button variant="secondary">← Back to Home</Button>
                </Link>
            </div>
            <h2 className="text-center text-primary mb-4">Available Cars</h2>
            {cars.map((car) => (
                <div key={car.id} className="d-flex align-items-start mb-4 p-3 bg-dark rounded shadow-sm border border-secondary">
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
                        <Button variant="outline-success" size="sm" onClick={() => handleSeeMore(car)}>See More</Button>
                    </div>
                </div>
            ))}

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCar?.make} {selectedCar?.model} Gallery</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalImages.length > 0 ? (
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {modalImages.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`car-${idx}`}
                                    style={{
                                        maxWidth: "220px",
                                        maxHeight: "180px",
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                        borderRadius: "8px"
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No images available.</p>
                    )}
                    <hr />
                    <div>
                        <p><strong>Modifications:</strong> {selectedCar?.modifications}</p>
                        <p><strong>Horsepower:</strong> {selectedCar?.horsepower} hp</p>
                        <p><strong>Transmission:</strong> {selectedCar?.transmission}</p>
                        <p><strong>Age Limit:</strong> {selectedCar?.age_limit} years</p>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}