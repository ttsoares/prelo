import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditModal from "../components/editModal";
import DelModal from "../components/delModal";

import css from "./oneFirm.module.css";
import Card from "../components/card";

// Dashboard to one user and one firm
//-------------------------------- get user ID and firm ID
export default function DashOneFirm() {
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  //Tasks states
  const [delTaskContent, setDelTaskContent] = useState({});
  const [delTaskId, setDelTaskId] = useState({});
  const [editTask, setEditTask] = useState({});
  //User states
  const [logedUser, setLogedUser] = useState({});
  const [userTasks, setUserTasks] = useState();
  const [usrIdTaskId, setUsrIdTaskId] = useState({});
  // Firm state
  const [selectedFirm, setSelectedFirm] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const usrId = router.query.firm[0];
      const tskId = router.query.firm[1];
      const obj = { userId: usrId, firmId: tskId };
      setUsrIdTaskId(obj);

      async function getData() {
        const user = await getUser(usrId);
        setLogedUser(user);
        const firm = await getFirm(tskId);
        console.log(firm, "<<<<<<<");
        setSelectedFirm(firm);
        const tasks = await getTasks(obj);
        setUserTasks(tasks);
      }

      getData();
    }
  }, [router.isReady, router.query.firm]);

  // useEffect(() => {
  //   getTasks(usrIdTaskId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [editModal, delModal]);

  // useEffect(() => {
  //   getTasks(usrIdTaskId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
    setDelTaskContent(userTasks.find((task) => task.id === taskId).content);
    toggleDelModal(true);
  }

  async function getTasks(obj) {
    const apiResponse = await fetch(`/api/task/recUserFirm`, {
      method: "PATCH",
      ContentType: "application/json",
      body: JSON.stringify(obj),
    });
    const tasksArray = await apiResponse.json();
    setUserTasks(tasksArray);
    return tasksArray;
  }

  async function getUser(userId) {
    const apiResponse = await fetch(`/api/user/recoverId/?userId=${userId}`);
    const gotUser = await apiResponse.json();
    return gotUser;
  }

  async function getFirm(firmId) {
    const apiResponse = await fetch(`/api/firm/recId/?firmId=${firmId}`);
    const gotFirm = await apiResponse.json();
    console.log("----------", gotFirm);
    return gotFirm;
  }

  if (!Array.isArray(userTasks) || selectedFirm === undefined) return;

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
            <div className={css.firm}>{selectedFirm.name}</div>
            <button onClick={() => removeTask(task.id)} className={css.btn_del}>
              DELETE
            </button>
          </div>
        ))}
      <div className={css.buttons}>
        <button
          className={css.submit_button}
          onClick={() =>
            router.push(`/newTaskFirm/${logedUser.id}/${selectedFirm.name}`)
          }
        >
          New Task
        </button>
        <button
          className={css.back_button}
          onClick={() => router.push(`/dashboard/${logedUser.id}`)}
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
