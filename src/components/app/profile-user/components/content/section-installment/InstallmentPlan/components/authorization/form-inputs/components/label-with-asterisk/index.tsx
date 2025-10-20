// components/Authorization/LabelWithAsterisk.tsx
import React from "react";

const LabelWithAsterisk = ({ text }: { text: string }) => (
  <div className="flex gap-1">
    <h3 className="font-medium text-sm text-gray-700">{text}</h3>
    <h3 className="text-red-500">*</h3>
  </div>
);

export default LabelWithAsterisk;
