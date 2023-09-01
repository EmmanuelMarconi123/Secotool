import styles from "./AdminProductCard.module.css";

const AdminProductCard = (props) => {
  return (
    <div className={styles.container}>
      <span>{props.id}</span>
      <span>{props.title}</span>
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
  );
};

export default AdminProductCard;
