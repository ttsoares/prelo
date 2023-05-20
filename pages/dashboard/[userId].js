import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditModal from "/components/editModal";
import DelModal from "/components/delModal";

import css from "./dashboard.module.css";
import Card from "/components/card";

import { BtnInput, BtnCancel } from "../../components/button/buttons";

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
  const [usrIdTaskId, setUsrIdTaskId] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const usrId = router.query.userId;
      setUsrIdTaskId(usrId);

      async function getData() {
        const user = await getUser(usrId);
        setLogedUser(user);
        const tasks = await getTasks(user.id);
        setUserTasks(tasks);
      }

      getData();
    }
  }, [router.isReady, router.query.userId]);

  useEffect(() => {
    getTasks(usrIdTaskId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editModal, delModal]);

  async function toggleEditModal() {
    setEditModal(!editModal);
    return;
  }
  function editingTask(task) {
    setEditTask(task);
    toggleEditModal();
    return;
  }

  function toggleDelModal() {
    setDelModal(!delModal);
    return;
  }
  async function removeTask(taskId) {
    setDelTaskId(taskId);
    setDelTaskContent(userTasks.find((task) => task.id === taskId).content);
    toggleDelModal(true);
  }

  async function getTasks(user_Id) {
    const apiResponse = await fetch(`/api/task/recOneUser/?userId=${user_Id}`);

    const tasksArray = await apiResponse.json();
    setUserTasks(tasksArray);
    return tasksArray;
  }

  async function getUser(userId) {
    const apiResponse = await fetch(`/api/user/recoverId/?userId=${userId}`);
    const gotUser = await apiResponse.json();
    return gotUser;
  }

  if (!Array.isArray(userTasks) || logedUser === undefined) return;
  <h1>Loading... User</h1>;

  return (
    <div className={css.container}>
      <h1>
        DashBoard of <span className={css.userName}>{logedUser.name}</span>
      </h1>
      {Array.isArray(userTasks) &&
        userTasks.map((task, index) => (
          <div className={css.wrapp_cards} key={index}>
            <div onClick={() => editingTask(task)}>
              <Card
                admin={false}
                content={task.content}
                date={task.updatedAt}
              />
            </div>
            <div
              onClick={() =>
                router.push(`/dashOneFirm/${logedUser.id}/${task.firmId}`)
              }
              className={css.firm}
            >
              {task.firm.name}
            </div>

            <BtnCancel fnc={() => removeTask(task.id)}>DELETE</BtnCancel>
          </div>
        ))}

      <div className={css.buttons}>
        <BtnInput fnc={() => router.push(`/newTask/${logedUser.id}`)}>
          New Task
        </BtnInput>
        <BtnCancel fnc={() => router.push("/")}>Log Out</BtnCancel>
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
