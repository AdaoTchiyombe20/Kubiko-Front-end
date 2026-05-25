import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouriteIcon } from 'hugeicons-react';
import house from '../../assets/imgs/house.png'
import cardImg from '../../assets/imgs/cardImg.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './cards.module.css'

export default function Cards({
  index,
  data
}) {
  const navigate = useNavigate()
  const [realStateInformation, setRealStateInformation] = useState([])
  function capitalize(texto){
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
  
  return (
    <Card className='p-0'>
      <Card.Header className={`${styles.cardHeader} p-0 position-relative`}>
       
        <Card.Img variant="top" src={cardImg} style={{height: '200px'}} />
      </Card.Header>
      <Card.Body>
          <div className={`${styles.sellOrRent} d-flex align-items-center gap-1 mb-3`}>
            <p className='m-0 rounded-5'>{data.type_property_purchase === 'FOR_RENT' ? 'Aluguel' : 'Venda'}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="#F0F0F2" className="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            <p className='m-0 text-default-color'>{capitalize(data.type_of_property)}</p>
          </div>
        <Card.Title className='fw-semibold'>{Number(data.price).toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'})} {data.type_property_purchase === 'FOR_RENT' ? '/ mês' : ''}</Card.Title>
        <Card.Text className={`${styles.cardText} m-0`}>
          <span className='fw-normal text-secondary'>Titulo:</span> {data?.title}
        </Card.Text>
        <Card.Text className={`${styles.cardText} m-0`}>
          <span className='fw-normal text-secondary'>Localização:</span> Luanda, {data.property_localization.municipality}, {data.property_localization.neighborhood}
        </Card.Text>
      </Card.Body>
      <Card.Footer className={`${styles.cardFooter} border border-0 bg-light-subtle`}>
        <Button className='w-100 bg-light border-1 border-primary text-default-color py-2' onClick={()=>{
          navigate(`/details/${data.id}`)
        }}>Ver detalhes</Button>
      </Card.Footer>
    </Card>
  );
}