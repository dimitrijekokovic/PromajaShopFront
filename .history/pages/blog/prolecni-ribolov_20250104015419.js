import styled from "styled-components";
import Header from "/components/Header";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

const BlogContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: auto;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;

  p {
    margin-bottom: 15px;
  }

  ul {
    margin-left: 20px;
  }

  h3 {
    font-size: 1.1rem; /* Malo veći font za mini-naslove */
    font-weight: bold;
    color: #333; /* Tamnija boja za kontrast */
    margin-bottom: 10px; /* Razmak ispod naslova */
  }
`;

export default function BlogPost() {
  return (
    <>
      <Header />
      <BlogContainer>
        <Image 
          src="/blog/prolecni-ribolov.jpg" 
          alt="Boja varalice" 
          width={800} 
          height={400} 
          style={{ borderRadius: "10px" }}
        />
        <Title>Ribolov u proleće: Najbolje tehnike za ovo doba godine</Title>
        <Content>
  <p>
    Proleće je jedno od najlepših doba za ribolov. Sa porastom temperature i
    povratkom prirode u život, ribe postaju aktivnije, što ovo doba godine čini
    savršenim za ribolovce. Ipak, uspešan ribolov u proleće zahteva pravilne
    tehnike, izbor opreme i razumevanje ponašanja riba. U ovom tekstu delimo
    savete i najbolje strategije za prolećni ribolov.
  </p>

  <h3>1. Razumevanje ponašanja riba u proleće</h3>
  <p>
    Tokom proleća, ribe se kreću iz zimskih skrovišta ka plićim i toplijim
    vodama. Ovo je period kada se ribe hrane intenzivnije kako bi nadoknadile
    energiju izgubljenu tokom zime i pripremile se za mrest. Zbog toga su
    prolećni meseci idealni za ulov grabljivica poput štuke, smuđa i basa.
  </p>

  <h3>2. Izbor prave opreme i varalica</h3>
  <p>
    Proleće zahteva pažljiv izbor opreme i mamaca. Evo nekoliko preporuka:
  </p>
  <ul>
    <li>
      <strong>Silikonske varalice:</strong> Savršene za imitirane pokrete malih
      riba ili larvi koje su ribe aktivno love tokom ovog perioda.
    </li>
    <li>
      <strong>Vobleri sa plitkim zaranjanjem:</strong> Idealni za pecanje u
      plićim vodama gde se ribe kreću u potrazi za hranom.
    </li>
    <li>
      <strong>Spinnerbaits:</strong> Njihova rotacija i bljesak privlače pažnju
      riba u zamućenim vodama ili pri slabijem osvetljenju.
    </li>
  </ul>

  <h3>3. Fokusirajte se na pravo vreme</h3>
  <p>
    Jutarnji i večernji sati su najefikasniji za ribolov tokom proleća. U ovim
    periodima ribe su najaktivnije, dok su temperature prijatnije i za njih i za
    vas. Tokom podneva, kada sunce postane jače, ribe se povlače u dublje i
    hladnije slojeve vode.
  </p>

  <h3>4. Odaberite pravu lokaciju</h3>
  <p>
    U proleće je važno pronaći mesta gde se ribe okupljaju. Evo nekoliko predloga:
  </p>
  <ul>
    <li>
      <strong>Plići zalivi:</strong> Riba se u proleće često povlači u toplije
      i pliće vode gde ima više hrane.
    </li>
    <li>
      <strong>Blizina vegetacije:</strong> Ribe se skrivaju u vegetaciji gde
      pronalaze zaklon i plen.
    </li>
    <li>
      <strong>Obale reka:</strong> Ušća i sporiji tokovi reka privlače ribe
      tokom prolećnih meseci.
    </li>
  </ul>

  <h3>5. Prilagodite tehnike vođenja varalice</h3>
  <p>
    Prolećni ribolov zahteva sporije i preciznije vođenje varalice. Ribe su
    aktivne, ali i oprezne, pa je važno imitirati prirodne pokrete plena.
  </p>
  <p>
    Promenite brzinu povlačenja varalice i eksperimentišite sa njenom dubinom.
    Koristite mamce koji proizvode vibracije i zvukove kako biste privukli
    pažnju grabljivica.
  </p>

  <h3>Zaključak</h3>
  <p>
    Ribolov u proleće pruža jedinstvenu priliku da uživate u prirodi dok lovite
    aktivne i gladne ribe. Pravilna priprema, izbor opreme i razumevanje
    sezonskog ponašanja riba ključni su za uspeh. Eksperimentišite sa tehnikama
    i lokacijama, i uživajte u svakom trenutku na vodi.
  </p>
</Content>

      </BlogContainer>
      <Footer></Footer>
    </>
  );
}
