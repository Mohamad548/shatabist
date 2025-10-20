import { Dropdown } from "@/components/base/dropdown";
import Input from "@/components/base/input";
import { useColorStore } from "@/stores/colorStore";
import clsxm from "@/utils/clsxm";
import React from "react";

function CheckInstallment() {
  const { selectedPrice } = useColorStore();

  const installmentStatus = false;
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-Bold ">محاسبه اقساط</h3>
      <hr />

      <div className="font-medium text-sm flex justify-between">
        <h3 className="text-gary-80">اعتبار سنجی</h3>
        <h3
          className={clsxm(
            "",
            installmentStatus ? "text-primary-500" : "text-success-500"
          )}
        >
          {installmentStatus ? "اعتبار سنجی شده" : "اعتبار سنجی نشده"}
        </h3>
      </div>
      <div className="font-medium text-sm flex justify-between">
        <h3 className="text-gary-80">مبلغ خرید</h3>
        <h3 className="">{selectedPrice} تومانء</h3>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <Input
          label={<>پیش پرداخت</>}
          classNameLabel="text-sm font-medium"
          parentClassName="flex flex-col-reverse gap-2"
          inputClassName=" border border-gray-300 rounded-md py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <Dropdown
          label="تعداد اقساط"
          items={[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ]}
          name="installments"
          classNameLabel="text-sm "
          required={true}
          classNameBody="mt-2"
        />
      </div>
    </div>
  );
}

export default CheckInstallment;
