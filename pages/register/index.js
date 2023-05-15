import { useState } from "react";
import { useRouter } from "next/navigation";
import md5 from "md5";

import css from "./register.module.css";

//----------------------------------
export default function Register() {
  const [userName, setUserName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [modalPass, setModalPass] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [saved, setSaved] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let flagAllOK = true;

    const apiResponse = await fetch(`/api/user/recoverName/?name=${userName}`);
    const userExists = await apiResponse.json();

    if (userExists !== null) {
      // TODO impedir que reuse o botão submit
      flagAllOK = false;
      setModalUser(true);
    }

    if (password1 !== password2) {
      // TODO impedir que reuse o botão submit
      flagAllOK = false;
      setModalPass(true);
    }

    if (flagAllOK) {
      const newUser = {
        name: userName,
        password: md5(password1),
      };

      console.log(newUser);

      const apiRespSave = await fetch(`/api/user/create`, {
        method: "POST",
        ContentType: "application/json",
        body: JSON.stringify(newUser),
      });

      const userSaved = await apiRespSave.json();
      if (userSaved.id) {
        setSaved(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  };

  function reset() {
    setModalPass(false);
    setModalUser(false);
    router.push("/register");
  }

  return (
    <div className={css.container}>
      <main className={css.main}>
        <h1 className={css.title}>New User</h1>

        <p className={css.description}>Get started by registering</p>
        <div className={css.login_container}>
          <form className={css.input_form} onSubmit={handleSubmit}>
            <div className={css.form_group}>
              <label className={css.input_label} htmlFor="username">
                Username:
              </label>
              <input
                className={css.input_input}
                type="text"
                id="username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                required
              />
            </div>
            <div className={css.form_group}>
              <label htmlFor="password1">Password:</label>
              <input
                className={css.input_input}
                type="password"
                id="password1"
                value={password1}
                onChange={(event) => setPassword1(event.target.value)}
                required
              />
            </div>
            <div className={css.form_group}>
              <label htmlFor="password2">Confirm:</label>
              <input
                className={css.input_input}
                type="password"
                id="password2"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
                required
              />
            </div>
            <button className={css.submit_button} type="submit">
              Submit
            </button>
          </form>
        </div>

        {modalPass && (
          <div className={css.modal}>
            <h3>Passwords not equal !</h3>

            <div className={css.buttons}>
              <button className={css.submit_button} onClick={reset}>
                Try again
              </button>

              <button
                className={css.cancel_button}
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {modalUser && (
          <div className={css.modal}>
            <h3>Username already exists !</h3>

            <div className={css.buttons}>
              <button className={css.submit_button} onClick={reset}>
                Try again
              </button>

              <button
                className={css.cancel_button}
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {saved && (
          <div className={css.modal}>
            <h2>User saved successfully</h2>
          </div>
        )}
      </main>
    </div>
  );
}
