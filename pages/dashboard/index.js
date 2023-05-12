import { useRouter } from "next/navigation";

import css from "./dashboard.module.css";
import Card from "../components/card";

import tasksArray from "../api/json/tasks.json";
import usersArray from "../api/json/users.json";

//-----------------------------------
export default function Dashboard() {
  tasksArray.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c;
  });

  const router = useRouter();

  const tasksWithNames = tasksArray.map((task) => {
    const user = usersArray.find(
      (user) => Number(user.id) === Number(task.owner)
    );
    if (user.id > 0) {
      return { ...task, ownerName: user.name };
    }
  });

  return (
    <>
      <div className={css.container}>
        <h1>DashBoard All Tasks</h1>

        {tasksWithNames.map((task, index) => {
          return (
            <Card
              admin={true}
              key={index}
              userName={task.ownerName}
              content={task.content}
              date={task.date}
              sudo={() => router.push(`/dashboard/${task.owner}`)}
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
