import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postSuperheroes } from '../../services/postSuperheroes';
import { uploadFile } from '../../../firebase'
import Swal from 'sweetalert2';

export function FormSuperheroes() {
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    const imagesInput = form.current.elements['images'];
    const images = Array.from(imagesInput.files);

    const imagesURL = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      console.log(file)
      const imageUrl = await uploadFile(file);
      imagesURL.push(imageUrl[1]);
      
    }
  
    formData.delete('images');
    formData.append('images', imagesURL);

    const capitalizedFormData = Object.fromEntries(
      Array.from(formData.entries()).map(([name, value]) => [name, value])
    );

    console.log(capitalizedFormData);

    postSuperheroes(capitalizedFormData)
      .then(() => {
        window.location.reload(true)
        Swal.fire({
          icon: 'success',
          title: 'Personaje creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.error('Error al guardar los superhéroes:', error);
      });
  }
  
  return (
    <Form className='superheroe-data' ref={form} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name='nombre' type="text" />
        <Form.Label>Nombre Personaje</Form.Label>
        <Form.Control name='nombre_pers' type="text" />
        <Form.Label>Imagenes</Form.Label>
        <Form.Control required name='images' type="file" multiple />
        <Form.Label>Año Aparición</Form.Label>
        <Form.Control name='año_aparicion' type="text" />
        <Form.Label>Casa</Form.Label>
        <Form.Control name='casa' type="text" />
        <Form.Label>Biografía</Form.Label>
        <Form.Control name='biografia' type="text" />
        <Form.Label>Equipamiento</Form.Label>
        <Form.Control name='equipamiento' type="text" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}
