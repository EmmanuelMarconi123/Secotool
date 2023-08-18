import { Link, useParams } from "react-router-dom";
import Carousel from "../carousel/Carousel";
import { useState } from "react";
import { useEffect } from "react";

function Details() {
  const params = useParams();
  const [productD, setProductsD] = useState("");

  console.log(params);

  useEffect(() => {
    const fetchProductsD = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/v1/api/products/${params.id}`
        );
        if (response.ok) {
          const dataD = await response.json();
          setProductsD(dataD);
          console.log(dataD);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductsD();
  }, []);
  const productImagenes = [
    "../src/assets/img/taladro-1.png",
    "../src/assets/img/taladro-2.png",
    "../src/assets/img/taladro-3.png",
    "../src/assets/img/taladro-4.png",
    "../src/assets/img/taladro-5.png",
    "../src/assets/img/taladro-6.png",
    "../src/assets/img/taladro-6.png",
    "../src/assets/img/taladro-6.png",
    "../src/assets/img/taladro-6.png",
  ];
  return (
    <div className="d-flex f-dir-colum pt-large">
      <Link to="/home">
        <button className="button-transparent font-btn-transparent">
          <i className="fa-regular fa-arrow-left"></i>Volver atrás
        </button>
      </Link>
      <Carousel imagenes={productImagenes}></Carousel>
      <h1 className="title-lg">{productD.name}</h1>
      <div className="font-xl">
        <span>$</span>
        <span>{productD.price}</span>
      </div>
      <div className="pt-24">
        <h4 className="font-regular mb-16">Descripción</h4>
        <p className="font-sm">{productD.description}</p>
      </div>
      <button className="button-lg button-cta">Alquilar</button>
    </div>
  );
}

export default Details;
