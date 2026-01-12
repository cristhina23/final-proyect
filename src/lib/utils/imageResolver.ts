// @ts-nocheck

const stylistImages = import.meta.glob(
  '$lib/assets/stylists/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

const serviceImages = import.meta.glob(
  '$lib/assets/services/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

function getImage(images: Record<string, any>, path: string) {
  if (!path) return '';
  const filename = path.split('/').pop();
  return images[Object.keys(images).find((k) => k.endsWith(filename))] || '';
}

export function getStylistImage(path: string) {
  return getImage(stylistImages, path);
}

export function getServiceImage(path: string) {
  return getImage(serviceImages, path);
}
