"use client";
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Payment from './components/payment'

function PaymentInfo() {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <Payment />
    </FormProvider>
  )
}

export default PaymentInfo