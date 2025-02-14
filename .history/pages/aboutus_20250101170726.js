import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Section = styled.section`
  padding: 60px 20px;
  background-color: ${(props) => (props.gray ? "#f9f9f9" : "white")};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #f97316;
  margin: 20px 0;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
  margin: 10px auto;
  text-align: justify;
`;

const SwiperContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;

  .swiper-slide img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }

  .swiper-pagination-bullet {
    background: #f97316;
  }
`;

const Highlight = styled.span`
  color: #f97316;
  font-weight: bold;
`;

export default function AboutUs() {
  return (
    <>
      <Header />
      <Section>
        <Title>Naša priča - PromajaFishing 🎣</Title>
        <Text>
          Sve je počelo od <Highlight>iskrene ljubavi prema pecanju</Highlight>, koja je još u detinjstvu
          postala sastavni deo života. Porodične tradicije, vikendi pored vode i prve avanture s ribolovačkim
          štapom u ruci – to su bili koreni naše strasti.
        </Text>
        <Text>
          Kako smo odrastali, naša strast je rasla. Ribolov nije bio samo hobi, već način da pobegnemo od
          svakodnevnog stresa, da se povežemo s prirodom i otkrijemo ono najbolje u nama.
        </Text>
      </Section>

      <Section gray>
        <Subtitle>Kako je nastala ideja? 💡</Subtitle>
        <Text>
          Krajem 2023. godine, spojili smo našu strast sa željom da edukujemo i inspirišemo druge. Otvorili smo
          profile na društvenim mrežama sa fokusom na <Highlight>edukativne videe o pecanju</Highlight>.
        </Text>
        <Text>
          <Highlight>Naša misija</Highlight> je jasna – želimo da postanemo najveća pecaroška zajednica na Balkanu
          i motivišemo ljude da više vremena provode u prirodi.
        </Text>
      </Section>

      <Section>
        <Subtitle>PF Vobler - Naš glavni proizvod 🛠️</Subtitle>
        <Text>
          Kao rezultat naše strasti, nastao je naš prvi proizvod – <Highlight>PF Vobler</Highlight>. Njegov oblik i
          dezen su pažljivo kreirani, a rezultati na vodi su fantastični!
        </Text>
        <SwiperContainer>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
          >
            <SwiperSlide>
              <img
                src="https://hellscanyon.tours/wp-content/uploads/2023/01/RiverAdventuresInc-214207-Pieces-Fishing-Equipment-blogbanner1-1080x675.jpg"
                alt="Ulovi na PF Vobler"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCLSgnwZI26Fg1HYkd5W2qOsGyBAHJkjXW0w&s"
                alt="Ulovi na PF Vobler"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.montanaangler.com/sites/default/files/styles/full/public/uploads/2020-02/uppermissouri.fall-5.jpg.jpg?itok=FMaPDsRF"
                alt="Ulovi na PF Vobler"
              />
            </SwiperSlide>
          </Swiper>
        </SwiperContainer>
      </Section>

      <Section gray>
        <Subtitle>Vizija PromajaFishing-a 🚀</Subtitle>
        <Text>
          Naš cilj nije samo prodaja proizvoda – mi želimo da edukujemo, proizvodimo kvalitetne ribolovačke alate i
          gradimo zajednicu.
        </Text>
        <Text>
          Želimo da inspirišemo sledeće generacije ribolovaca i pokažemo da pecanje može biti mnogo više od običnog
          hobija.
        </Text>
      </Section>

      <Footer />
    </>
  );
}
