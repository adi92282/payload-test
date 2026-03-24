import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
// import { Accordion } from "@/blocks/Accoridon/config";
import { Archive } from "@/blocks/ArchiveBlock/config";
import { CallToAction } from "@/blocks/CallToAction/config";
import { Code } from "@/blocks/Code/config";
import { Content } from "@/blocks/Content/config";
import { FormBlock } from "@/blocks/Form/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { SummaryBox } from "@/blocks/SummaryBox/config";
import { slugField } from "payload";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

import { populateAuthors } from "./hooks/populateAuthors";
import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost";

import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig<"articles"> = {
  slug: "articles",
  labels: {
    singular: {
      en: "Article",
      pl: "Artykuły",
      pt: "Article",
      es: "Article",
    },
    plural: {
      en: "Article",
      pl: "Artykuły",
      pt: "Article",
      es: "Article",
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categoriesArticle: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  fields: [
    {
      name: "attribution",
      label: {
        en: "Attribution",
        pl: "Atrybuty",
      },
      type: "richText",
      localized: true,
    },
    {
      name: "title",
      label: {
        en: "Title",
        pl: "Tytuł",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "heroImage",
              label: {
                en: "Hero image",
                pl: "Hero zdjęcie",
              },
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                    BlocksFeature({
                      blocks: [
                        SummaryBox,
                        CallToAction,
                        Content,
                        MediaBlock,
                        Archive,
                        FormBlock,
                        Code,
                      ],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              localized: true,
              label: false,
              required: true,
            },
          ],
          label: {
                en: "Content",
                pl: "Zawartość",
              },
        },
        {
          fields: [
            {
              name: "relatedArticles",
              label: {
                en: "Related articles",
                pl: "Powiązane artykuły",
              },
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "users",
            },
            {
              name: "categoriesArticle",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "categoriesArticle",
              label: {
                en: "Categories",
                pl: "Kategorie",
              },
            },
          ],
          label: "Meta",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
          localized: true,
        },
      ],
    },
    {
      name: "publishedAt",
      label: {
                en: "Published at",
                pl: "Opublikowane",
              },
      type: "date",
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
            return value as Date;
          },
        ],
      },
    },
    {
      name: "authors",
       label: {
                en: "Author",
                pl: "Autor",
              },
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "users",
      defaultValue: ({ req }) => req.user?.id,
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: "populatedAuthors",
      type: "array",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
      ],
    },
    slugField(),
    {
      name: "featured",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
      label: {
        en: "Featured",
        pl: "Wyróżniony",
        pt: "Destaque",
        es: "Destacado",
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 3000, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
