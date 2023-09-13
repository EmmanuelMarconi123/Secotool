import { Message, Toggle, toaster } from "rsuite";
import styles from "./UsersAdminCard.module.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";

const UsersAdminCard = ({ selectedUser, getData }) => {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const message = (
    <Message showIcon type="success" closable>
      El rol se ha actualizado exitosamente
    </Message>
  );

  async function handleRole() {
    return {
      ...selectedUser,
      userRole: selectedUser.userRole === "USER" ? "ADMIN" : "USER"
    };
  }

  const updateAdminRole = async () => {
    const updatedUserBody = await handleRole();

    console.log("soy updated user", updatedUserBody);

    try {
      const response = await axios.post(
        `${globalVariable}/v1/api/users/admin/${selectedUser.id}/${updatedUserBody.userRole}`,
        updatedUserBody,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);
      toaster.push(message, { placement: "bottomStart", duration: 5000 });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <span>{selectedUser.id}</span>
      <span>
        {selectedUser.firstName}, {selectedUser.lastName}
      </span>
      <Toggle
        size="md"
        checkedChildren="ADMIN"
        unCheckedChildren="USER"
        checked={selectedUser.userRole === "ADMIN"}
        onChange={updateAdminRole}
        arial-label="Switch"
      />
    </div>
  );
};

export default UsersAdminCard;
