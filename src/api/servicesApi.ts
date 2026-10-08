import type { ServiceDetails, ServiceSummary } from "../types/service";

const API_URL = "http://localhost:7070/api";

const demoServices: ServiceDetails[] = [
  {
    id: 1,
    name: "Замена стекла",
    price: 21000,
    content: "Стекло оригинал от Apple",
  },
  {
    id: 2,
    name: "Замена дисплея",
    price: 25000,
    content: "Дисплей оригинал от Foxconn",
  },
  {
    id: 3,
    name: "Замена аккумулятора",
    price: 4000,
    content: "Новый аккумулятор ёмкостью 4000 mAh",
  },
  {
    id: 4,
    name: "Замена микрофона",
    price: 2500,
    content: "Оригинальный микрофон от Apple",
  },
];

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText || `Ошибка сервера: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function getDemoServices(): Promise<ServiceSummary[]> {
  await wait(700);
  return demoServices.map(({ id, name, price }) => ({ id, name, price }));
}

async function getDemoService(id: number): Promise<ServiceDetails> {
  await wait(700);
  const service = demoServices.find((item) => item.id === id);
  if (!service) {
    throw new Error("Услуга не найдена");
  }
  return service;
}

export function fetchServices(): Promise<ServiceSummary[]> {
  return import.meta.env.PROD
    ? getDemoServices()
    : request<ServiceSummary[]>("/services");
}

export function fetchServiceDetails(id: number): Promise<ServiceDetails> {
  return import.meta.env.PROD
    ? getDemoService(id)
    : request<ServiceDetails>(`/services/${id}`);
}
