// components/ArticleCard.js
import Image from "next/image";

const AuthorArticleCards = ({ article, isGridView }: any) => {
  const { image, category, title, description, authorImage, authorName, date } =
    article;

  return (
    <div
      className={`p-2 gap-4 cursor-pointer grid transition-all hover:shadow-lg hover:bg-gray-50 ${
        isGridView ? "grid-cols-1" : "grid-cols-3 grid-rows-1 border-b-2"
      }`}
    >
      <Image
        src={image}
        alt={title}
        width={300}
        height={0}
        className={`rounded-md w-full ${
          isGridView ? "" : "col-span-1 col-start-1 order-1"
        }`}
      />
      <div
        className={`flex flex-col ${
          isGridView ? "gap-4" : "col-span-2 order-2 justify-evenly"
        }`}
      >
        <h2
          className={` bg-secondary-100/30 text-primary-500 font-Bold px-3 py-1 rounded-lg w-fit text-sm ${
            isGridView ? "text-gray-500" : "hidden md:block"
          }`}
        >
          {category}
        </h2>
        <h3 className={`font-bold text-sm md:text-lg ${isGridView ? "" : ""}`}>
          {title}
        </h3>
        <p
          className={`text-sm leading-5 line-clamp-2 ${
            isGridView ? "text-gray-700 " : "hidden md:line-clamp-2"
          }`}
        >
          {description}
        </p>
        <div className="flex items-center gap-2">
          <Image
            src={authorImage}
            alt={authorName}
            width={40}
            height={0}
            className={`rounded-full h-10 ${
              isGridView ? "hidden md:block" : "hidden md:block"
            }`}
          />
          <div className="text-xs text-gray-500 border-l-2 pl-2">
            {authorName}
          </div>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorArticleCards;

// حالت 1 با فلکس
/* return (
  <div className="p-2 flex flex-col gap-2 transform transition duration-300 hover:scale-100 hover:shadow-lg">
    <Image
      src={image}
      alt={title}
      width={300}
      height={0}
      className="rounded-md w-full"
    />
    <div className="flex flex-col gap-4">
      <h2 className="text-sm">{category}</h2>
      <h3 className="font-Bold">{title}</h3>
      <p className="text-xs leading-5">{description}</p>
      <div className="flex items-center gap-2">
        <Image
          src={authorImage}
          alt={authorName}
          width={40}
          height={0}
          className="rounded-full h-10 hidden md:block"
        />
        <div className="text-xs text-gray-500 border-l-2 pl-2">
          {authorName}
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </div>
  </div>
); */

// حالت 2 با گرید
/* <div className="p-2 gap-2 grid grid-cols-3 grid-rows-1 border-b-2">
<Image
  src={image}
  alt={title}
  width={300}
  height={0}
  className="rounded-md w-full col-span-1 col-start-3 order-2"
/>
<div className="grid col-span-2 order-1">
  <h2 className="text-sm hidden md:block">{category}</h2>
  <h3 className="font-Bold">{title}</h3>
  <p className="text-xs leading-5 hidden md:block">{description}</p>
  <div className="flex items-center gap-2">
    <Image
      src={authorImage}
      alt={authorName}
      width={40}
      height={0}
      className="rounded-full h-10 hidden md:block"
    />
    <div className="text-xs text-gray-500 border-l-2 pl-2">
      {authorName}
    </div>
    <span className="text-xs text-gray-500">{date}</span>
  </div>
</div>
</div> */

// حالت 1 با گرید
// return (
//   <div className="p-2 grid grid-cols-1 gap-2">
//     <Image
//       src={image}
//       alt={title}
//       width={600}
//       height={400}
//       className="rounded-md w-full"
//     />
//     <div className="flex flex-col gap-4">
//       <h2 className="text-sm text-gray-500">{category}</h2>
//       <h3 className="font-bold text-lg">{title}</h3>
//       <p className="text-xs leading-5 text-gray-700">{description}</p>
//       <div className="flex items-center gap-2">
//         <Image
//           src={authorImage}
//           alt={authorName}
//           width={40}
//           height={40}
//           className="rounded-full h-10 hidden md:block"
//         />
//         <div className="text-xs text-gray-500 border-l-2 pl-2">
//           {authorName}
//         </div>
//         <span className="text-xs text-gray-500">{date}</span>
//       </div>
//     </div>
//   </div>
// );

// stracture
// ساختارهای کوچک با flex
// ساختارهای بزرگ تر با grid
