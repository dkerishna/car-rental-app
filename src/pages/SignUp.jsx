import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import supranight from "../images/SUPRAnight.jpg";

export default function Signup() {
    const [form, setForm] = useState({ email: "", password: "", confirm: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Please enter email and password.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            navigate("/home");
        } catch (err) {
            console.error("Signup error:", err.message);
            setError("Failed to sign up. " + err.message);
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${supranight})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="p-4 rounded bg-dark bg-opacity-75 text-white" style={{ width: "100%", maxWidth: "400px" }}>
                <h3 className="text-center mb-4">Sign Up</h3>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-2"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-2"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirm Password"
                        className="form-control mb-3"
                        value={form.confirm}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn btn-outline-primary w-100">
                        Sign Up
                    </button>
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