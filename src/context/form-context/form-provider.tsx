// 'use client';
// import React, { useState } from 'react';
// import { FormContext } from './form-context';
// import { FormContextType } from './types';

// export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [formData, setFormData] = useState<FormContextType>({
//     paymentMethod: '',
//     installments: '',
//     selectedGateway: '',
//     amount: 0,
//   });

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };
