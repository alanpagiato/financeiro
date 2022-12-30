// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const NavbarComponnent = () => {
  const { user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <div >
    <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand href="/">Financeiro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
              <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                <NavDropdown.Item href="/accounts">Contas</NavDropdown.Item>
                <NavDropdown.Item href="/paymentMethods">Formas de Pagto</NavDropdown.Item>
                <NavDropdown.Item href="/origins">Origens</NavDropdown.Item>
                <NavDropdown.Item href="/charts">Plano de Contas</NavDropdown.Item>
                <NavDropdown.Item href="/destinys">Destinos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/movements">
                  Movimentações
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Relatórios" id="basic-nav-dropdown">
              <Nav.Link href="/rel01">Geral</Nav.Link>
              </NavDropdown>
              {user.group === "admin" &&
                <Nav.Link href="/users">Usuarios</Nav.Link>
              }
              <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
};

export default NavbarComponnent;