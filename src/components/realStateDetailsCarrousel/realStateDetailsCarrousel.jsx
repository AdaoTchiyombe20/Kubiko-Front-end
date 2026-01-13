import Carousel from 'react-bootstrap/Carousel';
import house02 from '../../assets/imgs/house2.jpg'
import house03 from '../../assets/imgs/house3.jpg'
import house04 from '../../assets/imgs/house4.jpg'

export default function DetailsCarrousel() {
  return (
    <Carousel className='details-carrousel' interval={null}>
      <Carousel.Item>
        <img src={house02} alt='house02' className='rounded-3' style={{height: '500px'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={house03} alt='house03' className='rounded-3' style={{height: '500px'}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img src={house04} alt='house04' className='rounded-3' style={{height: '500px'}}/>
      </Carousel.Item>
    </Carousel>
  );
}