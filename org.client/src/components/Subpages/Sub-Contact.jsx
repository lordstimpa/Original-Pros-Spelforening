import Gamer from "../../assets/gamer.jpg";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="Title">
        <h1>KONTAKT</h1>
      </div>
      <div className="Info">
        <div>
          <h2>Kontakta oss!</h2>
        </div>
        <div>
          <p>
            För att komma i kontakt med hela styrelsen så skicka oss ett mail:
            orgspelforening@gmail.com
          </p>
          <p>
            Ifall du vill komma i kontakt med en enskild person från styrelsen
            så kan du göra detta via Discord eller via kontaktuppgifterna som
            finns under fliken <Link to="/about/board">Styrelse</Link>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
