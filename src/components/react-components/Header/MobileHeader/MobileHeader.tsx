import Logo from "../Logo/Logo";
import {
  Nav,
  Navbar,
  Offcanvas,
  Container
} from "react-bootstrap";
import './MobileHeader.scss';
import HeaderButtons from "../HeaderButtons/HeaderButtons";
import Search from "../Search/Search";

type Props = {
  onLogout: () => void;
  isAuth: boolean;
  onShowModal: () => void;
}

const MobileHeader = ({
  onLogout,
  isAuth,
  onShowModal,
}: Props) => {
  return (
    <div className="mobile-header">
      <Logo />
      <Navbar
        collapseOnSelect 
        expand="lg" 
        className="Navy"
        bg={"dark"}
        variant={"dark"}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Меню
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <HeaderButtons 
                    onLogout={onLogout} 
                    isAuth={isAuth} 
                    onShowModal={onShowModal}
                  />
                  <Search />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
};

export default MobileHeader;