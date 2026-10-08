import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorView } from "../components/ErrorView";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { serviceDetailsRequested } from "../store/servicesSlice";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

export function ServiceDetailsPage() {
  const dispatch = useAppDispatch();
  const serviceId = Number(useParams().id);
  const { data, error, loading } = useAppSelector(
    (state) => state.services.details,
  );

  useEffect(() => {
    dispatch(serviceDetailsRequested(serviceId));
  }, [dispatch, serviceId]);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={() => dispatch(serviceDetailsRequested(serviceId))}
      />
    );
  }
  if (!data) return null;

  return (
    <section>
      <Link className="back-link" to="/">
        ← Все услуги
      </Link>
      <article className="details-card">
        <span className="eyebrow">Услуга № {data.id}</span>
        <h1>{data.name}</h1>
        <p className="description">{data.content}</p>
        <div className="price-row">
          <span>Стоимость работы</span>
          <strong>{formatPrice(data.price)}</strong>
        </div>
      </article>
    </section>
  );
}
