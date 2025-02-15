import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Center from "@/components/Center";
import Link from "next/link";

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

export default function Uslovi() {
  return (
    <>
      <Header />
      <Center>
      <Container>
        <Title>Uslovi korišćenja</Title>
        <Section>
          <h2>1. Opšti uslovi</h2>
          <p>
            Ovi uslovi korišćenja primenjuju se na sve posetioce i korisnike sajta
            Promaja Shop. Zadrzavamo pravo da u bilo kom trenutku izmenimo ili
            dopunimo ove uslove. Izmene stupaju na snagu objavljivanjem na sajtu.
          </p>
        </Section>

        <Section>
          <h2>2. Prava i obaveze korisnika</h2>
          <p>Korisnici su dužni da pruže tačne i ispravne informacije prilikom registracije i/ili narudžbine.</p>
          <ul>
            <li>Korišćenje sajta u nezakonite svrhe je zabranjeno.</li>
            <li>Objavljivanje lažnih informacija nije dozvoljeno.</li>
            <li>Pokušaj narušavanja sigurnosti sajta je zabranjen.</li>
          </ul>
        </Section>

        <Section>
          <h2>3. Kupovina i plaćanje</h2>
          <p>
            Svi proizvodi prikazani na sajtu podložni su dostupnosti na lageru. Cene proizvoda su izražene u
            dinarima (RSD) i uključuju porez.
          </p>
        </Section>

        <Section>
          <h2>4. Reklamacije i povraćaj novca</h2>
          <p>
            Reklamacije se podnose putem email-a na adresu: promajafishing@gmail.com u roku od 14 dana od prijema
            proizvoda.
          </p>
          <ul>
            <li>Oštećenje proizvoda tokom dostave.</li>
            <li>Pogrešno isporučen proizvod.</li>
          </ul>
        </Section>

        <Section>
          <h2>5. Ograničenje odgovornosti</h2>
          <p>
            Promaja Shop ne garantuje da će sajt biti bez grešaka ili prekida u radu. Nismo odgovorni za direktnu ili
            indirektnu štetu nastalu korišćenjem sajta ili proizvoda.
          </p>
        </Section>

        <Section>
          <h2>6. Autorska prava</h2>
          <p>
            Svi materijali na sajtu su vlasništvo Promaja Shop-a i ne smeju se koristiti bez prethodne dozvole.
          </p>
        </Section>

        <Section>
  <h2>7. Politika privatnosti</h2>
  <p>
    Prikupljamo i obrađujemo lične podatke korisnika u skladu s važećim zakonima o zaštiti podataka. Detalji
    su dostupni u našoj{" "}
    <Link href="/privatnost">
      <span style={{ color: "inherit", textDecoration: "underline", cursor: "pointer" }}>
        Politici privatnosti
      </span>
    </Link>.
  </p>
</Section>

        <Section>
          <h2>8. Kontakt</h2>
          <p>
            Za  <b>sva pitanja</b> kontaktirajte nas na: <br />
            <b>Email: promajafishing@gmail.com <br /></b>
          </p>
        </Section>
      </Container>
      </Center>
      <Footer />
    </>
  );
}
