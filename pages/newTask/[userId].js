import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from "next/router";

import css from "./newTask.module.css";

//-------------------------------------- recebe userID
export default function NewTask() {
  const [selectedFirm, setSelectedFirm] = useState({ value: "", label: "" });
  const [taskCont, setTaskCont] = useState([]);
  const [optionsList, setOptionsList] = useState([]); //Para o Select
  const [logedUser, setLogedUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getUser(router.query.userId);
      getFirms();
    }
  }, [router.isReady, router.query.userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTask = {
      ownerId: logedUser.id,
      content: taskCont,
      firmId: selectedFirm.value,
    };

    const apiRespSave = await fetch(`/api/task/create`, {
      method: "POST",
      ContentType: "application/json",
      body: JSON.stringify(newTask),
    });

    router.push(`/dashboard/${logedUser.id}`);
  };

  async function getUser(userId) {
    const apiResponse = await fetch(`/api/user/recoverId/?userId=${userId}`);
    const gotUser = await apiResponse.json();
    console.log("Got User", gotUser);
    setLogedUser(gotUser);
  }

  async function getFirms() {
    const apiResponse = await fetch("/api/firm/recAll");
    const firmsArray = await apiResponse.json();

    // Cria o array com 'value' e 'label' como exige o <Select/>
    const options = firmsArray.map((firm) => {
      return { value: firm.id, label: firm.name };
    });

    setOptionsList(options);
  }

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
          <div className={css.select_container}>
            <Select
              options={optionsList}
              placeholder="Choose a Firm"
              value={selectedFirm}
              onChange={handleSelect}
              isSearchable={true}
            />
          </div>
        </div>
        <div className={css.buttons}>
          <button className={css.submit_button} type="submit">
            Submit
          </button>
          <button
            type="button"
            className={css.cancel_button}
            onClick={() => router.push(`/dashboard/${logedUser.id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
