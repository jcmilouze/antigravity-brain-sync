import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function calculateCartTotal(items: any[], products: Product[]): number {
  return items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    const material = product.materials.find(m => m.id === item.selectedMaterial);
    const priceWithMaterial = product.price + (material?.priceAddon || 0);
    return total + priceWithMaterial * item.quantity;
  }, 0);
}
