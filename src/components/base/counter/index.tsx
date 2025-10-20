// import clsxm from "@/utils/clsxm";
// import React, { useEffect } from "react";
// import useCounterStore from "@/stores/useCounterStore";

// interface CounterProps {
//   initialValue?: number;
//   maxQuantity?: number;
//   onChange?: (value: number) => void;
//   className?: string;
// }

// const Counter: React.FC<CounterProps> = ({
//   initialValue,
//   maxQuantity = Infinity, // Set default to Infinity if not provided
//   onChange,
//   className,
// }) => {

//   const { count, increase, decrease, setCount } = useCounterStore(); // use setCount

//   // Handle initial value only once

//   // Increase function with maxQuantity handling
//   const handleIncrease = () => {
//     if (count < maxQuantity) {
//       setCount(count + 1); // Update the count state directly
//       if (onChange) onChange(count + 1); // Pass updated count to onChange
//     }
//   };

//   // Decrease function
//   const handleDecrease = () => {
//     const valueToCompare = initialValue ?? 1;
//     if (count > valueToCompare) {
//       setCount(count - 1);
//       if (onChange) onChange(count - 1);
//     }
//   };

//   useEffect(() => {
//     setCount(initialValue ?? 1); // Set the initial count value only once
//   }, [initialValue, setCount]);

//   return (
//     <div
//       className={clsxm("flex relative flex-col items-center md:mb-2", className)}
//     >
//       <div className="flex justify-center px-1 py-1 items-center border rounded-md border-gray-200">
//         <span
//           className="border-2 w-5 h-5 justify-center border-black items-center rounded-md flex my-1 cursor-pointer select-none hover:bg-primary-100/20 transition-all"
//           onClick={handleIncrease}
//         >
//           +
//         </span>
//         <h3 className="rounded-xl py-1 w-5 text-sm h-5 flex items-center justify-center select-none text-primary-500 px-3">
//           {count}
//         </h3>
//         <span
//           className="border-2 w-5 h-5 justify-center border-black items-center rounded-md flex cursor-pointer select-none hover:bg-primary-100/20 transition-all"
//           onClick={handleDecrease}
//         >
//           -
//         </span>
//       </div>

//       {maxQuantity === initialValue ? (
//         <p className="text-[10px] text-green-500 absolute whitespace-nowrap md:-bottom-5 md:-left-32 left-24 -bottom-4">
//           حداقل و حداکثر فروش قابل انتخاب رسیده است
//         </p>
//       ) : (
//         <>
//           {count >= maxQuantity && (
//             <p className="text-[10px] text-red-500 absolute whitespace-nowrap -bottom-5 -left-20">
//               حداکثر فروش قابل انتخاب رسیده است
//             </p>
//           )}

//           {initialValue !== undefined &&
//             count <= initialValue &&
//             count !== 1 && (
//               <p className="text-[10px] text-red-500 absolute whitespace-nowrap -bottom-5 -left-20">
//                 حداقل فروش قابل انتخاب رسیده است
//               </p>
//             )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Counter;
