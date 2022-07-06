import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/accountAction";
import "./Header.scss";
const Header = () => {
    const user = useSelector(state => state.account.userInfo);
    const disPatch = useDispatch();
    const handleLogin = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`;
    };
    const handleLogout = () => {
        disPatch(doLogout());
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </Nav>
                        {user && user.access_token && (
                            <Nav>
                                <Nav.Link href="#">
                                    Welcome!{user.email}
                                </Nav.Link>
                            </Nav>
                        )}

                        <Nav>
                            <NavDropdown
                                title="Settings"
                                id="basic-nav-dropdown"
                            >
                                {user && user.access_token ? (
                                    <NavDropdown.Item
                                        onClick={() => handleLogout()}
                                    >
                                        logout
                                    </NavDropdown.Item>
                                ) : (
                                    <NavDropdown.Item
                                        onClick={() => handleLogin()}
                                    >
                                        Login
                                    </NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
