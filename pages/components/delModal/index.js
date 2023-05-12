import css from "./delModal.module.css";

//----------------------------------------------------
export default function DelModal({ content, taskId, closeModal }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/delTask/${taskId}`);
    closeModal();
  };

  return (
    <div className={css.modal}>
      <div className={css.overlay}></div>
      <div className={css.modal_content}>
        <h2>Remvove Task</h2>
        <form className={css.input_form} onSubmit={handleSubmit}>
          <div className={css.form_group}>
            <textarea
              readOnly
              className={css.input_text}
              rows="5"
              cols="100"
              id="task"
              value={content}
              required
            />
          </div>

          <div className={css.buttons}>
            <button className={css.submit_button} type="submit">
              Confirm
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
