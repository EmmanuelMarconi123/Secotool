import style from "./Avatar.module.css";

const AvatarSm = ({toggle}) => {
  return (
    <div className={style.avatarSm} onClick={toggle}>
      <div className={style.iniciales}>
        <span>M</span>
        <span>G</span>
      </div>
    </div>
  );
};
export default AvatarSm;
