export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[\s\W-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
