import dynamic from "next/dynamic";
import React from "react";

const BlogDetail = dynamic(() => import("@/components/blogDetail/components"), {
	ssr: false,
});

function BlogDetailPage() {
	return <BlogDetail />;
}

export default BlogDetailPage;
