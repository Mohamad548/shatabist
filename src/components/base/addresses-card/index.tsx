import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import {
  ActionAddress,
  DeleteBtnAddress,
} from '@/components/app/profile-user/components/base/profile-modals';
import { AddressType } from '@/constants/mock-data/profile';
import OpenLayersMap from '../map';

interface AddressesCardProps {
  address: AddressType; // Type for address
  orderDetail?: boolean; // Type for orderDetail (optional)
  classNameContent?: string; // Type for classNameContent (optional)
  onClick?: () => void; // Optional onClick prop
  addressCompany?: boolean;
  btnDelete?: boolean;
  title?: string;
  containerClassName?: string;
  mapHeight?: string;
  mapWidth?: string;
  tempSelectedAddress?: AddressType;
  // Controls for rendering selection badge explicitly
  showSelectionBadge?: boolean;
  isSelected?: boolean;
}

function AddressesCard({
  address,
  orderDetail,
  classNameContent,
  onClick,
  tempSelectedAddress,
  showSelectionBadge,
  isSelected,
  addressCompany = false,
  btnDelete = true,
  title,
  containerClassName,
  mapHeight = '100%',
  mapWidth = '250px',
}: AddressesCardProps) {
  // Determine selected state; prefer explicit prop, fallback to tempSelectedAddress for backward compatibility
  const computedIsSelected =
    typeof isSelected === 'boolean'
      ? isSelected
      : tempSelectedAddress?.id === address.id;
  const shouldShowBadge = Boolean(showSelectionBadge);
  return (
    <div
      className={clsxm('relative col-span-2', classNameContent)}
      onClick={onClick}
    >
      <div className={clsxm(' z-10 ', containerClassName)}>
        <OpenLayersMap
          className="w-full md:w-96 h-48"
          locked={true}
          popupText={address?.title}
          initialLat={address?.lat}
          initialLng={address?.long}
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <h3 className="font-Medium text-sm text-gray-800">{address?.title}</h3>
        <h3 className="font-Medium text-sm text-gray-800">
          آدرس ارسال : {address?.province?.name}، {address?.city?.name}،{' '}
          {address?.hood}، پلاک {address?.pelak}، واحد {address?.vahed}
        </h3>
        <div className="flex flex-col gap-4 w-">
          <div className="flex gap-3 items-center">
            <div className="relative h-4 w-4">
              <Image
                src={
                  addressCompany
                    ? '/svg/profile/map.svg'
                    : '/svg/profile/profile.svg'
                }
                fill
                style={{ objectFit: 'contain' }}
                alt="Profile Icon"
                quality={100}
              />
            </div>
            <h3 className="font-regular text-xs text-gray-500">
              {addressCompany
                ? `کد پستی : ${address?.postalCode}`
                : ` تحویل گیرنده : ${address?.receiverFullName}`}
            </h3>
          </div>

          <div className="flex gap-3 items-center">
            <div className="relative h-4 w-4">
              <Image
                src="/svg/profile/call.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Phone Icon"
                quality={100}
              />
            </div>
            <h3 className="font-regular text-xs text-gray-500">
              {addressCompany
                ? 'شماره تلفن گیرنده: 021443030'
                : `شماره تماس : ${address?.receiverPhoneNumber}`}
            </h3>
          </div>

          {!addressCompany && (
            <div className="flex gap-3 items-center">
              <div className="relative h-4 w-4">
                <Image
                  src="/svg/profile/map.svg"
                             fill
    style={{ objectFit: "contain" }}
                  alt="Postal Code Icon"
                  quality={100}
                />
              </div>
              <h3 className="font-regular text-xs text-gray-500">
                کد پستی : {address?.postalCode}
              </h3>
            </div>
          )}
        </div>
        {!orderDetail ? (
          <div className=" flex gap-6 font-Medium text-gray-700 items-center">
            <ActionAddress
              editMode={true}
              addressID={address?.id}
              className=" w-full md:w-1/2 md:h-4/5 "
            />
            {btnDelete ? <DeleteBtnAddress addressID={address?.id} /> : ''}
          </div>
        ) : (
          ''
        )}
      </div>

      {shouldShowBadge && computedIsSelected && (
        <div className="absolute hidden md:flex top-3 left-3 w-6 h-6 bg-emerald-500 rounded-full items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default AddressesCard;
