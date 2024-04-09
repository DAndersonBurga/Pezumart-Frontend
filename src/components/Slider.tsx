import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../scss/slider.scss'


const Slider = () => {
    return (
        <>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className='slide-container'>
                <div className="slide-box">
                  <h1 className='slide-titulo'>Confia en Nosotros</h1>
                  <p className='slide-texto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, veritatis voluptas? Cumque, reprehenderit? Molestias asperiores.</p>
                  <button
                    className='slide-button'
                  >Show Now</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide> 
              <div className='slide-container'>
                <div className="slide-box">
                  <h1 className='slide-titulo'>Confia en Nosotros</h1>
                  <p className='slide-texto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, veritatis voluptas? Cumque, reprehenderit? Molestias asperiores.</p>
                  <button
                    className='slide-button'
                  >Show Now</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide> 
              <div className='slide-container'>
                <div className="slide-box">
                  <h1 className='slide-titulo'>Confia en Nosotros</h1>
                  <p className='slide-texto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, veritatis voluptas? Cumque, reprehenderit? Molestias asperiores.</p>
                  <button
                    className='slide-button'
                  >Show Now</button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </>
      );
}

export default Slider