import styles from './HomeAdmin.module.css';
import AdminProductCard from '../../adminProductCard/AdminProductCard';
import { useEffect, useState } from 'react';
// import AdminHeader from '../../header/adminHeader/AdminHeader';


const HomeAdmin = () => {

   const ArrProducts= [ 
        {
            id: "0001",
            title: "Taladro Percutor atornillador Bosch Professional GSB 550 RE Caja de cartón - Azul - 220V",
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
    ]


    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 1024px)").matches
      )

    const [products, setProducts] = useState(ArrProducts)
    
    function deleteItem(id){
        console.log("Se ha borrado el item con id " + id)
        const newProducts= products.filter((product)=> product.id !== id)
        setProducts(newProducts)
        console.log(products)
    }

    useEffect(() => {
        window
        .matchMedia("(min-width: 1024px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);
 
    return(
        <div>
            
            {matches ?
                <div>
                    {/* <AdminHeader/> */}
                    <div className={styles.container}>
                        <h1 style={{fontWeight:"400", fontSize: "19px", padding: "16px 0"}}>Todos los productos</h1>
                        <div className={styles.tableContainer}>
                            <div className={styles.tableHeader}>
                                <span>ID</span>
                                <span>Nombre</span>
                                <span>Acciones</span>
                            </div>
                            {
                             products&& products.map((product) =>(
                                    <AdminProductCard key={product.id} deleteItem={()=>deleteItem(product.id)} id={product.id} title={product.title}/>
                                ))
                            }
                        </div>
                    </div>
                </div>

            : <span style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100vh"}}>Por favor ingrese desde un dispositivo mas grande</span>}
        </div>

 

    )
}
export default HomeAdmin;