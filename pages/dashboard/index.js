import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import css from "./dashboard.module.css";
import Card from "/components/card";

//-----------------------------------
export default function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const router = useRouter();

  async function getTasks() {
    const apiResponse = await fetch(`/api/task/recAll`);
    const tasksArray = await apiResponse.json();
    setAllTasks(tasksArray);
  }

  return (
    <>
      <div className={css.container}>
        <h1>DashBoard All Tasks</h1>
        {allTasks.map((task, index) => {
          return (
            <Card
              admin={true}
              key={index}
              userName={task.owner.name}
              content={task.content}
              date={task.updatedAt}
              sudo={() => router.push(`/dashboard/${task.ownerId}`)}
            />
          );
        })}
      </div>
      <div className={css.buttons}>
        <button
          className={css.submit_button}
          onClick={() => router.push("/newFirm")}
        >
          Firms
        </button>
        <button className={css.cancel_button} onClick={() => router.push("/")}>
          Log Out
        </button>
      </div>
    </>
  );
}
