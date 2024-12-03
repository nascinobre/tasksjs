import { Link } from "react-router-dom";
import { logout } from "../../firebase/authentication";
import { useAuth } from "../../context/Auth";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function Header(props) {
  const { autenticado } = useAuth();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="w-100">
          <Navbar.Brand>Tasks to-do</Navbar.Brand>
          <Nav
            className="me-auto"
            style={{
              width: "50%",
              marginLeft: "auto",
              display: "flex",
              justifyContent: "space-between",
              justifySelf: "flex-end",
            }}
          >
            <Link to="/" className="nav-link">
              Tasks
            </Link>

            {!autenticado ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => props.openForm()}
                >
                  Adicionar tarefa
                </Button>
                <Button variant="outline-light" onClick={() => logout()}>
                  Sair
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
