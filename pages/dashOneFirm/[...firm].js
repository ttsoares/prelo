import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditModal from "../components/editModal";
import DelModal from "../components/delModal";

import css from "./oneFirm.module.css";
import Card from "../components/card";

//TODO Muda isso para buscar na API
import usersArray from "../api/json/users.json";
import tasksArray from "../api/json/tasks.json";
import firmsArray from "../api/json/firms.json";

// É o dashboard para uma só firma
//------------------------------------- recebe userId e firmName
export default function DashOneFirm() {
  const [ownerId, setOwnerId] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [selectedFirm, setSelectedFirm] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [delTaskContent, setDelTaskContent] = useState({});
  const [delTaskId, setDelTaskId] = useState({});
  const [editTask, setEditTask] = useState({});
  const [allTasks, setAllTasks] = useState(tasksArray);
  const [allUsers, setAllUsers] = useState(usersArray);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const userId = Number(router.query.firm[0]);

      const foundOwnerName = allUsers.find(
        (user) => Number(user.id) === Number(userId)
      ).name;
      setOwnerName(foundOwnerName);
      setOwnerId(userId);

      const firmName = router.query.firm[1];
      setSelectedFirm(firmName);
    }
  }, [allUsers, router.isReady, router.query.firm]);

  useEffect(() => {
    getTasks();
  }, [editModal, delModal]);

  useEffect(() => {
    getTasks();
  }, []);

  const tasksOwned = allTasks.filter(
    (task) => Number(task.owner) === ownerId && task.firm === selectedFirm
  );

  tasksOwned.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c;
  });

  function toggleEditModal() {
    setEditModal(!editModal);
  }

  function editingTask(task) {
    setEditTask(task);
    toggleEditModal();
  }

  function toggleDelModal() {
    setDelModal(!delModal);
  }
  function removeTask(taskId) {
    setDelTaskId(taskId);
    setDelTaskContent(
      allTasks.find((task) => Number(task.id) === Number(taskId)).content
    );
    toggleDelModal(true);
  }

  async function getTasks() {
    await fetch("/api/storeJSONTasks")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllTasks(data);
      });
  }

  return (
    <div className={css.container}>
      <h1>
        DashBoard of <span className={css.userName}>{ownerName}</span>
      </h1>
      {tasksOwned.map((task, index) => (
        <div className={css.wrapp_cards} key={index}>
          <div onClick={() => editingTask(task)}>
            <Card admin={false} content={task.content} date={task.date} />
          </div>
          <div className={css.firm}>{selectedFirm}</div>
          <button onClick={() => removeTask(task.id)} className={css.btn_del}>
            DELETE
          </button>
        </div>
      ))}
      <div className={css.buttons}>
        <button
          className={css.submit_button}
          onClick={() => router.push(`/newTaskFirm/${ownerId}/${selectedFirm}`)}
        >
          New Task
        </button>
        <button
          className={css.back_button}
          onClick={() => router.push(`/dashboard/${ownerId}`)}
        >
          Back
        </button>
        <button className={css.cancel_button} onClick={() => router.push("/")}>
          Log Out
        </button>
      </div>

      {editModal && (
        <EditModal
          content={editTask.content}
          task={editTask}
          closeModal={toggleEditModal}
        />
      )}
      {delModal && (
        <DelModal
          content={delTaskContent}
          taskId={delTaskId}
          closeModal={toggleDelModal}
        />
      )}
    </div>
  );
}
