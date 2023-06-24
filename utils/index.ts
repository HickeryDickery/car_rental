import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, fuel, limit, year } = filters;

  const headers = {
    "X-RapidAPI-Key": "e2d6c7e32cmshd0abace0ec9d712p1dc358jsn0bd08886877b",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();
  return result;
}

export const CalculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const milageFactor = 0.1;
  const ageFactor = 0.05;

  const milageRate = city_mpg * milageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalPerDay = basePricePerDay + milageRate + ageRate;

  return rentalPerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
