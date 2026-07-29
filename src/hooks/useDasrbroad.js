import { useEffect, useState } from "react";
import { getToDoLists, getUsers } from "../services/todolist.service";

const useDasrbroad = () => {
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todoRes = await getToDoLists(254);
        const userRes = await getUsers();
        setData(todoRes?.data?.todos || []);
        setTotalUsers(userRes?.data?.total || 0);
      } catch (error) {
        console.error("Không thể tải dữ liệu dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, totalUsers, loading };
};

export default useDasrbroad;
