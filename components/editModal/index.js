import { useState } from "react";

import css from "./editModal.module.css";

//----------------------------------------------------
export default function EditModal({ content, task, closeModal }) {
  const [editContent, setEditContent] = useState(content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const editedTask = {
      taskId: task.id,
      content: editContent,
    };

    const apiRespUpdt = await fetch(`/api/task/update`, {
      method: "PUT",
      ContentType: "application/json",
      body: JSON.stringify(editedTask),
    });

    closeModal();
  };

  return (
    <div className={css.modal}>
      <div className={css.overlay}></div>
      <div className={css.modal_content}>
        <h2>Edit Task</h2>
        <form className={css.input_form} onSubmit={handleSubmit}>
          <div className={css.form_group}>
            <textarea
              className={css.input_text}
              rows="5"
              cols="100"
              id="task"
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
              required
            />
          </div>

          <div className={css.buttons}>
            <button className={css.submit_button} type="submit">
              Submit
            </button>
            <button
              type="button"
              className={css.cancel_button}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
