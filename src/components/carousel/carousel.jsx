import Carousel from 'react-bootstrap/Carousel';
import house2 from '../../assets/imgs/house2.jpg'
import house3 from '../../assets/imgs/house3.jpg'

export default function Carrousel() {
  return (
    <Carousel interval={2000} pause={false}>
      <Carousel.Item>
        <img src={house3} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={house2} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={house3} />
      </Carousel.Item>
    </Carousel>
  );
}