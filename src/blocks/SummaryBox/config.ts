import { backgroundPicker } from "@/fields/backgroundPicker";
import { defaultLexical } from "@/fields/defaultLexical";
import { radiusFields } from "@/fields/radiusFields";

import type { Block } from "payload";

export const SummaryBox: Block = {
  slug: "summary",
  interfaceName: "Summary",
  fields: [
    {
      name: "text",
      type: "richText",
      editor: defaultLexical,
      localized: true,
      required: true,
    },
    {
      label: "Tekst",
      type: "collapsible",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "textAlign",
              type: "select",
              defaultValue: "left",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
              admin: { width: "40%" },
            },
            {
              name: "textSize",
              type: "select",
              defaultValue: "base",
              options: [
                { label: "Small", value: "sm" },
                { label: "Base", value: "base" },
                { label: "Large", value: "lg" },
              ],
              admin: { width: "40%" },
            },
            {
              name: "enableProse",
              type: "checkbox",
              defaultValue: false,
              admin: {
                width: "20%",
                style: {
                  display: "flex",
                  justifyContent: "center",
                },
              },
            },
          ],
        },
      ],
    },
    {
      label: "Box",
      type: "collapsible",
      fields: [
        backgroundPicker,
        {
          type: "row",
          fields: [
            {
              name: "spacingEnabled",
              type: "checkbox",
              defaultValue: false,
              admin: {
                width: "20%",
                style: {
                  display: "flex",
                  justifyContent: "center",
                },
              },
            },
            {
              type: "row",
              admin: { style: { width: "78%" } },
              fields: [
                {
                  name: "spacingBottomBox",
                  label: "Margin Bottom",
                  type: "select",
                  defaultValue: "none",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ],
                  admin: {
                    width: "50%",
                    condition: (_, siblingData) => Boolean(siblingData?.spacingEnabled),
                  },
                },
                {
                  name: "spacingTopBox",
                  label: "Margin Top",
                  type: "select",
                  defaultValue: "none",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ],
                  admin: {
                    width: "50%",
                    condition: (_, siblingData) => Boolean(siblingData?.spacingEnabled),
                  },
                },
              ],
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "paddingEnabled",
              type: "checkbox",
              defaultValue: false,
              admin: {
                width: "20%",
                style: {
                  display: "flex",
                  justifyContent: "center",
                },
              },
            },
            {
              type: "row",
              admin: { style: { width: "78%" } },
              fields: [
                {
                  name: "paddingBottomBox",
                  label: "Padding Bottom",
                  type: "select",
                  defaultValue: "none",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ],
                  admin: {
                    width: "50%",
                    condition: (_, siblingData) => Boolean(siblingData?.paddingEnabled),
                  },
                },
                {
                  name: "paddingTopBox",
                  label: "Padding Top",
                  type: "select",
                  defaultValue: "none",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Small", value: "small" },
                    { label: "Medium", value: "medium" },
                    { label: "Large", value: "large" },
                  ],
                  admin: {
                    width: "50%",
                    condition: (_, siblingData) => Boolean(siblingData?.paddingEnabled),
                  },
                },
              ],
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "borderEnabled",
              type: "checkbox",
              defaultValue: false,
              admin: {
                width: "20%",
                style: {
                  display: "flex",
                  justifyContent: "center",
                },
              },
            },
            {
              type: "row",
              admin: { style: { width: "78%" } },
              fields: [
                {
                  name: "borderWidth",
                  type: "select",
                  label: "Border Width",
                  defaultValue: "border",
                  options: [
                    { label: "1px", value: "border" },
                    { label: "2px", value: "border-2" },
                    { label: "4px", value: "border-4" },
                  ],
                  admin: {
                    width: "50%",
                    condition: (_, siblingData) => Boolean(siblingData?.borderEnabled),
                  },
                },
              ],
            },
          ],
        },

        ...radiusFields,
      ],
    },
    {
      label: "Layout",
      type: "collapsible",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "position",
              label: "Position",
              type: "select",
              defaultValue: "center",
              options: [
                {
                  label: "Center",
                  value: "center",
                },
                {
                  label: "Left",
                  value: "left",
                },
                {
                  label: "Right",
                  value: "right",
                },
              ],
            },
            {
              name: "maxWidth",
              type: "select",
              defaultValue: "xl",
              options: [
                { label: "Mid", value: "md" },
                { label: "Large", value: "lg" },
                { label: "XL", value: "xl" },
                { label: "Full", value: "full" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
