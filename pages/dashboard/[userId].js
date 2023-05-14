import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditModal from "../components/editModal";
import DelModal from "../components/delModal";

import css from "./dashboard.module.css";
import Card from "../components/card";

//------------------------------------- recebe user ID
export default function DashboardUser() {
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  //Tasks states
  const [delTaskContent, setDelTaskContent] = useState({});
  const [delTaskId, setDelTaskId] = useState({});
  const [editTask, setEditTask] = useState({});
  //User states
  const [logedUser, setLogedUser] = useState({});
  const [userTasks, setUserTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getUser(router.query.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.userId]);

  useEffect(() => {
    getTasks(logedUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editModal, delModal]);

  useEffect(() => {
    getTasks(logedUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  async function removeTask(taskId) {
    setDelTaskId(taskId);
    const content = userTasks.find((task) => task.id === taskId).content;
    setDelTaskContent(content);
    toggleDelModal(true);
  }

  async function getTasks() {
    const apiResponse = await fetch(`/api/task/recOneUser/?${logedUser.id}`);
    const tasksArray = await apiResponse.json();
    setUserTasks(tasksArray);
  }
  async function getUser(userId) {
    const apiResponse = await fetch(`/api/user/recoverId/?userId=${userId}`);
    const gotUser = await apiResponse.json();
    setLogedUser(gotUser);
  }

  return (
    <div className={css.container}>
      <h1>
        DashBoard of <span className={css.userName}>{logedUser.name}</span>
      </h1>
      {userTasks.map((task, index) => (
        <div className={css.wrapp_cards} key={index}>
          <div onClick={() => editingTask(task)}>
            <Card admin={false} content={task.content} date={task.updatedAt} />
          </div>
          <div
            onClick={() =>
              router.push(`/dashOneFirm/${logedUser.id}/${task.firmId}`)
            }
            className={css.firm}
          >
            {task.firm.name}
          </div>
          <button onClick={() => removeTask(task.id)} className={css.btn_del}>
            DELETE
          </button>
        </div>
      ))}
      <div className={css.buttons}>
        <button
          className={css.submit_button}
          onClick={() => router.push(`/newTask/${logedUser.id}`)}
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
