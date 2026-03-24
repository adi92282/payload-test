import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";

import type { CollectionConfig } from "payload";

export const ArticleCategories: CollectionConfig = {
  slug: "categoriesArticle",
  labels: {
    plural: {
      en: "Article Categories",
      pl: "Kategorie artykułów",
    },
    singular: {
      en: "Article Category",
      pl: "Kategoria artykułów",
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: {
        en: "Title",
        pl: "Tytuł",
      },
    },
  ],
};