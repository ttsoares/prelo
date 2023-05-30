import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import css from "./dashboard.module.css";
import Card from "/components/card";

import { BtnRegister, BtnCancel } from "../../components/button/buttons";

//-----------------------------------
export default function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const apiResponse = await fetch(`/api/task/recAll`);
    const tasksArray = await apiResponse.json();
    console.log(tasksArray);
    setAllTasks(tasksArray);
  }

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const role = localStorage.getItem("user");
    if (!role || role != "admin") logOut();
  }

  function logOut() {
    localStorage.removeItem("user");
    router.push("/");
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
        <BtnRegister fnc={() => router.push("/newFirm")}>New Firm</BtnRegister>

        <BtnCancel fnc={logOut}>Log Out</BtnCancel>
      </div>
    </>
  );
}
