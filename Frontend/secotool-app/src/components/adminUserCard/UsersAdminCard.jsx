import { Toggle } from "rsuite";
import styles from "./UsersAdminCard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const UsersAdminCard = ({ selectedUser,getData }) => {
  const [newUserBody, setNewUserBody] = useState(selectedUser);

  const handleRole = () => {
    console.log("handleRole called with role:", selectedUser.userRole);
    console.log("selected user:", newUserBody);
  
    if (selectedUser.userRole=== "USER") {
      setNewUserBody({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        userRole: "ADMIN"
      });
    } else {
      setNewUserBody({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        userRole: "USER"
      });
    }
  };

  const updateAdminRole = async () => {

    axios
      .post(
        `http://localhost:8080/v1/api/users/admin/${selectedUser.id}/${newUserBody.userRole}`,
        newUserBody
      )
      .then(function (response) {
        console.log(response);
        getData()
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(()=>{
    updateAdminRole()
  },[newUserBody])

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
        onChange={handleRole}
        arial-label="Switch"
      />
    </div>
  );
};

export default UsersAdminCard;
