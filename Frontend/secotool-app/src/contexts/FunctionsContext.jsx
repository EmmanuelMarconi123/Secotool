import { createContext, useContext, useState } from "react";

const FunctionContext = createContext();

export const FunctionProvider = ({ children }) => {

    const [ user, setUser] = useState(false);

    const fetchUser = async (token) => {
        try {
          const response = await fetch(
            "http://localhost:8080/v1/api/users/getMe",
            {
              method: 'GET',
              headers: {
                'Authorization': `${token}`
              }
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


  return (
    <FunctionContext.Provider value={{ fetchUser, user }}>
      {children}
    </FunctionContext.Provider>
  );
};

export const useFunction = () => {
  return useContext(FunctionContext);
};