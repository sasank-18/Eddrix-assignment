import { useEffect, useState } from "react";
import { FetchData } from "../constant";

const useFetchUserData = () => {

  const [data, setData] = useState();

  const fetchUserData = async () => {
    const data = await fetch(FetchData);
    const json = await data.json();
    setData(json)
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  
return data;

}

export default useFetchUserData