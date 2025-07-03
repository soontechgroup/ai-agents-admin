'use client'

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Container, Navbar, Button, Card } from "react-bootstrap";

export default function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="h4 mb-3">
              Welcome back, {user?.name}!
            </Card.Title>
            <Card.Text className="text-muted">
              You are logged in with {user?.email}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}