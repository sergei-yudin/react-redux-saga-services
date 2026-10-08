import spinnerImage from "../assets/spinner.png";

export function Spinner() {
  return (
    <div className="status-card" role="status" aria-live="polite">
      <img className="spinner" src={spinnerImage} alt="Загрузка" />
      <p>Загружаем данные…</p>
    </div>
  );
}
