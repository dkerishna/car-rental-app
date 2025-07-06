import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import R34night from "../images/R34night.jpg";

export default function Landing() {
    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: `url(${R34night})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                className="d-flex align-items-center justify-content-center text-white"
            >
                <Container className="text-center">
                    <h1 className="display-4 fw-bold mb-3">Enthusiast Car Rentals</h1>
                    <p className="lead mb-4">
                        Your garage away from home. Rent performance cars tuned for the road and track.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/login">
                            <Button variant="outline-success" size="lg">Log In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline-primary" size="lg">Sign Up</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
}