interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <div className="status-card error-card" role="alert">
      <span className="error-icon" aria-hidden="true">
        !
      </span>
      <div>
        <h2>Не удалось загрузить данные</h2>
        <p>{message}</p>
        <button type="button" onClick={onRetry}>
          Повторить запрос
        </button>
      </div>
    </div>
  );
}
