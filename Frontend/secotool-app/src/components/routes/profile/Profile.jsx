import { useEffect, useState } from "react";
import AvatarLg from "../../avatar/AvatarLg";
import style from "./Profile.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const Profile = () => {
  const { user, setUser } = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/v1/api/users/getMe",
          {
            headers: {
              Authorization: `${token}`
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log(data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  });

  return (
    <section className={style.sectionProfile + " spacing-grid"}>
      <h3>Mi perfil</h3>
      <AvatarLg />
      <h4>{user.firstName + " " + user.lastName}</h4>
      <div className={style.containerInfo}>
        <div className={style.boxInfo}>
          <span>Nombre</span>
          <p>{user.firstName}</p>
        </div>
        <div className={style.boxInfo}>
          <span>Apellido</span>
          <p>{user.lastName}</p>
        </div>
        <div className={style.boxInfo}>
          <span>Email</span>
          <p>{user.username}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
