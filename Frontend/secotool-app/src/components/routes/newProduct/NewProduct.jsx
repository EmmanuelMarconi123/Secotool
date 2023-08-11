import styles from "./NewProduct.module.css";
import NewImage from "../../uploadImage/NewImage";
import { useEffect, useState } from "react";

const NewProduct = () => {
  const [newImage, setNewImage] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [newItem, setNewItem] = useState();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  function handleNewImage() {
    setNewImage(false);
  }

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (inputTitle && inputDesc && inputPrice) {
      setNewItem(true);
      setInputTitle("");
      setInputPrice("");
      setInputDesc("");
      setNewImage(false);

      console.log(newItem);
    } else {
      alert("por favor complete todos los campos");
    }
  }

  return (
    <div>
      {matches ? (
        <div>
            {matches ?
            <div>
                {/* <AdminHeader/> */}
                <div className={styles.container}>
                    <h1 style={{fontWeight:"400", fontSize: "24px", padding: "16px 0"}}>Nuevo Producto</h1>
                    <form action="">
                        <label htmlFor="productName">Nombre del Producto
                            <input type="text" id='productName' />
                        </label>

                        <label htmlFor="productDescription">Descripcion
                            <textarea type="text" id='productDescription'/>
                        </label>

                        <label htmlFor="productPrice">Precio
                            <input type="number" id='productPrice' />
                        </label>

                        <label htmlFor="" >Imagenes
                            <div className={styles.uploadImage} onClick={()=>setNewImage(true)}>
                                <i className="fa-regular fa-cloud-arrow-up"></i>
                                <span>Subir imagen</span>
                            </div>
                        </label>
                        {newImage && 
                            <NewImage imageUrl="https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg" deleteImage={handleNewImage} imageName="Prueba 1"/>
                        }

                        <button type='submit' className={styles.addProduct}>Agregar Producto</button>
                    </form>
                </div>
              </label>
              {newImage && (
                <NewImage deleteImage={handleNewImage} imageName="Prueba 1" />
              )}

              <button type="submit" className={styles.addProduct}>
                Agregar Producto
              </button>
            </form>
          </div>
        </div>
      ) : (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Por favor ingrese desde un dispositivo mas grande
        </span>
      )}
    </div>
  );
};
export default NewProduct;
