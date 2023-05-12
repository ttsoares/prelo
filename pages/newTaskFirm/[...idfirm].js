import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/router";

import css from "./newTaskFirm.module.css";

//TODO Muda isso para buscar na API
import usersArray from "../api/json/users.json";
import tasksArray from "../api/json/tasks.json";
import firmsArray from "../api/json/firms.json";

//-------------------------------------- recebe userID e firmName
export default function NewTarkFirm() {
  const [taskCont, setTaskCont] = useState([]);
  const [ownerId, setOwnerId] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [selectedFirm, setSelectedFirm] = useState("");
  const [allTasks, setAllTasks] = useState(tasksArray);
  const [allUsers, setAllUsers] = useState(usersArray);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const userId = Number(router.query.idfirm[0]);

      const foundOwnerName = allUsers.find((user) => user.id == userId).name;

      setOwnerId(userId);
      setOwnerName(foundOwnerName);

      const firmName = router.query.idfirm[1];
      setSelectedFirm(firmName);
    }
  }, [router.isReady, allUsers, router.query.idfirm]);

  const taskDate = new Date().toLocaleDateString("pt-BR");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: 0,
      owner: ownerId,
      content: taskCont,
      date: taskDate,
      firm: selectedFirm,
    };

    saveData(newTask);
    router.push(`/dashboard/${ownerId}`);
  };

  function handleSelect(data) {
    setSelectedFirm(data);
  }

  return (
    <div className={css.container}>
      <h1>Task Description</h1>
      <form className={css.input_form} onSubmit={handleSubmit}>
        <div className={css.form_group}>
          <textarea
            className={css.input_text}
            rows="5"
            cols="100"
            id="task"
            value={taskCont}
            onChange={(event) => setTaskCont(event.target.value)}
            required
          />
          <div>{selectedFirm}</div>
        </div>
        <div className={css.buttons}>
          <button className={css.submit_button} type="submit">
            Submit
          </button>
          <button
            type="button"
            className={css.cancel_button}
            onClick={() => router.push(`/dashboard/${ownerId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const saveData = async (newTask) => {
  const response = await fetch("/api/storeJSONTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
};
