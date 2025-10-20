export interface SubCategory {
  id?: number;
  name?: string;
  slug?: string;
}

export interface Child {
  id?: number;
  name?: string;
  title?: string;
  slug?: string;
  icon?: string;
  slugcat?: string;
  subCategory?: SubCategory[];
}

export interface CategoryType {
  id?: number;
  title?: string;
  slug?: string;
  name?: string;
  icon?: string;
  slugcat?: string;
  parentId?: number | null;
  children?: Child[];
  subCategory?: SubCategory[];
}

export const mapBackendData = (categories: CategoryType[] = []) => {
  if (!categories.length) return [];
  const mobileCategory = categories.find(
    (category) => category.slug == "mobile",
  );
  const mobileSubCategories =
    mobileCategory?.children?.map((sub) => ({
      id: sub.id,
      name: sub.title,
      icon: sub.icon,
      slug: sub.slug,
      slugcat: mobileCategory.slug,
      subCategory:
        sub.subCategory?.map((child) => ({
          id: child.id,
          name: child.name,
        })) || [],
    })) || [];

  const otherCategories = categories
    .filter(
      (category) => category.parentId === null && category.slug !== "mobile",
    )
    .map((category) => ({
      id: category.id,
      name: category.title,
      slug: category.slug,
      icon: category.icon,
      subCategory:
        category.children?.map((sub) => ({
          id: sub.id,
          name: sub.title,
          slug: sub.slug,
        })) || [],
    }));

  return [...mobileSubCategories, ...otherCategories];
};
