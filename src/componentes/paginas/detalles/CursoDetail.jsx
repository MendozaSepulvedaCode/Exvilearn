import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import Reproductor from "./Reproductor";
import SeccionesInfo from "./SeccionesInfo";
import DetailInfo from "./DetailInfo";
import { BsShareFill, BsSuitHeart, BsLink45Deg } from "react-icons/bs";
import "../../../estilos/detalles/cursodetail.css";

function CursoDetail() {
  return (
    <>
      <Navbar />
      <div className="contianer-video-detail-course">
        <div className="container-video-left">
          <div className="header-video-left">
            <h5>Aprende estrategias de trading avanzadas</h5>
            <div className="iconos-header-detail">
              <BsLink45Deg id="link" />
              <BsShareFill />
              <BsSuitHeart />
            </div>
          </div>
          <div className="container-info-curso">
            <Reproductor />
            <DetailInfo />
          </div>
          <Footer />
        </div>
        <div className="container-video-right">
          <SeccionesInfo />
        </div>
      </div>
    </>
  );
}

export default CursoDetail;
