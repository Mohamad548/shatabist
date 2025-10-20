import { ActionAddress } from "@/components/app/profile-user/components/base/profile-modals";
import { useGetAddress } from "@/components/app/profile-user/hooks";
import AddressesCard from "@/components/base/addresses-card";
import ManageModal from "@/components/base/modal";
import { AddressType } from "@/constants/mock-data/profile";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function AddressForm({
  onAddressSelect,
}: {
  onAddressSelect: (address: AddressType) => void;
}) {
  const methods = useForm();
  const { data } = useGetAddress();
  // const addresses = data?.userAddresses || [];
  const addresses = useMemo(
    () => data?.userAddresses || [],
    [data?.userAddresses]
  );

  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null
  );
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<AddressType | null>(null);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
      setTempSelectedAddress(addresses[0]);
      onAddressSelect(addresses[0]);
    }
  }, [addresses, selectedAddress, onAddressSelect]);

  const handleSelectAddress = (address: AddressType) => {
    setTempSelectedAddress(address);
  };

  const handleAddressSelection = () => {
    if (tempSelectedAddress) {
      setSelectedAddress(tempSelectedAddress);
      onAddressSelect(tempSelectedAddress);
    }
  };

  return (
    <div className="flex flex-col gap-6 border z-50 rounded-md p-6  shadow-sm">
      <div className="flex justify-between ">
        <h3 className="font-Bold text-base text-gray-800">
          ارسال مرسوله به «{selectedAddress?.title}»
        </h3>
        {addresses.length > 0 && (
          <ManageModal
            selectedAddress={selectedAddress}
            setTempSelectedAddress={setTempSelectedAddress}
            modalBodyClass="grid-col rounded-none md:rounded-md relative gap-4 w-full md:w-1/2 h-screen md:h-3/4 md:mb-0 grid-cols-2 pb-20 md:pb-4"
            actionLabel="انتخاب"
            cancelLabel={
              <div className="max-h absolute w-5 h-5 left-5 top-5 ">
                <Image
                  src="/svg/profile/close-circle.svg"
                  alt="close-modal"
                  width={25}
                  height={25}
                />
              </div>
            }
            actionBtnClass="bg-emerald-500 w-full text-white font-Bold py-2 px-4 rounded-md hover:bg-emerald-500/90"
            actionBoxClass=" row-start-4 flex items-center"
            triggerContent={
              <div className="flex gap-2 items-center cursor-pointer">
                <h3 className="text-emerald-500 font-semibold text-xs md:text-base">
                  تغییر یا ویرایش آدرس
                </h3>
                <div className="relative h-4 w-4 ">
                  <Image
                    src="/svg/arrow-left-green.svg"
                  fill
    style={{ objectFit: "contain" }}
                    alt="location-add"
                    quality={50}
                  />
                </div>
              </div>
            }
            onConfirm={(closeModal) => {
              handleAddressSelection();
              closeModal(); // بستن مودال بعد از انتخاب آدرس
            }}
            moodCheckout={true}
            className="fixed inset-0 z-40"
          >
            <h3 className="text-sm row-start-1">
              لطفا آدرس خود را انتخاب کنید.
            </h3>
            <div className="flex items-center justify-between row-start-4 ">
              <div className="w-full">
                <FormProvider {...methods}>
                  <ActionAddress editMode={false} />
                </FormProvider>
              </div>
            </div>
            <FormProvider {...methods}>
              <div className="overflow-y-auto max-h-4/5 flex flex-col gap-5 px-2 row-start-2 col-span-2">
                {data?.userAddresses.map((address: AddressType) => (
                  <AddressesCard
                    showSelectionBadge={true}
                    isSelected={tempSelectedAddress?.id === address.id}
                    key={address.id}
                    address={address}
                    title={address.title}
                    classNameContent={clsxm(
                      "flex flex-col md:flex-row gap-6 py-3 rounded-md px-4 border-2 cursor-pointer",
                      tempSelectedAddress?.id === address.id
                        ? "border-emerald-500"
                        : ""
                    )}
                    onClick={() => handleSelectAddress(address)}
                    btnDelete={false}
                    mapHeight="100%"
                    mapWidth="100%"
                    containerClassName=" w-full md:w-1/2 h-full "
                  />
                ))}
              </div>
            </FormProvider>
          </ManageModal>
        )}
      </div>
      {selectedAddress ? (
        <AddressesCard
          showSelectionBadge={true}
          isSelected={true}
          address={selectedAddress}
          classNameContent="flex flex-col md:flex-row gap-6 justify-center md:justify-start items-center lg:items-start border-2 border-green-500 py-4 px-3 rounded-xl shadow-lg"
          orderDetail={true}
          mapHeight="100%"
          mapWidth="100%"
          containerClassName="w-full md:w-2/5 h-full "
        />
      ) : addresses.length > 0 ? (
        <AddressesCard
          showSelectionBadge={true}
          isSelected={true}
          address={addresses[0]}
          classNameContent="flex gap-6 justify-center lg:justify-start  items-center lg:items-start flex-col sm:flex-row md:flex-col lg:flex-row"
          orderDetail={true}
          mapHeight="100%"
          mapWidth="100%"
          containerClassName="w-full h-full"
        />
      ) : (
        <FormProvider {...methods}>
          <ActionAddress editMode={false} />
        </FormProvider>
      )}
    </div>
  );
}

export default AddressForm;
