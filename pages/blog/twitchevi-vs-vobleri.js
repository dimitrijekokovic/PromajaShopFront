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
        src="/blog/twitchevi-vs-vobleri.jpg" 
        alt="Boja varalice" 
        width={800} 
        height={400}
        layout="responsive"  
        style={{ borderRadius: "10px" }}
        />
        <Title>Twitchevi ili Vobleri: Šta je bolje za sezonski ulov?</Title>
        <Content>
  <p>
    Kada je reč o izboru varalica, twitchevi i vobleri spadaju u dve najpopularnije kategorije među ribolovcima. Oba tipa varalica imaju svoje prednosti i mane, ali izbor zavisi od sezonskih uslova, vrste ribe i stila ribolova. U ovom tekstu pokušaćemo da razjasnimo šta je bolje za vaš sledeći ulov.
  </p>

  <h3>1. Šta su twitchevi?</h3>
  <p>
    Twitchevi su varalice dizajnirane za aktivan ribolov i precizno vođenje. Njihova glavna prednost je u nepravilnim pokretima koje im ribolovac daje trzajima štapa. Ovo imitira ranjenu ribu, što grabljivicama signalizuje laku metu.
  </p>
  <ul>
    <li>
      <strong>Prednosti:</strong> Twitchevi su idealni za brze pokrete i agresivne grabljivice poput štuke i basa.
    </li>
    <li>
      <strong>Nedostaci:</strong> Zahtevaju aktivan stil ribolova i više veštine u vođenju.
    </li>
  </ul>

  <h3>2. Šta su vobleri?</h3>
  <p>
    Vobleri su univerzalne varalice koje su pogodne za razne vrste riba i stilove ribolova. Oni često imaju ugrađenu kljunastu pločicu koja omogućava zaranjanje na različite dubine, čineći ih efikasnim u različitim uslovima vode.
  </p>
  <ul>
    <li>
      <strong>Prednosti:</strong> Lakoća upotrebe, raznovrsnost i mogućnost prilagođavanja dubine.
    </li>
    <li>
      <strong>Nedostaci:</strong> Manje efikasni u situacijama gde je potrebna brza reakcija.
    </li>
  </ul>

  <h3>3. Kada koristiti twitcheve?</h3>
  <p>
    Twitchevi su najefikasniji u sledećim situacijama:
  </p>
  <ul>
    <li>Tokom letnjih meseci kada su grabljivice agresivnije.</li>
    <li>U bistroj vodi gde su ribe opreznije i zahtevaju preciznije vođenje varalice.</li>
    <li>Kada ciljate aktivne vrste poput štuke, basa ili smuđa.</li>
  </ul>

  <h3>4. Kada koristiti voblere?</h3>
  <p>
    Vobleri se preporučuju u sledećim situacijama:
  </p>
  <ul>
    <li>Tokom prolećnih i jesenjih meseci kada su ribe manje aktivne.</li>
    <li>U mutnoj vodi gde su potrebni svetliji i kontrastni mamci.</li>
    <li>Kada lovite ribe koje se nalaze na većim dubinama.</li>
  </ul>

  <h3>5. Saveti za odabir prave varalice</h3>
  <ul>
    <li>
      <strong>Prilagodite boju:</strong> Svetle boje su idealne za bistru vodu i sunčano vreme, dok tamnije i kontrastne boje bolje funkcionišu u mutnoj vodi.
    </li>
    <li>
      <strong>Prilagodite dubinu:</strong> Koristite twitcheve za površinski ribolov, a voblere za dublje slojeve vode.
    </li>
    <li>
      <strong>Eksperimentišite:</strong> Ponekad je najbolje isprobati obe varalice kako biste videli šta najbolje funkcioniše u datim uslovima.
    </li>
  </ul>

  <h3>Zaključak</h3>
  <p>
    Twitchevi i vobleri su oba izuzetno efikasna mamca, ali njihov izbor zavisi od sezonskih uslova, vrste ribe i vašeg stila ribolova. Twitchevi su savršeni za aktivan ribolov i brze grabljivice, dok vobleri pružaju raznovrsnost i lakoću upotrebe u različitim situacijama. Kombinujte oba tipa varalica kako biste povećali svoje šanse za uspešan ulov.
  </p>
</Content>

      </BlogContainer>
      <Footer></Footer>
    </>
  );
}
