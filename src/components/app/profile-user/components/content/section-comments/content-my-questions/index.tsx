"use client";

import QuestionCard from "@/components/app/product/components/product-description/question-tab/question-card";
import { useGetQuestionsComment } from "@/components/app/profile-user/hooks";
import React from "react";

const TabContentMyQuestions: React.FC = () => {
  const { data } = useGetQuestionsComment();
  const { questions } = data || {};
  return (
    <div className="flex flex-col gap-4 p-4">
      {questions?.map((item: any) => (
        <div key={item.id}>
          <QuestionCard
            key={item.id}
            content={item.content}
            createdAt={item.createdAt}
            questionAnswers={item.questionAnswers}
          />
        </div>
      ))}
    </div>
  );
};

export default TabContentMyQuestions;
