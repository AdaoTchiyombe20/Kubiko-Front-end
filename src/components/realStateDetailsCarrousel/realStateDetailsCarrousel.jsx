import Carousel from 'react-bootstrap/Carousel';
import house02 from '../../assets/imgs/house2.jpg'
import house03 from '../../assets/imgs/house3.jpg'
import house04 from '@/assets/imgs/house4.jpg'

export default function DetailsCarrousel({
  images,
  video,
  whatIsThis
}) {
  const registerMedia = [
    ...(images || []),
    ...(video || [])
  ]

  return (
    <Carousel className='details-carrousel' interval={null}>
      {
        whatIsThis === 'registerProperty' ? (
          registerMedia.map((file, index) => { 
            const path = URL.createObjectURL(file)
            const isVideo = file.type?.startsWith('video/')

            return(
              <Carousel.Item key={index}>
                {
                  isVideo ? (
                    <video
                      src={path}
                      controls
                      className='rounded-3 w-100 object-fit-cover'
                      style={{height: '500px'}}
                    />
                  ) : (
                    <img src={path} alt={`house${index + 1}`} className='rounded-3' style={{height: '500px'}}/>
                  )
                }
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
