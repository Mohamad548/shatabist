"use client";
import React from "react";
import { Shipping } from "./components/shipping";
import { FormProvider, useForm } from "react-hook-form";

function ShippingInfo() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Shipping />
    </FormProvider>
  );
}

export default ShippingInfo;
