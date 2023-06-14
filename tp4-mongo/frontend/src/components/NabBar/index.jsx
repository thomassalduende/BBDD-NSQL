import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
export function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href='/' className='fw-bold'>SUPERHEROES</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Nav className="me-auto">
            <Nav.Link href="/marvel" className='ms-5'>MARVEL</Nav.Link>
            <Nav.Link href="/dc">DC</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

