import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Contact = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>ORG - Contact</title>
        <meta
          name="description"
          content="Contact Original Pros Gamming Association!"
        />
      </Helmet>

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
            finns under fliken{" "}
            <Link id="linkurl" to="/about/board">
              Styrelse
            </Link>
            .
          </p>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Contact;
