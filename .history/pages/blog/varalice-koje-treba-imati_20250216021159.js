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

  <h3>1. Rapala X-Rap (Twitchevi)</h3>
  <p>
    Rapala X-Rap je jedan od najpoznatijih twitcheva na tržištu. Njegova nepravilna akcija oponaša ranjenu ribu, što ga čini savršenim za štuku, smuđa i basa. Dostupan je u raznim bojama i veličinama, a posebno je efikasan u bistroj vodi.
  </p>
  <ul>
    <li><strong>Najbolje za:</strong> Štuku i smuđa u bistroj vodi.</li>
    <li><strong>Prednosti:</strong> Precizno vođenje, atraktivna akcija i kvalitetna izrada.</li>
    <li><strong>Preporučena boja:</strong> Natural Perch i Ghost White.</li>
  </ul>

  <h3>2. Salmo Hornet (Vobleri)</h3>
  <p>
    Salmo Hornet je legendarni vobler koji je već godinama favorit među pecarošima. Njegova akcija i mogućnost zaranjanja čine ga odličnim za lov na bucovu, klena i soma. Dostupan je u modelima za plitke i duboke vode, što ga čini univerzalnim rešenjem.
  </p>
  <ul>
    <li><strong>Najbolje za:</strong> Bucova i klena u rekama i jezerima.</li>
    <li><strong>Prednosti:</strong> Široka paleta boja i dubinski opseg.</li>
    <li><strong>Preporučena boja:</strong> Hot Perch i Chartreuse Shad.</li>
  </ul>

  <h3>3. Keitech Swing Impact (Silikonske varalice)</h3>
  <p>
    Keitech Swing Impact je izuzetno popularna silikonska varalica među ribolovcima. Njena meka struktura i realističan pokret privlače pažnju riba kao što su smuđ, pastrmka i som. Idealan je za ribolov blizu dna i u vegetacijom bogatim područjima.
  </p>
  <ul>
    <li><strong>Najbolje za:</strong> Smuđa i pastrmku u plićim vodama.</li>
    <li><strong>Prednosti:</strong> Realističan izgled, fleksibilnost i univerzalnost.</li>
    <li><strong>Preporučena boja:</strong> Electric Shad i Green Pumpkin.</li>
  </ul>

  <h3>4. Mepps Aglia (Spinnerbaits)</h3>
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
S