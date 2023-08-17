import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DropDownMenu = ({ categories, anchorEl, onClose, onSelect }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {categories.map((category) => (
        <MenuItem key={category} onClick={() => onSelect(category)}>
          {category}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropDownMenu;
