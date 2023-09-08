import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const statuses = {
  LOADING: "Loading...",
  OK: "OK",
  ERROR: "Error",
};

export function useFetch(URL, options = {}) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(statuses.LOADING);

  useEffect(() => {
    setStatus(statuses.LOADING);

    const fetchWithToken = async () => {
      try {
        const response = await fetch(URL, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
          },
        });

        if (!response.ok) {
          throw Error(response.statusText);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setStatus(statuses.OK);
      } catch (error) {
        setStatus(statuses.ERROR + " " + error);
      }
    };

    fetchWithToken();
  }, []);

  return { data, status };
}
