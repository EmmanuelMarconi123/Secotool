import styles from './AdminFeatureCard.module.css';

const AdminFeatureCard = (props) => {
  return (
    <div className={styles.container}>
      <span>{props.name}</span>
      <i className={props.icon} style={{color: "var(--Dark)"}}></i>
      <div className="iconsAd">
        <i className="fa-regular fa-pencil-square fa-lg" onClick={props.editItem} style={{color: '#D0731D'}}></i>
      <i
        className="fa-regular fa-trash-can fa-lg"
        onClick={props.deleteItem}
      ></i>
      </div>
    </div>
  )
}

export default AdminFeatureCard
