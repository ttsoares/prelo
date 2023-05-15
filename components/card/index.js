import css from "./card.module.css";

export default function Card({ content, date, userName = "", sudo, admin }) {
  //const dateShort = String(date).slice(0, -8);
  //const dateShort = String(date).slice(0, -8);

  const dateShort = new Date(date).toLocaleString().slice(0, -6);
  //.toLocaleString()

  return (
    <div className={css.wrapper}>
      {admin ? (
        <div onClick={sudo} className={css.username}>
          {userName}
        </div>
      ) : (
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      )}
      <div className={css.content}>{content}</div>
      <div className={css.date}>{dateShort}</div>
    </div>
  );
}
