import TabManager from "@/components/base/tab-manager";
import React from "react";
import TabContentPending from "./tab-content-pending";
import TabContentMyComments from "./tab-content-my-comments";
import TabContentMyQuestions from "./content-my-questions";
function Comments() {
  const tabs = [
    // {
    //   id: "pending",
    //   label: "در انتظار ثبت دیدگاه",
    //   content: <TabContentPending />,
    // },
    {
      id: "my_comments",
      label: "دیدگاه‌های من",
      content: <TabContentMyComments />,
    },
    {
      id: "my_questions",
      label: "پرسش‌های من",
      content: <TabContentMyQuestions />,
    },
  ];

  return (
    <div className=" border rounded-md bg-white top-44">
      <TabManager
        tabs={tabs}
        defaultTab="my_comments"
        queryParamName="activeTab"
        backPath="/profile-user"
        HeadTapClass="flex p-4 items-center gap-2"
        iconSize={{ width: 24, height: 24 }}
      >
        نظر و دیدگاه
      </TabManager>
    </div>
  );
}

export default Comments;
