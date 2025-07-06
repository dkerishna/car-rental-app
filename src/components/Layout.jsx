import AppNavbar from "./AppNavbar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <AppNavbar />
            <Container className="pt-4">
                <Outlet />
            </Container>
        </>
    );
}