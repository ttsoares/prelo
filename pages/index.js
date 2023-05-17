import { useState } from "react";
import { useRouter } from "next/navigation";
import md5 from "md5";

import Image from "next/image";
import logo from "/public/imgs/logo2.png";
import Head from "next/head";
import css from "../styles/Home.module.css";

//-------------------------------
export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiResponse = await fetch(`/api/user/recoverName/?name=${userName}`);
    const userExists = await apiResponse.json();

    const hashInput = md5(password);

    if (userExists.user === null || userExists.password !== hashInput) {
      setModal(true);
      setTimeout(() => {
        setModal(false);
      }, 3000);
    } else {
      if (userExists.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push(`/dashboard/${userExists.id}`);
      }
    }
  };

  return (
    <div className={css.container}>
      <Head>
        <title>WSSystem</title>
        <meta name="WiSperS " content="Home made my TT$" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css.main}>
        <h1 className={css.title}>
          Welcome to{" "}
          <a href="https://www.linkedin.com/company/wsssecurity/">WhiSperS!</a>
        </h1>

        <p className={css.description}>Get started by loging in</p>
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
              <label htmlFor="password">Password:</label>
              <input
                className={css.input_input}
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button className={css.input_button} type="submit">
              Submit
            </button>
          </form>
        </div>
        <button
          onClick={() => router.push("/register")}
          className={css.register_button}
          type="submit"
        >
          Register
        </button>
        <Image className={css.logo} src={logo} alt="Logo" />
        {modal && (
          <div className={css.modal}>
            <h2>User name or password incorrect</h2>
          </div>
        )}
      </main>
    </div>
  );
}
