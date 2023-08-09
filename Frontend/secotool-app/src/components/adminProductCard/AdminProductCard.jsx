import styles from './AdminProductCard.module.css';

const AdminProductCard = (props) => {
  return (
    <div className={styles.container}>
        <span>{props.id}</span>
        <span>{props.title}</span>
        <i className="fa-regular fa-trash-can fa-lg" onClick={props.deleteItem}></i>
    </div>
  )
}

export default AdminProductCard;