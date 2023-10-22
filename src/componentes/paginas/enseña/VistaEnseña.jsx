import HeaderEnseña from "./HeaderEnseña";
import BeneficiosEnseña from "./BeneficiosEnseña";
import FaqEnseña from "./FaqEnseña";
import ContactEnseña from "./ContactEnseña";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

function VistaEnseña() {
  return (
    <>
      <Navbar />
      <HeaderEnseña />
      <BeneficiosEnseña />
      <FaqEnseña />
      <ContactEnseña />
      <Footer />
    </>
  );
}

export default VistaEnseña;
