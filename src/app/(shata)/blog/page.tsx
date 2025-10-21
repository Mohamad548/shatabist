import dynamic from "next/dynamic";

const Blog = dynamic(() => import("@/components/blog/components"), {
	ssr: false,
});

function BlogPage() {
	return <Blog />;
}

export default BlogPage;


