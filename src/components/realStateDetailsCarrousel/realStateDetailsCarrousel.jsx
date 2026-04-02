import Carousel from 'react-bootstrap/Carousel';
import house02 from '../../assets/imgs/house2.jpg'
import house03 from '../../assets/imgs/house3.jpg'
import house04 from '@/assets/imgs/house4.jpg'

export default function DetailsCarrousel({
  images
}) {
  return (
    <Carousel className='details-carrousel' interval={null}>
      {
        images?.map((path, index) => (
          <Carousel.Item key={index}>
            <img src={path} alt={`house${index + 1}`} className='rounded-3' style={{height: '500px'}}/>
          </Carousel.Item>
        ))
      }
    </Carousel>
  );
}