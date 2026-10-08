import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorView } from "../components/ErrorView";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { servicesRequested } from "../store/servicesSlice";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

export function ServicesPage() {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector(
    (state) => state.services.list,
  );

  useEffect(() => {
    dispatch(servicesRequested());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={() => dispatch(servicesRequested())}
      />
    );
  }

  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">Сервисный центр</span>
        <h1>Наши услуги</h1>
        <p>Выберите услугу, чтобы узнать подробности и стоимость.</p>
      </div>
      <ul className="service-list">
        {data.map((service) => (
          <li key={service.id}>
            <Link className="service-link" to={`/${service.id}/details`}>
              <span>{service.name}</span>
              <strong>{formatPrice(service.price)}</strong>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
