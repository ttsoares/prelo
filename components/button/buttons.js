export function BtnCancel({ type = "button", children, fnc }) {
  return (
    <button className="cancel_button" type={type} onClick={fnc}>
      {children}
    </button>
  );
}

export function BtnRegister({ type = "button", children, fnc }) {
  return (
    <button className="register_button" type={type} onClick={fnc}>
      {children}
    </button>
  );
}

export function BtnInput({ type = "button", children, fnc }) {
  return (
    <button className="input_button" type={type} onClick={fnc}>
      {children}
    </button>
  );
}
