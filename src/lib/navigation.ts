export const bookDemoUrl = "https://calendly.com/vaneesa-useperry/30min";

export const simpleNavLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
] as const;

export const footerNavLinks = [
  ...simpleNavLinks,
  { href: "/#contact", label: "Contact" },
] as const;
