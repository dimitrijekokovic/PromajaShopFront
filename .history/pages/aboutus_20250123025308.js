import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Section = styled.section`
  padding: 80px 20px;
  background-color: ${(props) => (props.gray ? "#f3f4f6" : "white")};
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 30px;
  color: #222;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &:after {
    content: "";
    position: absolute;
    width: 50px;
    height: 4px;
    background: #f97316;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Subtitle = styled.h2`
  font-size: 2.2rem;
  color: #f97316;
  margin: 30px 0;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: #444;
  max-width: 850px;
  margin: 20px auto;
  text-align: justify;
`;

const Highlight = styled.span`
  color: #f97316;
  font-weight: bold;
`;

const SwiperContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  border-radius: 15px;
  overflow: hidden;

  .swiper-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    background: #f97316;
  }
`;

const ImageBanner = styled.div`
  width: 100%;
  height: 300px;
  background-image: url("https://images.unsplash.com/photo-1589187152625-df946eb04612");
  background-size: cover;
  background-position: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
  }
`;

const BannerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;

  h1 {
    font-size: 2.8rem;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;

export default function AboutUs() {
  return (
    <>
      <Header />
      <ImageBanner>
        <BannerText>
          <h1>Naša priča - PromajaFishing</h1>
          <p>Strast prema prirodi, ribolovu i zajednici</p>
        </BannerText>
      </ImageBanner>

      <Section>
        <Title>Kako je sve počelo?</Title>
        <Text>
          Naša priča je započela iz <Highlight>iskrene ljubavi prema pecanju</Highlight>, koja nas je povezala sa prirodom i stvorila nezaboravne trenutke. Porodične tradicije, vikendi pored vode i avanture s ribolovačkim štapom – to su temelji naše priče.
        </Text>
        <Text>
          Pecanje nije samo hobi – to je naš način bega od svakodnevice i povezivanja sa onim najboljim u nama.
        </Text>
      </Section>

      <Section gray>
        <Subtitle>Zašto baš PromajaFishing?</Subtitle>
        <Text>
          <Highlight>Krajem 2024. godine</Highlight>, naša vizija je bila jasna – spojiti strast prema ribolovu sa željom za edukacijom i stvaranjem zajednice. Pokrenuli smo profile na društvenim mrežama i posvetili se <Highlight>edukativnim sadržajima</Highlight>.
        </Text>
      </Section>

      <SwiperContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1569429514243-9f7895a7d98b"
              alt="Ribolov u akciji"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1577985472393-b3f781ca13e6"
              alt="Naši ulovi"
            />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>

      <Section>
        <Subtitle>Naša vizija</Subtitle>
        <Text>
          Želimo da inspirišemo sve generacije ribolovaca, pružimo kvalitetne alate i postanemo najveća zajednica posvećena pecanju.
        </Text>
      </Section>

      <Footer />
    </>
  );
}
