import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BookingCard({ booking, onDelete }) {
    const {
        id,
        name,
        date,
        time,
        phone_number,
        email,
        make,
        model,
        year,
        image_url, // fetched earlier in BookingList
    } = booking;

    return (
        <Card className="mb-4 border-0 shadow-lg" style={{ backgroundColor: "#0d0d0d", color: "#f0f0f0" }}>
            <Row className="g-0">
                <Col md={4}>
                    <Card.Img
                        src={image_url}
                        alt={`${make} ${model}`}
                        className="img-fluid rounded-start"
                        style={{
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px 0 0 8px"
                        }}
                    />
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title className="fw-bold text-uppercase text-warning">
                            {make} {model} ({year})
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-light">
                            {name} – {date} @ {time}
                        </Card.Subtitle>
                        <Card.Text>
                            <strong>📞</strong> {phone_number}<br />
                            <strong>📧</strong> {email}
                        </Card.Text>
                        <div className="mt-3">
                            <Link to={`/edit/${id}`}>
                                <Button variant="outline-warning" className="me-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="outline-danger" onClick={() => onDelete(id)}>
                                Delete
                            </Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}