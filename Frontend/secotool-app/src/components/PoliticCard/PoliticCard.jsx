import styles from '../PoliticCard/PoliticCard.module.css'

const PoliticCard = (props) => {
  return (
    <div className={styles.container}>
    <span>{props.name}</span>
    <span>{props.descripcion}</span>
    <span>aca van las politicas</span>
    <div className={styles.iconAd}>
      <i
        className="fa-regular fa-pencil-square fa-lg"
        onClick={props.editItem}
        style={{ color: "#D0731D" }}
      ></i>
      <i
        className="fa-regular fa-trash-can fa-lg"
        onClick={props.deleteItem}
      ></i>
    </div>
  </div>
  )
}

export default PoliticCard
