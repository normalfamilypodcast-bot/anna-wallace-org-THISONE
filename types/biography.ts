export interface Biography {
  id: string;
  title: string;
  content: string; // Markup text (HTML)
  image?: {
    url: string;
    alt: string;
  };
}
