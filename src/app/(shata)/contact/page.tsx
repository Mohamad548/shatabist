
import React from 'react';
import type { Metadata } from 'next';
import Contact from '@/components/contact/components';

export const metadata: Metadata = {
  title: "تماس با ما | شتا۲۰، واردکننده رسمی موبایل و لوازم دیجیتال",
  description: "راه‌های ارتباطی با شتا۲۰. آدرس، شماره تلفن، ایمیل و شبکه‌های اجتماعی ما برای دریافت پشتیبانی و مشاوره تخصصی در زمینه خرید موبایل و لوازم دیجیتال.",
  keywords: "تماس با ما, آدرس شتا, شماره تماس شتا, ایمیل شتا, پشتیبانی شتا",
};

function ContactPage() {
  return <Contact />;
}

export default ContactPage;
