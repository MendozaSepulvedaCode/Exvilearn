import InfoCarrito from "./InfoCarrito";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Carrito = ({ carrito, setCarrito }) => {
  return (
    <>
      <Navbar />
      <InfoCarrito carrito={carrito} setCarrito={setCarrito} />
      <Footer />
    </>
  );
};

export default Carrito;
