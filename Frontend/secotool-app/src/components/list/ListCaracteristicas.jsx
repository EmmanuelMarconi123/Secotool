import styles from './ListCaracteristicas.module.css'
const ListCaracteristicas = ({ caracteris }) => {
  console.log(caracteris)
  return (
    <ul className={styles.listCaract}>
      {caracteris.map((caract) => (
          <li key={caract.features.id}><i className={caract.features.icono}></i>{caract.features.nombre}</li>
      ))}
    </ul>
  );
};
export default ListCaracteristicas;
