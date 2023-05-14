import { useState } from "react";
import { useRouter } from "next/router";
import css from "./firm.module.css";

//------------------------------
export default function Firm() {
  const [firmName, setFirmName] = useState("");
  const [saved, setSaved] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiResponse = await fetch(`/api/firm/recName/?firmName=${firmName}`);
    const firmExists = await apiResponse.json();

    if (!firmExists) {
      const newFirm = { name: firmName };

      const apiRespSave = await fetch(`/api/firm/create`, {
        method: "POST",
        ContentType: "application/json",
        body: JSON.stringify(newFirm),
      });

      const firmSaved = await apiRespSave.json();
      if (firmSaved.id) {
        setSaved(true);
        setTimeout(() => {}, 3000);
      }
      setSaved(false);
    }
    router.push(`/dashboard/`);
  };

  return (
    <div className={css.container}>
      <form className={css.input_form} onSubmit={handleSubmit}>
        <div className={css.form_group}>
          <label className={css.input_label} htmlFor="firmname">
            Firm Name:
          </label>
          <input
            className={css.input_input}
            type="text"
            id="firmname"
            value={firmName}
            onChange={(event) => setFirmName(event.target.value)}
            required
          />
        </div>
        <div className={css.buttons}>
          <button className={css.submit_button} type="submit">
            Submit
          </button>
          <button
            className={css.cancel_button}
            type="button"
            onClick={() => router.push(`/dashboard/`)}
          >
            Cancel
          </button>
        </div>
      </form>
      {saved && (
        <div className={css.modal}>
          <h2>Firm saved successfully</h2>
        </div>
      )}
    </div>
  );
}
