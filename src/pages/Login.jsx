import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import rx7night from "../images/rx7night.jpg"

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            navigate("/home"); //Go to homepage
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${rx7night})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-4 rounded bg-dark bg-opacity-75 text-white" style={{ width: "100%", maxWidth: "400px" }}>
                <h3 className="text-center mb-4">Login</h3>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-2"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button className="btn btn-outline-success w-100" type="submit">Log In</button>
                    <button
                        className="btn btn-outline-danger w-100 mt-2"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        Go Back
                    </button>
                </form>
            </div>
        </div>
    );
}