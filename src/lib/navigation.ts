export const simpleNavLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
] as const;

export const footerNavLinks = [
  { href: "/#platform", label: "Product" },
  { href: "/#solution", label: "Solution" },
  ...simpleNavLinks,
  { href: "/#contact", label: "Contact" },
] as const;
