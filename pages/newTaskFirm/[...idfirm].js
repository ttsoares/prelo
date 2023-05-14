import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import css from "./newTaskFirm.module.css";

//-------------------------------------- receive userID & firmName
export default function NewTarkFirm() {
  const [taskCont, setTaskCont] = useState([]);
  const [selectedFirm, setSelectedFirm] = useState({});
  const [logedUser, setLogedUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getUser(router.query.idfirm[0]); // uer ID
      getFirm(router.query.idfirm[1]); // firm name
    }
  }, [router.isReady, router.query.idfirm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTask = {
      ownerId: logedUser.id,
      content: taskCont,
      firm: selectedFirm.id,
    };
    router.push(`/dasOneFirm/${logedUser.id}/${selectedFirm.name}`);
  };

  async function getUser(userId) {
    const apiResponse = await fetch(`/api/user/recoverId/?userId=${userId}`);
    const gotUser = await apiResponse.json();
    setLogedUser(gotUser);
  }

  async function getFirm(firmName) {
    const apiResponse = await fetch(`/api/firm/recName/?firmName=${firmName}`);
    const gotFirm = await apiResponse.json();
    setSelectedFirm(gotFirm);
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
          <div className={css.firmName}>{selectedFirm.name}</div>
        </div>
        <div className={css.buttons}>
          <button className={css.submit_button} type="submit">
            Submit
          </button>
          <button
            type="button"
            className={css.cancel_button}
            onClick={() =>
              router.push(`/dashOneFirm/${logedUser.id}/${selectedFirm.name}`)
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
