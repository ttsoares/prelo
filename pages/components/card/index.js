import css from "./card.module.css";

export default function Card({ content, date, userName = "", sudo, admin }) {
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
      <div className={css.date}>{date}</div>
    </div>
  );
}
