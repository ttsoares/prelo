import { useState } from "react";
import { useRouter } from "next/router";

import css from "./firm.module.css";

import firmsArray from "../api/json/firms.json";

//------------------------------
export default function Firm() {
  const [firmName, setFirmName] = useState("");

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const firmExists = firmsArray.find((firm) => firm.name === firmName);

    if (!firmExists) {
      saveData(firmName);
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
    </div>
  );
}

const saveData = async (firmName) => {
  const firmObj = {
    name: firmName,
  };

  const response = await fetch("/api/storeJSONFirms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(firmObj),
  });
};
