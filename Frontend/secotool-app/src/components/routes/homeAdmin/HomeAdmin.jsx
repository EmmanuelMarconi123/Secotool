import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";

const HomeAdmin = () => {
  const ArrProducts = [
    {
      id: "0001",
      title:
        "Taladro Percutor atornillador Bosch Professional GSB 550 RE Caja de cartón - Azul - 220V",
    },
    {
      id: "0002",
      title: "Martillo Inoxidable Professional Hetcher",
    },
    {
      id: "0003",
      title: "Pinza punzadora profesional Smith",
    },
    {
      id: "0004",
      title: "Sierra sensitiva Bosch ATB 530 V2 - Negra - 220V",
    },
    {
      id: "0005",
      title: "Destornillador electrico Hiui alta durabilidad - Rojo",
    },
    {
      id: "0006",
      title: "Nivel Laser Reifelmenz 10 metros",
    },
    {
      id: "0007",
      title: "Amoladora Steel 5 discos con soporte automatico - 220V",
    },
    {
      id: "0008",
      title: "Gafas de proteccion Sahira de alta resistencia trasparentes",
    },
    {
      id: "0009",
      title: "Sierra Cortadora Sensitiva Metal Yosemite 2100w 355mm 14puLG",
    },
    {
      id: "0010",
      title: "Caja De Herramientas Con 9 Piezas Truper Pinza Alicate",
    },
    {
      id: "0011",
      title: "Set De Chapista Black Jack X 7 Pcs 3 Martillos 4 Aguantadore",
    },
    {
      id: "0012",
      title: "Pinza Pelacables Automatico Frontal Bremen Corta Cable 7725",
    },
    {
      id: "0013",
      title: "Taladro Atornillador Percutor + 2 Baterias Gp By Lusqtoff",
    },
    {
      id: "0014",
      title: "Mini Motosierra Electrosierra Recargable Batería Inalámbrica",
    },
    {
      id: "0015",
      title: "Destornillador electrico Hiui alta durabilidad - Rojo",
    },
    {
      id: "0016",
      title: "Juego De Llaves Combinadas Fija Estriada 12 Piezas 6 A 22 Mm",
    },
    {
      id: "0017",
      title: "Llave Caño Stilson Bahco 142 426 Mm Apertura 65 Mm",
    },
    {
      id: "0018",
      title: "Lijadora Rotoorbital 300w 125mm 5 PuLG Vel Variable + Lijas",
    },
    {
      id: "0019",
      title: "Pinza Sacabocado Profesional Para Perforar Cuero Plástico",
    },
    {
      id: "0020",
      title: "Caja De Herramientas Con 9 Piezas Truper Pinza Alicate",
    },
  ];

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = ArrProducts.slice(fistPostIndex, lastPostIndex);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  const [products, setProducts] = useState(ArrProducts);

  async function getData() {
    const response = await (await fetch("URL TO FETCH")).json();
    setProducts(response);
  }

  function deleteItem(id) {
    console.log("Se ha borrado el item con id " + id);
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    console.log(products);
  }

  //   async function deleteItem(id) {
  //     const response = await (await fetch("URL TO FETCH")).json()
  //     setProducts(response);
  //  }

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <h1
              style={{ fontWeight: "400", fontSize: "19px", padding: "16px 0" }}
            >
              Todos los productos
            </h1>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Nombre</span>
                <span>Acciones</span>
              </div>
              {products &&
                currentPost.map((product) => (
                  <AdminProductCard
                    key={product.id}
                    deleteItem={() => deleteItem(product.id)}
                    id={product.id}
                    title={product.title}
                  />
                ))}
              <Pagination
                totalPosts={ArrProducts.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Por favor ingrese desde un dispositivo más grande
        </span>
      )}
    </div>
  );
};
export default HomeAdmin;
