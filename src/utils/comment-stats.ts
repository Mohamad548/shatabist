export interface CommentImage {
  id: number;
  imageUrl: string;
  commentId: number;
  createdAt: string;
}

export interface Comment {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  rate: number;
  commment_images: CommentImage[];
}

export function getCommentStats(comments: Comment[]) {
  if (!Array.isArray(comments) || comments.length === 0) {
    return {
      averageRate: 0,
      imageIds: [],
      totalComments: 0,
    };
  }

  const totalRate = comments.reduce((sum, c) => sum + c.rate, 0);
  const averageRate = Math.round((totalRate / comments.length) * 100) / 100;

  const imageIds = comments.flatMap(
    (c) => c.commment_images?.map((img) => img.id) ?? [],
  );

  return {
    averageRate,
    imageIds,
    totalComments: comments.length,
  };
}
