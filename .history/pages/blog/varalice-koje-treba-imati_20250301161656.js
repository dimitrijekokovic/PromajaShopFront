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
`;

export default function BlogPost() {
  return (
    <>
      <Header />
      <BlogContainer>
        <Image 
          src="/blog/varalice-koje-treba-imati.jpg" 
          alt="Boja varalice" 
          width={800} 
          height={400}
          layout="responsive"  
          style={{ borderRadius: "10px" }}
        />
        <Title>5 varalica koje svaki pecaroš mora da ima</Title>
        <Content>
  <p>
    Izbor pravih varalica može napraviti ogromnu razliku u uspehu svakog pecaroša. Na tržištu postoji mnogo opcija, ali neki modeli su se dokazali kao najefikasniji za razne uslove i vrste riba. Predstavljamo 5 varalica koje svaki pecaroš mora imati u svojoj kutiji.
  </p>

  <h3>5. PF Vortex Crank</h3>
  <p>
  PF Vortex Crank je dizajniran za ribolov na većim dubinama, sa jakom vibracijom i izraženom akcijom koja privlači grabljivice čak i u mutnoj vodi. Njegov široki rad i agresivan pokret čine ga odličnim izborom za ribolov smuđa i štuke. Opremljen je oštrim trokrakim udicama koje osiguravaju sigurno kačenje.
  </p>

  <ul>
    <li><strong>Najbolje za:</strong> Smuđa i štuku u dubljim vodama</li>
    <li><strong>Prednosti:</strong> Duboko zaranjanje, jaka vibracija, precizna akcija</li>
    <li><strong>Preporučena boja:</strong> Plavo-srebrna i Žuto-crna</li>
  </ul>

  <h3>4. PF Twitch</h3>
  <p>
  PF Twitch je varalica dizajnirana za agresivniji stil ribolova, sa nepravilnim pokretima koji imitiraju ranjenu ribu. Njegova reakcija na trzaje štapa omogućava izuzetno realističnu prezentaciju, što ga čini odličnim za smuđa i bucova. Zahvaljujući preciznom balansu, lako se kontroliše i odlično reaguje na promene u brzini povlačenja.
</p>

  <ul>
    <li><strong>Najbolje za:</strong> Štuku i bucova u bistroj vodi</li>
    <li><strong>Prednosti:</strong> Brza i nepredvidiva akcija, odlična kontrola</li>
    <li><strong>Preporučena boja:</strong> Plavo-srebrna i Zlatno-crna </li>
  </ul>

  <h3>3. PF Phantom</h3>
  <p>
  PF Phantom je svestrana varalica sa stabilnim radom i u mirnoj i u tekućoj vodi. Njegov oblik i balans omogućavaju mu prirodno zaranjanje, dok reflektujuća površina dodatno privlači pažnju grabljivica. Opremljen je trokrakim udicama visokog kvaliteta, što osigurava sigurno kačenje.</p>
  <ul>
    <li><strong>Najbolje za:</strong> Smuđa i bucova u plićim vodama</li>
    <li><strong>Prednosti:</strong> Stabilna akcija, reflektujuća površina, prilagodljivost različitim uslovima</li>
    <li><strong>Preporučena boja:</strong> Plavo-hrom i Sivo-crna</li>
  </ul>

  <h3>2. SFT Glavinjara</h3>
  <p>
    Mepps Aglia je klasik među spinnerbaits varalicama. Njegov bljesak i vibracije su neodoljivi za grabljivice poput štuke i klena. Idealan je za mutne vode i ribolov u brzim tokovima reka.
  </p>
  <ul>
    <li><strong>Najbolje za:</strong> Štuku i klena u mutnim vodama.</li>
    <li><strong>Prednosti:</strong> Pouzdanost i efikasnost u raznim uslovima.</li>
    <li><strong>Preporučena veličina:</strong> #3 i #4 za veće ribe.</li>
  </ul>

  <h3>5. Savage Gear 3D Crayfish (Glavinjare)</h3>
  <p>
    Savage Gear 3D Crayfish je savršena varalica za lov na dnu. Njegov realističan dizajn imitira rakove, što ga čini idealnim za soma i smuđa. Ova varalica pruža odlične rezultate u dubljim vodama i tokom hladnijih perioda.
  </p>
  <ul>
    <li><strong>Najbolje za:</strong> Soma i smuđa u dubljim vodama.</li>
    <li><strong>Prednosti:</strong> Realističan dizajn i izdržljivost.</li>
    <li><strong>Preporučena veličina:</strong> 10 cm za velike ribe.</li>
  </ul>

  <h3>Zaključak</h3>
  <p>
    Ove varalice predstavljaju osnovni arsenal svakog ozbiljnog pecaroša. Bez obzira na to gde i šta pecate, pravilan izbor varalica može značajno povećati vaše šanse za uspeh. Dodajte ove modele u svoju kutiju i budite spremni za svaki izazov na vodi!
  </p>
</Content>


      </BlogContainer>
      <Footer></Footer>
    </>
  );
}