import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Center from "@/components/Center";
import Breadcrumb from "@/components/Breadcrumb";

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #222;
`;

const Section = styled.section`
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #f7934b;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style: disc;
    margin-left: 20px;

    li {
      font-size: 1rem;
      line-height: 1.6;
      color: #333;
    }
  }
`;

export default function Privatnost() {
  return (
    <>
      <Header />
      <Center>
      <Container>
        <Title>Politika privatnosti</Title>
        <Section>
          <h2>1. Koje podatke prikupljamo?</h2>
          <p>Prikupljamo sledeće vrste podataka:</p>
          <ul>
            <li>Lične informacije: ime, email, adresa, broj telefona.</li>
          </ul>
        </Section>

        <Section>
          <h2>2. Kako koristimo vaše podatke?</h2>
          <ul>
            <li>Za obradu i dostavu narudžbina.</li>
            <li>Za slanje obaveštenja i promocija.</li>
            <li>Za poboljšanje našeg sajta i usluga putem analitike.</li>
          </ul>
        </Section>

        <Section>
          <h2>3. Deljenje podataka</h2>
          <p>Vaši podaci mogu biti deljeni sa trećim stranama isključivo u sledećim situacijama:</p>
          <ul>
            <li>Sa dostavnim službama za isporuku narudžbina.</li>
            <li>U slučaju zakonske obaveze (npr. na zahtev državnih organa).</li>
          </ul>
        </Section>

        <Section>
          <h2>4. Kako štitimo vaše podatke?</h2>
          <p>Preduzimamo sledeće mere za zaštitu vaših podataka:</p>
          <ul>
            <li>Korišćenje HTTPS protokola za bezbednu komunikaciju.</li>
            <li>Šifrovanje podataka na našim serverima.</li>
            <li>Redovno ažuriranje sistema za zaštitu od neovlašćenog pristupa.</li>
          </ul>
        </Section>

        <Section>
          <h2>5. Prava korisnika</h2>
          <p>Imate sledeća prava u vezi sa vašim podacima:</p>
          <ul>
            <li>Pravo na pristup vašim podacima.</li>
            <li>Pravo na ispravku netačnih podataka.</li>
            <li>Pravo na brisanje vaših podataka („pravo na zaborav“).</li>
            <li>Pravo na prigovor na obradu podataka.</li>
          </ul>
        </Section>

        <Section>
          <h2>6. Kolačići</h2>
          <p>Kolačići se koriste za:</p>
          <ul>
            <li>Poboljšanje funkcionalnosti sajta.</li>
            <li>Analizu poseta sajtu.</li>
            <li>Prikaz relevantnih oglasa (ako se koriste).</li>
          </ul>
          <p>Više informacija o kolačićima možete pronaći u našoj <a href="/kolačići">Politici o kolačićima</a>.</p>
        </Section>

        <Section>
          <h2>7. Kontakt</h2>
          <p>Ako imate pitanja o našoj Politici privatnosti, kontaktirajte nas:</p>
          <ul>
            <li>Email: promajafishing@gmail.com</li>
          </ul>
        </Section>
      </Container>
      </Center>
      <Footer />
    </>
  );
}
