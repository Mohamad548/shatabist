"use client"; // تبدیل به کلاینت کامپوننت

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  [key: string]: string | number;
};

type FormProps = {
  fields?: {
    name?: string;
    label?: string;
    type?: "text" | "number" | "select";
    options?: { value: string | number; label: string }[];
  }[];
  onSubmit: SubmitHandler<FormData>;
};

const Form: React.FC<FormProps> = ({ fields = [], onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {fields.map((field) =>
        field.name ? (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            {field.type === "select" && field.options ? (
              <select
                id={field.name}
                {...register(field.name)}
                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type}
                {...register(field.name)}
                className="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            )}
          </div>
        ) : null,
      )}
      <button
        type="submit"
        className="px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
