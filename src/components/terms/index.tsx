'use client';
import React from 'react';
import Accordion from '../base/accordion';
import { useGetTerms } from '../app/profile-user/hooks';
interface Term {
  id: number;
  title: string;
  content: string;
}
interface TermsProps {
  initialTerms: Term[];
}
export default function Terms({ initialTerms }: TermsProps) {
  const { data, isPending } = useGetTerms();
  const terms = data ?? initialTerms;
  return (
    <div className="mt-16 md:mx-10 lg:mx-72 space-y-5">
      <h1 className="font-Bold text-2xl mb-5">قوانین و مقررات</h1>

      {isPending || (terms && terms.length > 0) ? (
        terms.map((item) => (
          <Accordion key={item.id} title={item.title}>
            <div
              className="text-gray-700 leading-8 text-justify"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
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
