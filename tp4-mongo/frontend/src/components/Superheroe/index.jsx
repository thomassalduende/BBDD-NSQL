import Card from 'react-bootstrap/Card';

export function Superheroe({ superheroe }) {
  console.log(superheroe.images)
  return (
    <Card style={{ width: '18rem' }}>
      <a className='text-decoration-none' href={`/${superheroe._id}`}>
        <Card.Img variant="top" src={superheroe.images} />
        <Card.Body>
          <Card.Title className='text-black fs-6 fw-bold'>{superheroe.nombre}</Card.Title>
          <Card.Title className='text-black fs-6'>{superheroe.nombre_pers}</Card.Title>
          <Card.Text className='text-black'>
            {superheroe.biografia.slice(0, 100)}
          </Card.Text>
        </Card.Body>
        </a>
    </Card>
  );
}

