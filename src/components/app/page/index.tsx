"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getTimeAgo } from "@/utils/time";
import { BASE_URL } from "@/constants/url";

interface PageContentProps {
  initialData: any; // داده اصلی صفحه از SSG
  slug: string; // شناسه صفحه
}

export default function PageContent({ initialData, slug }: PageContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const page = initialData.page;

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Track active section for animations
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= windowHeight / 2) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initial reveal animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // انتخاب تصویر امن
  const imageUrl = page.thumbnail;
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${BASE_URL}${imageUrl}`
    : "/images/Products/default-product.webp";

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-secondary-500 to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Action Button - Share */}
      <div className="fixed left-6 bottom-6 z-40 flex flex-col gap-3">
        <button
          className="group relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-secondary-500 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-110 flex items-center justify-center overflow-hidden"
          style={{
            transform: `translateY(${scrollProgress > 10 ? "0" : "100px"})`,
            opacity: scrollProgress > 10 ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <svg
            className="w-6 h-6 text-white relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>

        <button
          className="group relative w-14 h-14 bg-gray-800 rounded-full shadow-2xl hover:shadow-gray-700/50 transition-all duration-500 hover:scale-110 flex items-center justify-center overflow-hidden border border-gray-700"
          style={{
            transform: `translateY(${scrollProgress > 10 ? "0" : "100px"})`,
            opacity: scrollProgress > 10 ? 1 : 0,
            transitionDelay: "50ms",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <svg
            className="w-6 h-6 text-white relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-emerald-400/20 to-secondary-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              transform: `translate(${mousePosition.x * (i % 3)}px, ${mousePosition.y * (i % 3)}px)`,
              transition: "transform 0.5s ease-out",
            }}
          />
        ))}
      </div>

      {/* Hero Section - Immersive */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Gradient Mesh */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-500/30 via-secondary-500/20 to-transparent rounded-full blur-3xl"
            style={{
              transform: `translate(${30 + mousePosition.x}%, ${-30 + mousePosition.y}%)`,
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-secondary-500/30 via-emerald-500/20 to-transparent rounded-full blur-3xl"
            style={{
              transform: `translate(${-30 - mousePosition.x}%, ${30 - mousePosition.y}%)`,
              transition: "transform 0.3s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Animated Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-full mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-gray-300 font-Medium">
              {getTimeAgo(page.createdAt)}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="text-sm text-gray-300 font-Medium">
              {Math.ceil(page.body?.length / 1000) || 3} دقیقه مطالعه
            </span>
          </div>

          {/* Epic Title with Gradient */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-8 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {page.title}
          </h1>

          {/* Subtitle/Description */}
          <p
            className={`text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-Medium mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            محتوایی استثنایی از شتا۲۰ - جایی که کیفیت و نوآوری در کنار هم قرار
            می‌گیرند
          </p>

          {/* Scroll Indicator */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex flex-col items-center gap-3">
              <span className="text-sm text-gray-500 font-Medium">
                ادامه مطلب
              </span>
              <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center p-2">
                <div className="w-1.5 h-3 bg-gradient-to-b from-emerald-500 to-transparent rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - Cinematic */}
      <div className="relative -mt-32 mb-24" data-section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            {/* 3D Card Effect */}
            <div
              className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-secondary-500/20 to-emerald-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60"
              style={{
                transform: `rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
              }}
            />

            <div
              className="relative bg-gray-800/50 backdrop-blur-2xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg)`,
              }}
            >
              <div className="relative h-[300px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={fullImageUrl}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={page.title}
                  quality={100}
                  priority
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Image Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-white font-Bold text-lg">
                        {page.title}
                      </p>
                      <p className="text-gray-300 text-sm font-Medium mt-1">
                        تصویر شاخص
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              <div className="bg-gradient-to-br from-emerald-500 to-secondary-500 rounded-2xl p-6 shadow-2xl min-w-[140px] transform hover:scale-110 hover:-translate-y-2 transition-all duration-500">
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">
                    {new Date(page.createdAt).getFullYear()}
                  </div>
                  <div className="text-xs text-white/80 font-Bold">
                    سال انتشار
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl min-w-[140px] transform hover:scale-110 hover:-translate-y-2 transition-all duration-500">
                <div className="text-center">
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-secondary-400 bg-clip-text text-transparent">
                    {Math.ceil(page.body?.length / 1000) || 3}
                  </div>
                  <div className="text-xs text-gray-400 font-Bold">
                    دقیقه مطالعه
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Magazine Style */}
      <div className="relative bg-white py-24" data-section ref={contentRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Article Content */}
            <div className="lg:col-span-8">
              {/* Article Intro */}
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300" />
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
                </div>
              </div>

              {/* The Content */}
              <article className="prose prose-lg max-w-none custom-page-content">
                <style jsx global>{`
                  .custom-page-content {
                    @apply text-gray-800 leading-relaxed font-regular;
                  }
                  .custom-page-content h1 {
                    @apply text-4xl font-black text-gray-900 mb-8 mt-16 leading-tight relative inline-block pb-4;
                  }
                  .custom-page-content h1::after {
                    content: "";
                    @apply absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-emerald-500 to-secondary-500 rounded-full;
                  }
                  .custom-page-content h2 {
                    @apply text-3xl font-black text-gray-900 mb-6 mt-12 leading-tight pr-6 border-r-4 border-emerald-500;
                  }
                  .custom-page-content h3 {
                    @apply text-2xl font-Bold text-gray-800 mb-5 mt-10;
                  }
                  .custom-page-content h4 {
                    @apply text-xl font-Bold text-gray-700 mb-4 mt-8;
                  }
                  .custom-page-content p {
                    @apply text-lg mb-6 leading-relaxed text-gray-700;
                  }
                  .custom-page-content p:first-of-type {
                    @apply text-xl leading-relaxed text-gray-900;
                  }
                  .custom-page-content p:first-of-type::first-letter {
                    @apply text-7xl font-black float-right mr-[-0.05em] ml-3 leading-none text-transparent bg-gradient-to-br from-emerald-500 to-secondary-500 bg-clip-text;
                  }
                  .custom-page-content ul {
                    @apply mr-8 mb-8 space-y-3 list-none;
                  }
                  .custom-page-content ul li {
                    @apply relative pr-6 text-gray-700 leading-relaxed;
                  }
                  .custom-page-content ul li::before {
                    content: "";
                    @apply absolute right-0 top-2.5 w-3 h-3 bg-gradient-to-br from-emerald-500 to-secondary-500 rounded-full shadow-lg shadow-emerald-500/30;
                  }
                  .custom-page-content ol {
                    @apply mr-8 mb-8 space-y-3 list-decimal list-inside;
                  }
                  .custom-page-content ol li {
                    @apply pr-2 text-gray-700 leading-relaxed;
                  }
                  .custom-page-content blockquote {
                    @apply relative border-r-4 border-secondary-500 bg-gradient-to-l from-gray-50 to-transparent pr-8 py-6 my-10 rounded-l-2xl text-gray-700 text-xl leading-relaxed font-Medium;
                  }
                  .custom-page-content a {
                    @apply text-emerald-600 font-Bold underline decoration-emerald-300 decoration-2 underline-offset-4 transition-all duration-300;
                  }
                  .custom-page-content a:hover {
                    @apply text-secondary-600 decoration-secondary-400;
                  }
                  .custom-page-content strong {
                    @apply text-gray-900 font-black;
                  }
                  .custom-page-content em {
                    @apply text-gray-600 italic;
                  }
                  .custom-page-content img {
                    @apply rounded-3xl shadow-2xl shadow-gray-900/10 my-12 w-full border-4 border-white ring-1 ring-gray-200;
                  }
                  .custom-page-content hr {
                    @apply my-16 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent;
                  }
                  .custom-page-content table {
                    @apply w-full my-10 border-collapse rounded-2xl overflow-hidden shadow-xl;
                  }
                  .custom-page-content table thead {
                    @apply bg-gradient-to-r from-emerald-500 to-secondary-500;
                  }
                  .custom-page-content table thead tr th {
                    @apply p-4 text-right font-black text-white;
                  }
                  .custom-page-content table tbody tr {
                    @apply border-b border-gray-200 bg-white transition-colors;
                  }
                  .custom-page-content table tbody tr:hover {
                    @apply bg-gray-50;
                  }
                  .custom-page-content table tbody tr td {
                    @apply p-4 text-gray-700;
                  }
                  .custom-page-content code {
                    @apply bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-sm font-Bold border border-emerald-200;
                  }
                  .custom-page-content pre {
                    @apply bg-gray-900 text-gray-100 p-8 rounded-2xl overflow-x-auto my-8 shadow-2xl border border-gray-800;
                  }
                  .custom-page-content pre code {
                    @apply bg-transparent text-gray-100 p-0 border-0;
                  }
                `}</style>
                <div
                  className="
                    custom-content
                    text-gray-700 
                    leading-relaxed 
                    font-regular
                    [&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-12 [&>h1]:pb-4 [&>h1]:border-b-2 [&>h1]:border-emerald-200
                    [&>h2]:text-3xl [&>h2]:font-Bold [&>h2]:text-gray-800 [&>h2]:mb-5 [&>h2]:mt-10 [&>h2]:flex [&>h2]:items-center [&>h2]:gap-3
                    [&>h2]:before:content-[''] [&>h2]:before:w-1.5 [&>h2]:before:h-8 [&>h2]:before:bg-gradient-to-b [&>h2]:before:from-emerald-500 [&>h2]:before:to-secondary-500 [&>h2]:before:rounded-full
                    [&>h3]:text-2xl [&>h3]:font-Bold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h3]:mt-8
                    [&>h4]:text-xl [&>h4]:font-Medium [&>h4]:text-gray-700 [&>h4]:mb-3 [&>h4]:mt-6
                    [&>p]:text-base [&>p]:mb-6 [&>p]:leading-8 [&>p]:text-justify
                    [&>ul]:mr-6 [&>ul]:mb-6 [&>ul]:space-y-2
                    [&>ul>li]:relative [&>ul>li]:pr-4 [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:right-0 [&>ul>li]:before:top-3 [&>ul>li]:before:w-2 [&>ul>li]:before:h-2 [&>ul>li]:before:bg-emerald-500 [&>ul>li]:before:rounded-full
                    [&>ol]:mr-6 [&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:list-decimal
                    [&>ol>li]:pr-2 [&>ol>li]:marker:text-emerald-500 [&>ol>li]:marker:font-Bold
                    [&>blockquote]:border-r-4 [&>blockquote]:border-secondary-500 [&>blockquote]:bg-gray-50 [&>blockquote]:pr-6 [&>blockquote]:py-4 [&>blockquote]:my-8 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:rounded-l-lg
                    [&>a]:text-emerald-500 [&>a]:font-Medium [&>a]:underline [&>a]:decoration-emerald-200 [&>a]:underline-offset-4 [&>a]:transition-all [&>a]:duration-300 hover:[&>a]:text-secondary-500 hover:[&>a]:decoration-secondary-500
                    [&>strong]:text-gray-900 [&>strong]:font-Bold
                    [&>em]:text-gray-600
                    [&>img]:rounded-2xl [&>img]:shadow-emerald [&>img]:my-8 [&>img]:w-full
                    [&>hr]:my-12 [&>hr]:border-0 [&>hr]:h-px [&>hr]:bg-gradient-to-r [&>hr]:from-transparent [&>hr]:via-gray-300 [&>hr]:to-transparent
                    [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse
                    [&>table>thead]:bg-gray-50 [&>table>thead>tr>th]:p-4 [&>table>thead>tr>th]:text-right [&>table>thead>tr>th]:font-Bold [&>table>thead>tr>th]:text-gray-700 [&>table>thead>tr>th]:border-b-2 [&>table>thead>tr>th]:border-emerald-200
                    [&>table>tbody>tr]:border-b [&>table>tbody>tr]:border-gray-200 [&>table>tbody>tr>td]:p-4 [&>table>tbody>tr>td]:text-gray-600
                    [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-Medium [&>code]:text-emerald-600
                    [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:shadow-lg
                    [&>pre>code]:bg-transparent [&>pre>code]:text-gray-100 [&>pre>code]:p-0
                  "
                  dangerouslySetInnerHTML={{ __html: page.body }}
                />
              </article>

              {/* Article End Decoration */}
              <div className="mt-20 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <div
                  className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Info Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-black text-gray-900">نکته مهم</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm font-Medium">
                    این محتوا توسط تیم شتا۲۰ با دقت و تخصص تهیه شده است. برای
                    اطلاعات بیشتر با ما در تماس باشید.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    اطلاعات سریع
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-Medium">
                        تاریخ انتشار
                      </span>
                      <span className="text-sm font-Bold text-gray-900">
                        {new Date(page.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600 font-Medium">
                        زمان مطالعه
                      </span>
                      <span className="text-sm font-Bold text-gray-900">
                        {Math.ceil(page.body?.length / 1000) || 3} دقیقه
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600 font-Medium">
                        پیشرفت مطالعه
                      </span>
                      <span className="text-sm font-Bold text-emerald-600">
                        {Math.round(scrollProgress)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-secondary-500 rounded-2xl p-6 shadow-lg text-white">
                  <h3 className="font-black mb-4">اشتراک‌گذاری</h3>
                  <p className="text-white/90 text-sm mb-4 font-Medium leading-relaxed">
                    این محتوا را با دوستان خود به اشتراک بگذارید
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-3 rounded-lg transition-all duration-300 text-sm font-Bold flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      توییتر
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-3 rounded-lg transition-all duration-300 text-sm font-Bold flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                      فیسبوک
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-3 rounded-lg transition-all duration-300 text-sm font-Bold flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      لینکدین
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-3 rounded-lg transition-all duration-300 text-sm font-Bold flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      واتساپ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - Stunning */}
      <div className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-500/20 to-secondary-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            آیا این محتوا برایتان مفید بود؟
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-Medium max-w-2xl mx-auto leading-relaxed">
            برای دریافت جدیدترین مطالب، محصولات و اخبار شتا۲۰ با ما همراه باشید
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="group relative bg-gradient-to-r from-emerald-500 to-secondary-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-500 flex items-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span className="relative z-10">محتوای عالی</span>
            </button>

            <button className="group relative bg-gray-800 text-white px-10 py-4 rounded-2xl font-black text-lg border-2 border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <svg
                className="w-6 h-6 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="relative z-10">اشتراک‌گذاری</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
