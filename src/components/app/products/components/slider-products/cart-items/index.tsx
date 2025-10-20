import Image from "next/image";
import Link from "next/link";

type CartSliderProductsProps = {
  items: {
    id: number;
    name: string;
    image: string;
    description: string;
  };
};

function CartSliderProducts({ items }: CartSliderProductsProps) {
  return (
    <Link href="/products" className="flex gap-2 bg-gray-50 rounded-md">
      <div className="py-2 pr-4">
        <Image
          className="bg-gray-100 rounded-md"
          alt={items.name}
          width={80}
          height={80}
          src={items.image}
        />
      </div>
      <div className="flex flex-col py-[18px] pl-4">
        <p className="font-semibold text-base">{items.name}</p>
        <p className="font-normal text-gray-700 text-sm">{items.description}</p>
      </div>
    </Link>
  );
}

export default CartSliderProducts;
