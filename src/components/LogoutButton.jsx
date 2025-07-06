import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate("/login"))
            .catch((error) => console.error("Logout error:", error));
    };

    return (
        <Button variant="outline-danger" onClick={handleLogout}>
            Logout
        </Button>
    );
}