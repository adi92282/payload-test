/* eslint-disable */

import {
  BlocksFeature,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";

import { MediaBlock } from "@/blocks/MediaBlock/config";

import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig<"posts"> = {
  slug: "testimonials",
  labels: {
    singular: {
      en: "Testimonial",
      pl: "Opinia",
    },
    plural: {
      en: "Testimonials",
      pl: "Opinie",
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "updatedAt"],
    useAsTitle: "title",
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
    {
      name: "personName",
      type: "text",
      required: true,
      localized: true,
      label: {
        en: "Person Name",
        pl: "Imię i nazwisko osoby",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "picture",
              type: "upload",
              relationTo: "media",
              label: {
                en: "Picture",
                pl: "Zdjęcie",
              },
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    BlocksFeature({ blocks: [MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              localized: true,
              label: {
                en: "Content",
                pl: "Treść",
              },
              required: true,
            },
          ],
          label: {
            en: "Content Tab",
            pl: "Zakładka Treść",
          },
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      label: {
        en: "Published At",
        pl: "Data publikacji",
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      label: {
        en: "Authors",
        pl: "Autorzy",
      },
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};