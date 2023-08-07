import Carousel from "../carousel/Carousel";

function Details() {
    const productImagenes = [
        "../src/assets/img/taladro-1.png",
        "../src/assets/img/taladro-2.png",
        "../src/assets/img/taladro-3.png",
        "../src/assets/img/taladro-4.png",
        "../src/assets/img/taladro-5.png"
    ]
    return(
        <>
            <button className="button-transparent"><i className="fa-regular fa-arrow-left"></i>Volver atrás</button>
            <Carousel imagenes={productImagenes}></Carousel>
            <h1 className="title-lg">Taladro Percutor atornillador Bosch Professional GSB 550 RE Caja de cartón - Azul - 220V</h1>
            <div className="font-xl">
                <span>$</span>
                <span>25.419</span>
            </div>
            <div>
                <h4 className="font-regular">Descripción</h4>
                <p className="font-sm">Lorem ipsum dolor sit amet consectetur. Vitae eu viverra tristique elit potenti non.
                    Nec fames risus at tristique amet pellentesque faucibus pellentesque.
                    Habitasse ultrices eros duis hac tortor amet interdum nec turpis at purus pellentesque
                    bibendum.</p>
            </div>
            <button className="button-lg">Alquilar</button>
        </>
    )
}

export default Details;