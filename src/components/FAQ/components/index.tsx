'use client';
import { useGetFaq } from '@/components/app/profile-user/hooks';
import Accordion from '@/components/base/accordion';
import React from 'react';

export interface FaqTypeProps {
  id: number;
  title: string;
  content: string;
}

export interface FAQClientProps {
  initialData: FaqTypeProps[];
}

export default function FAQClient({ initialData }: FAQClientProps) {
  const { data, isPending } = useGetFaq();
  const faqs = data ?? initialData; // fallback به داده سرور

  return (
    <div className="mt-16 md:mx-10 lg:mx-72 space-y-5">
      <span className="font-Bold text-lg">سوالات متداول</span>

      {isPending || (faqs && faqs.length > 0) ? (
        faqs.map((item) => (
          <Accordion key={item.id} title={item.title}>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </Accordion>
        ))
      ) : (
        <p className="text-center text-gray-500">
          موردی برای نمایش وجود ندارد.
        </p>
      )}
    </div>
  );
}
