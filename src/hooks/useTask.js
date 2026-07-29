import { useEffect, useState } from "react";
import { getToDoLists } from "../services/todolist.service";

const useTask = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getToDoLists(254);
      //   console.log("res: ", res);
      setData(res.data ?? []);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    setData,
    setPagination,
    pagination,
    loading,
  };
};

export default useTask;
