import stylesHeader from "./Header.module.css";
import NavBarHeader from "../navbar/NavBarHeader";

function Header() {

  return (
    <header className={stylesHeader.headerDefault}>
        <NavBarHeader></NavBarHeader>
    </header>
  );
}
export default Header;
