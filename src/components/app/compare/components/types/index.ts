// Core types for the compare system
export interface CompareProduct {
  id: number;
  title: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  imageUrl?: string;
  features: Record<string, string>;
}

export interface CompareProps {
  initialProductId?: string;
}

export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: CompareProduct) => void;
  excludeIds: number[];
}

export interface ProductGridProps {
  products: CompareProduct[];
  onRemoveProduct: (productId: number) => void;
  onAddProductClick: () => void;
  canAddMore: boolean;
  maxProducts: number;
  hoveredProduct: number | null;
  setHoveredProduct: (id: number | null) => void;
}

export interface FeaturesTableProps {
  products: CompareProduct[];
  featureKeys: string[];
  canAddMore: boolean;
}

export interface ActionButtonsProps {
  products: CompareProduct[];
  onClearAll: () => void;
}

export interface CompareHeaderProps {
  productsCount: number;
  maxProducts: number;
}

// API Integration types
export interface APIProduct {
  id: number;
  title?: string;
  name?: string;
  price?: number;
  finalPrice?: number;
  originalPrice?: number;
  regularPrice?: number;
  discount?: number;
  rating?: number;
  averageRating?: number;
  imageUrl?: string;
  thumbnail?: string;
  features?: Record<string, string>;
  specifications?: Record<string, string>;
}
