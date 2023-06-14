import Card from 'react-bootstrap/Card';

export function Superheroe({ superheroe }) {
  console.log(superheroe)
  return (
    <Card style={{ width: '18rem' }}>
      <a href={`/${superheroe._id}`}>
        <Card.Img variant="top" src={superheroe.images[0][1]} />
        <Card.Body>
          <Card.Title>{superheroe.nombre}</Card.Title>
          <Card.Title>{superheroe.nombre_pers}</Card.Title>
          <Card.Text>
            {superheroe.biografia}
          </Card.Text>
        </Card.Body>
        </a>
    </Card>
  );
}

