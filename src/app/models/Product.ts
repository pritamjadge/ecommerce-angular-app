export interface ProductImage {
  id: number;
  imageUrl: string;
 // imageName: string;
}

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productQty: number;
  productPrice: number;
  productImages: ProductImage[];
}
