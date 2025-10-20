'use client';
import MenuItems from '@/components/layout/components/header/navbar/menu-items';
import ProductCategories from '@/components/layout/components/header/navbar/product-categories';

export default function NavItems() {
  return (
    <div className="hidden md:flex">
      <div className="flex gap-2">
        <div className="flex gap-5">
          <ProductCategories />
          <MenuItems />
        </div>
      </div>
    </div>
  );
}
