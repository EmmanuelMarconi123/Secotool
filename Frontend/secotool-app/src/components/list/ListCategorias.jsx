import style from "./ListCategorias.module.css";
const ListCategorias = () => {
  const mockListCateg = [
    "Categoria 1",
    "Categoria 2",
    "Categoria 3",
    "Categoria 4",
    "Categoria 5",
    "Categoria 6",
    "Categoria 7",
    "Categoria 8",
    "Categoria 9",
    "Categoria 10",
    "Categoria 11",
    "Categoria 12",
  ];

  return (
    <>
      <ul className={style.listCategorias}>
        {mockListCateg.map((categ) => (
          <li key={categ}>
            <a href="">{categ}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ListCategorias;
