import Carousel from 'react-bootstrap/Carousel';
import house02 from '../../assets/imgs/house2.jpg'
import house03 from '../../assets/imgs/house3.jpg'
import house04 from '@/assets/imgs/house4.jpg'

export default function DetailsCarrousel({
  images,
  video,
  whatIsThis
}) {

  return (
    <Carousel className='details-carrousel' interval={null}>
      {
        whatIsThis === 'registerProperty' ? (
          images?.map((image, index) => { 
            const path = URL.createObjectURL(image)

            return(
              <Carousel.Item key={index}>
                <img src={path} alt={`house${index + 1}`} className='rounded-3' style={{height: '500px'}}/>
              </Carousel.Item>
            )
          })
        ) : (
           images?.map((image, index) => (
              image.type === 'IMAGEM' ? (
                  <Carousel.Item key={index}>
                      <img
                          src={image.url}
                          alt={image.public_id}
                          className='rounded-3'
                          style={{ height: whatIsThis === 'sendProposal' ? '300px' : '500px' }}
                      />
                  </Carousel.Item>
              ) : (
                  <Carousel.Item key={index}>
                      <video
                          src={image.url}
                          controls
                          className='rounded-3'
                          style={{ height: '500px' }}
                      />
                  </Carousel.Item>
              )
          ))
        )
      }
    </Carousel>
  );
}