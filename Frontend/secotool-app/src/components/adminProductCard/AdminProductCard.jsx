import styles from "./AdminProductCard.module.css";
import { useState } from "react";
import DropDownMenu from "./DropdownMenu";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const AdminProductCard = (props) => {

  const categories = ["Electrónica", "Ropa", "Hogar", "Deportes", "Alimentos", "Libros"];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    handleCloseMenu();
  };

  return (
    <div className={styles.container}>
      <span>{props.id}</span>
      <span>{props.title}</span>
      <div className="iconsAd">
      <i
        className="fa-regular fa-trash-can fa-lg"
        onClick={props.deleteItem}
      ></i>
      <i className="fa-regular fa-pencil-square fa-lg"></i>
      <IconButton onClick={handleOpenMenu}>
          <AddIcon />
        </IconButton>
        <DropDownMenu
          categories={categories}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          onSelect={handleCategorySelect}
        />
      </div>
    </div>
  );
};

export default AdminProductCard;
