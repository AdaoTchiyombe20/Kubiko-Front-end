import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouriteIcon } from 'hugeicons-react';
import house from '../../assets/imgs/house.png'
import cardImg from '../../assets/imgs/cardImg.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './cards.module.css'

export default function Cards({
  index
}) {
  const navigate = useNavigate()
  const [realStateInformation, setRealStateInformation] = useState([])
  
  useEffect(()=>{
        async function realStateDetailShowInformation(){
            const endpoint = `http://localhost:3001/properties/${index}`

            try{
                const data = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'content-type' : 'application/json'
                    }
                })

                const resposta = await data.json()
                setRealStateInformation(resposta)
                console.log(resposta)
            }
            catch(error){
                console.log("Error: ", error)
            }
        }
        realStateDetailShowInformation()
    }, [])
  return (
    <Card className='p-0'>
      <Card.Header className={`${styles.cardHeader} p-0 position-relative`}>
        <div className='border border-2 p-1 top d-flex align-items-center justify-content-center rounded-circle' style={{width: '50px', height: '50px'}}>
          <FavouriteIcon size={25} color='#FFFF' />
        </div>
        <Card.Img variant="top" src={cardImg} style={{height: '166px'}} />
      </Card.Header>
      <Card.Body>
          <div className={`${styles.sellOrRent} d-flex align-items-center gap-1 mb-3`}>
            <p className='m-0 rounded-5'>Aluguel</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="#F0F0F2" className="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            <p className='m-0 text-default-color'>Casas</p>
          </div>
        <Card.Title className='fw-semibold'>{realStateInformation.price?.toLocaleString("pt-AO", {style: 'currency', currency: 'AOA'})} / mês</Card.Title>
        <Card.Text className={`${styles.cardText} m-0`}>
          <span className='fw-normal text-secondary'>Tipo:</span> {realStateInformation.title}
        </Card.Text>
        <Card.Text className={`${styles.cardText} m-0`}>
          <span className='fw-normal text-secondary'>Localização:</span> {realStateInformation?.location?.address}, {realStateInformation?.location?.municipality}
        </Card.Text>
      </Card.Body>
      <Card.Footer className={`${styles.cardFooter} border border-0 bg-light-subtle`}>
        <Button className='w-100 bg-light border-1 border-primary text-default-color py-2' onClick={()=>{
          navigate(`/details/${index ? index.toString() : 1}`)
        }}>Ver detalhes</Button>
      </Card.Footer>
    </Card>
  );
}