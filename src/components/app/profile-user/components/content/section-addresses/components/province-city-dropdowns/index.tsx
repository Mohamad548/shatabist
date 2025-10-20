import {
  useGetCities,
  useGetProvince,
} from "@/components/app/profile-user/hooks";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

const ProvinceCityDropdowns = ({
  address,
  editMode,
}: {
  address: any;
  editMode: boolean;
}) => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(
    editMode ? (address?.userAddress?.province_id ?? null) : null,
  );
  const [selectedCity, setSelectedCity] = useState<number | null>(
    editMode ? (address?.userAddress?.city_id ?? null) : null,
  );

  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const {
    data: provinces,
    isPending: isProvincesPending,
    error: provincesError,
  } = useGetProvince();
  const {
    data: cities,
    isPending: isCitiesPending,
    error: citiesError,
  } = useGetCities(selectedProvince || 0); // ارسال عدد به جای رشته

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const provinceId = event.target.value ? Number(event.target.value) : null; // تبدیل به عدد
    setSelectedProvince(provinceId);
    setValue("province_id", provinceId); // ارسال عدد به react-hook-form
    clearErrors("province_id");
    setSelectedCity(null); // وقتی استان عوض می‌شود، شهر باید صفر شود
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value ? Number(event.target.value) : null; // تبدیل به عدد
    setSelectedCity(cityId); // ذخیره انتخاب شهر
    setValue("city_id", cityId); // ارسال عدد به react-hook-form
    clearErrors("city_id");
  };

  useEffect(() => {
    // در صورتی که ویرایش باشد، مقدار شهر باید به مقدار آدرس تنظیم شود
    if (editMode && address?.userAddresses?.[0]?.city_id) {
      setSelectedCity(address.userAddresses[0].city_id);
    }
  }, [editMode, address]);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full text-sm mb-2 px-2">
      {provincesError && <p>خطا در بارگذاری استان‌ها</p>}
      {citiesError && <p>خطا در بارگذاری شهرها</p>}

      {/* استان */}
      <div className="flex flex-col gap-2 md:w-1/2 relative">
        <label htmlFor="province-select">
          انتخاب استان <strong className="text-red-500 mr-1">*</strong>
        </label>
        <select
          {...register("province_id", {
            required: "لطفاً یک استان انتخاب کنید",
          })}
          className="border border-gray-300 rounded-md py-1.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          id="province-select"
          value={
            selectedProvince ??
            (editMode ? (address?.userAddresses?.[0]?.province_id ?? "") : "")
          }
          onChange={handleProvinceChange}
          disabled={isProvincesPending}
        >
          <option value="">لطفاً یک استان انتخاب کنید</option>
          {Array.isArray(provinces?.provinces) &&
            provinces.provinces.map((province: Province) => (
              <option key={province.id} value={province.id.toString()}>
                {province.name}
              </option>
            ))}
        </select>

        {errors.province_id && (
          <p className="text-red-500 absolute -bottom-5 text-xs">
            {String(errors.province_id.message)}
          </p>
        )}
      </div>

      {/* شهر */}
      <div className="flex flex-col gap-2 md:w-1/2 relative">
        <label htmlFor="city-select">
          انتخاب شهر <strong className="text-red-500 mr-1">*</strong>
        </label>
        <select
          {...register("city_id", { required: "لطفاً یک شهر انتخاب کنید" })}
          className="border border-gray-300 rounded-md py-1.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
          id="city-select"
          disabled={isCitiesPending || selectedProvince === null}
          onChange={handleCityChange}
          value={selectedCity ?? ""}
        >
          {!selectedProvince ? null : isCitiesPending ? (
            <option value="">در حال بارگیری...</option>
          ) : (
            <option value="">لطفاً شهر را انتخاب کنید</option>
          )}
          {Array.isArray(cities?.cities) &&
            cities.cities.map((city: City) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}
              </option>
            ))}
        </select>
        {errors.city_id && (
          <p className="text-red-500 absolute -bottom-5 text-xs">
            {String(errors.city_id.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProvinceCityDropdowns;
