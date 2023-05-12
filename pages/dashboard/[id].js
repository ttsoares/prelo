import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditModal from "../components/editModal";
import DelModal from "../components/delModal";

import css from "./dashboard.module.css";
import Card from "../components/card";

//TODO Muda isso para buscar na API
import usersArray from "../api/json/users.json";
import tasksArray from "../api/json/tasks.json";
import firmsArray from "../api/json/firms.json";

//-------------------------------------
export default function DashboardID() {
  const [ownerId, setOwnerId] = useState(0);
  const [ownerName, setOwnerName] = useState("");
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
      const sentOwnerId = router.query.id;
      setOwnerId(sentOwnerId);
      const foundOwnerName = allUsers.find(
        (task) => Number(task.id) === Number(sentOwnerId)
      ).name;

      setOwnerName(foundOwnerName);
    }
  }, [allUsers, router.isReady, router.query.id]);

  useEffect(() => {
    getTasks();
  }, [editModal, delModal]);

  useEffect(() => {
    getTasks();
  }, []);

  const tasksOwned = allTasks.filter(
    (task) => Number(task.owner) === Number(ownerId)
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
          <div
            onClick={() => router.push(`/dashOneFirm/${ownerId}/${task.firm}`)}
            className={css.firm}
          >
            {task.firm}
          </div>
          <button onClick={() => removeTask(task.id)} className={css.btn_del}>
            DELETE
          </button>
        </div>
      ))}
      <div className={css.buttons}>
        <button
          className={css.submit_button}
          onClick={() => router.push(`/newTask/${ownerId}`)}
        >
          New Task
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
