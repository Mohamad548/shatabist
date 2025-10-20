import TabManager from "@/components/base/tab-manager";
import React from "react";
import TabContentWishlist from "@/components/app/profile-user/components/content/section-my-lists/tab-content-wishlist/index";
import TabContentShoppingLists from "@/components/app/profile-user/components/content/section-my-lists/tab-content-shopping-lists/index";

function MyList() {
  const tabs = [
    {
      id: "wishlist",
      label: "لیست علاقه‌مندی‌ها",
      content: <TabContentWishlist />,
    },
    {
      id: "shopping_lists",
      label: "لیست‌های خرید",
      content: <TabContentShoppingLists />,
    },
  ];
  return (
    <div className="border rounded-md bg-white top-44">
      <TabManager
        tabs={tabs}
        defaultTab="wishlist"
        queryParamName="activeTab"
        backPath="/profile-user/dashboard"
        HeadTapClass="flex p-4 items-center gap-2"
        iconSize={{ width: 24, height: 24 }}
      >
        <h3 className="text-lg">لیست‌های من</h3>
      </TabManager>
    </div>
  );
}

export default MyList;
