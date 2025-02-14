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
          src="/blog/boja-varalice.jpg" 
          alt="Boja varalice" 
          width={800} 
          height={400}
          layout="responsive"
          style={{ borderRadius: "10px" }}
        />
        <Title>Kako odabrati boju varalice prema vremenskim uslovima?</Title>
        <Content>
          <p>
          Ribolov je umetnost koja zahteva pažljivo prilagođavanje, a odabir boje varalice često igra ključnu ulogu u uspešnosti. Boja varalice može uticati na to koliko brzo riba primećuje mamac i odlučuje da ga napadne. Razumevanje kako vremenski uslovi, svetlost i voda utiču na vidljivost varalica može značajno poboljšati vaš ulov.
          </p>

        <h3>1. Svetle boje za sunčano vreme</h3>
          <p>Svetle boje, kao što su žuta, narandžasta, fluorescentna zelena i svetlo plava, idealne su za sunčano vreme i bistru vodu. Ove boje reflektuju mnogo svetlosti, čineći varalicu vidljivom čak i kada se nalazi na većim dubinama. Ribolovci često koriste svetle varalice tokom proleća i leta, kada sunčeva svetlost prodire duboko u vodu.
          </p>
          <p>
          Na primer, fluorescentna žuta boja je odličan izbor za grabljivice poput štuke, jer privlači pažnju agresivnih vrsta. Pored toga, kombinacija svetlih boja i metalik elemenata može dodatno poboljšati vidljivost varalice.
          </p>

        <h3>2. Tamne boje za oblačne dane</h3>
          <p>Kada je vreme oblačno, tamnije boje varalica poput crne, tamno zelene i braon dolaze do izražaja. One stvaraju snažan kontrast protiv svetlijeg neba i vode, što ih čini vidljivim u uslovima slabijeg osvetljenja. Tamne varalice su idealne za ribolov pred oluju ili tokom ranih jutarnjih i kasnih večernjih sati.
          </p>
          <p>
          Crna boja je posebno efikasna jer imitira siluetu plena, dok tamno zelena odlično funkcioniše u vegetacijom bogatim vodama gde se ribe često skrivaju.
          </p>

        <h3>3. Metalik boje za refleksiju</h3>
          <p>Metalik varalice sa srebrnim ili zlatnim detaljima su neprocenjive u bistroj vodi. Ove varalice reflektuju svetlost, simulirajući bljesak krljušti plena. Srebrni tonovi se često koriste za ribe poput pastrmke i lososa, dok su zlatni tonovi idealni za ribolov u zamućenim vodama.
          </p>
          <p>
          Ribolovci preporučuju korišćenje metalik boja tokom ribolova na otvorenom jezeru ili reci, gde sunčeva svetlost može da igra ključnu ulogu u privlačenju pažnje ribe. Kombinovanje ovih boja sa brzim pokretima varalice stvara efekat života, što dodatno privlači ribe.
          </p>

        <h3>4. Kontrastne boje za mutnu vodu</h3>
        <p>
        Kada ribolovite u mutnoj vodi, gde vidljivost može biti ograničena, kontrastne boje postaju najvažnije. Svetlo roze, fluorescentno narandžasta i bela su boje koje se često koriste jer su dovoljno upečatljive da privuku pažnju čak i u lošim uslovima.
        </p>
        <p>
        Ribolovci u mutnim rekama često koriste varalice sa više kontrastnih boja - npr. kombinaciju bele i crvene. Takve varalice simuliraju ranjenu ribu i povećavaju šanse za napad.
        </p>

        <h3>5. Prilagođavanje sezonskim promenama</h3>
        <p>
        Pored vremenskih uslova, sezonske promene takođe igraju ulogu u izboru boje varalica. Tokom proleća i leta, svetlije boje su dominantne zbog veće aktivnosti riba. Zimi, kada ribe postaju letargične, tamnije nijanse i varalice sa sporijom akcijom imaju veću efikasnost.
        </p>
        <p>
        U jesen, kada je voda često mutna zbog padavina, fluorescentne boje i kombinacije sa metalik detaljima su odličan izbor. Ovo je posebno važno za ribolov grabljivica poput smuđa i štuke, koje su u ovom periodu godine veoma aktivne.
        </p>

        <h3>6. Eksperimentisanje je ključno        </h3>
        <p>
        Iako ove smernice pružaju čvrstu osnovu za odabir boje varalice, svaka voda ima svoje specifičnosti. Neke ribe mogu reagovati drugačije u zavisnosti od njihove navike, vrste plena u vodi i prisutnosti grabljivaca. Eksperimentisanje sa različitim bojama i veličinama varalica omogućava ribolovcima da se prilagode specifičnim uslovima.
        </p>

        <h3>Zaključak</h3>
        <p>
        Odabir prave boje varalice može napraviti ogromnu razliku između uspešnog i neuspešnog ribolova. Svetli dani zahtevaju svetle boje, dok tamne i kontrastne varalice dolaze do izražaja u oblačnim ili mutnim uslovima. Kombinovanjem različitih boja, veličina i tehnika vođenja varalice, možete značajno povećati svoje šanse za ulov.
        </p>
        <p>
        Povećajte svoj ribolovni arsenal i testirajte različite boje u različitim situacijama – ribolov nije samo veština, već i stalno istraživanje.
        </p>

</Content>
      </BlogContainer>
      <Footer></Footer>
    </>
  );
}
