import { Link } from "react-router-dom";
import Carousel from "../carousel/Carousel";

function Details() {
    const productImagenes = [
        "../src/assets/img/taladro-1.png",
        "../src/assets/img/taladro-2.png",
        "../src/assets/img/taladro-3.png",
        "../src/assets/img/taladro-4.png",
        "../src/assets/img/taladro-5.png",
        "../src/assets/img/taladro-6.png",
        "../src/assets/img/taladro-6.png",
        "../src/assets/img/taladro-6.png",
        "../src/assets/img/taladro-6.png"
    ]
    return(
        <div className="d-flex f-dir-colum">
            <Link to="/home">
                <button className="button-transparent font-btn-transparent">
                    <i className="fa-regular fa-arrow-left"></i>Volver atrás
                </button>
            </Link>
            <Carousel imagenes={productImagenes}></Carousel>
            <h1 className="title-lg">Taladro Percutor atornillador Bosch Professional GSB 550 RE Caja de cartón - Azul - 220V</h1>
            <div className="font-xl">
                <span>$</span>
                <span>25.419</span>
            </div>
            <div className="pt-24">
                <h4 className="font-regular mb-16">Descripción</h4>
                <p className="font-sm">Lorem ipsum dolor sit amet consectetur. Vitae eu viverra tristique elit potenti non.
                    Nec fames risus at tristique amet pellentesque faucibus pellentesque.
                    Habitasse ultrices eros duis hac tortor amet interdum nec turpis at purus pellentesque
                    bibendum.</p>
            </div>
            <button className="button-lg button-primary">Alquilar</button>
        </div>
    )
}

export default Details;