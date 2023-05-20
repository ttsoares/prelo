import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import css from "./newTaskFirm.module.css";

import { BtnInput, BtnCancel } from "../../components/button/buttons";
//-------------------------------------- receive user ID & firm name
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

  async function handleSubmit(event) {
    event.preventDefault();
    const newTask = {
      ownerId: logedUser.id,
      content: taskCont,
      firmId: selectedFirm.id,
    };

    await fetch(`/api/task/create`, {
      method: "POST",
      ContentType: "application/json",
      body: JSON.stringify(newTask),
    });

    router.push(`/dashOneFirm/${logedUser.id}/${selectedFirm.id}`);
  }

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
          <BtnInput type="submit">Submit</BtnInput>

          <BtnCancel
            fnc={() =>
              router.push(`/dashOneFirm/${logedUser.id}/${selectedFirm.id}`)
            }
          >
            Cancel
          </BtnCancel>
        </div>
      </form>
    </div>
  );
}
