/* eslint-disable react/no-unescaped-entities */
import Sejour from "../Sejour";
import Assistance from "../assistance/assistance";
import "./about.scss";
export default function About() {
  return (
    <section>
      <div id="about-content">
        <h1>
          Bienvenue sur le site web de Soigne moi, votre destination de
          confiance pour des soins de santé exceptionnels dans un environnement
          moderne et bienveillant.
        </h1>
        <Assistance />
        <Sejour />
      </div>
    </section>
  );
}
