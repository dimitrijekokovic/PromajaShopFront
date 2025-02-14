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
          src="/blog/jutarnji-ribolov.jpg" 
          alt="Boja varalice" 
          width={800} 
          height={400} 
          style={{ borderRadius: "10px" }}
        />
        <Title>5 saveta za uspešan ribolov u ranim jutarnjim satima</Title>

        <Content>
  <p>
    Ribolov u ranim jutarnjim satima često donosi najbolje rezultate. Ribe su tada najaktivnije, voda je mirna, a priroda stvara savršenu atmosferu za opuštanje i koncentraciju. Međutim, uspešan ribolov zahteva pripremu i prave tehnike. U nastavku delimo 5 ključnih saveta koji će vam pomoći da jutarnji ribolov bude što uspešniji.
  </p>

  <h3>1. Pripremite opremu unapred</h3>
  <p>
    Noć pre ribolova pripremite sve što vam je potrebno - štapove, mašinice, rezervne varalice i ostalu opremu. Na ovaj način ćete uštedeti vreme i moći da se fokusirate na pecanje odmah po dolasku na vodu.
  </p>
  <p>
    Takođe, proverite stanje vaše opreme. Na primer, proverite da li su varalice u dobrom stanju i da li su mašinice ispravno podmazane.
  </p>

  <h3>2. Proverite vremenske uslove</h3>
  <p>
    Jutarnji ribolov je najefikasniji u blagim i mirnim vremenskim uslovima. Izbegavajte jaka nevremena i jake vetrove. Oblačno vreme sa blagim povetarcem često pruža idealne uslove za pecanje.
  </p>
  <p>
    Ponesite odeću koja će vas zaštititi od vlage i hladnoće, jer jutarnji sati mogu biti prilično sveži, čak i tokom leta.
  </p>

  <h3>3. Odaberite pravu lokaciju</h3>
  <p>
    Lokacija igra ključnu ulogu u uspešnom ribolovu. Fokusirajte se na mesta poput:
  </p>
  <ul>
    <li>
      <strong>Ušća reka:</strong> Ribe se okupljaju na ovim mestima ujutru jer voda nosi insekte i plankton.
    </li>
    <li>
      <strong>Vegetacijom bogate obale:</strong> Ribe se skrivaju u gustoj vegetaciji, tražeći hranu.
    </li>
    <li>
      <strong>Dublje vode:</strong> Tokom toplijih meseci, ribe se povlače u dublje slojeve gde je temperatura prijatnija.
    </li>
  </ul>

  <h3>4. Eksperimentišite sa varalicama</h3>
  <p>
    Jutro je idealno za testiranje različitih varalica. Twitchevi, vobleri i silikonci su odličan izbor za jutarnji ribolov. Birajte varalice koje imitiraju male ribe ili insekte, jer su to najčešći plen ujutru.
  </p>
  <p>
    Promenite brzinu povlačenja varalice kako biste izazvali reakciju ribe. Kombinujte spore pokrete sa naglim ubrzanjem za najbolje rezultate.
  </p>

  <h3>5. Održavajte tišinu</h3>
  <p>
    Ribe su osetljive na zvukove, posebno ujutru. Budite tihi dok prilazite vodi i izbegavajte nagle pokrete koji bi mogli da ih uplaše. Pažljivo bacajte varalice i trudite se da vaš čamac, ako ga koristite, pravi što manje buke.
  </p>
  <p>
    Strpljenje je ključno - ne žurite i pažljivo pratite ponašanje vode i riba.
  </p>

  <h3>Zaključak</h3>
  <p>
    Ribolov u ranim jutarnjim satima može biti izuzetno uspešan uz pravu pripremu i odgovarajuće tehnike. Pratite ovih 5 saveta kako biste maksimalno iskoristili svaki trenutak na vodi. Bez obzira na ulov, uživanje u prirodi i miru jutra je najveća nagrada.
  </p>
</Content>
     
        
      </BlogContainer>
      <Footer></Footer>
    </>
  );
}
