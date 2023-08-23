import AvatarLg from "../../avatar/AvatarLg";
import style from "./Profile.module.css";

const Profile = () => {
    return(
        <section className={style.sectionProfile + " spacing-grid"}>
            <h3>Mi perfil</h3>
            <AvatarLg/>
            <h4>Marcelo Gonzalez</h4>
            <div className={style.containerInfo}>
                <div className={style.boxInfo}>
                    <span>Nombre</span>
                    <p>Marcelo</p>
                </div>
                <div className={style.boxInfo}>
                    <span>Apellido</span>
                    <p>Gonzalez</p>
                </div>
                <div className={style.boxInfo}>
                    <span>Email</span>
                    <p>marcegonzales@gmail.com</p>
                </div>
            </div>
        </section>
    );
};

export default Profile;