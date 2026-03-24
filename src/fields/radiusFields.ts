import { type Field } from "payload";

export const radiusFields: Field[] = [
  {
    name: "radius",
    label: "Border Radius",
    type: "checkbox",
    defaultValue: false,
  },
  {
    name: "specifiedRadius",
    label: "Specify Border Radius",
    type: "checkbox",
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => Boolean(siblingData.radius),
    },
  },
  {
    name: "radiusAll",
    label: "Border Radius",
    type: "select",
    options: [
      {
        label: "None",
        value: "rounded-none",
      },
      {
        label: "Small",
        value: "rounded-lg",
      },
      {
        label: "Medium",
        value: "rounded-xl",
      },
      {
        label: "Large",
        value: "rounded-2xl",
      },
      {
        label: "Extra Large",
        value: "rounded-3xl",
      },
      {
        label: "Full",
        value: "rounded-full",
      },
    ],
    defaultValue: "rounded-none",
    admin: {
      condition: (_, siblingData) => Boolean(siblingData.radius && !siblingData.specifiedRadius),
    },
  },
  {
    type: "row",
    fields: [
      {
        name: "radiusTopLeft",
        label: "Top Left",
        type: "select",
        options: [
          {
        label: "None",
        value: "rounded-none",
      },
      {
        label: "Small",
        value: "rounded-lg",
      },
      {
        label: "Medium",
        value: "rounded-xl",
      },
      {
        label: "Large",
        value: "rounded-2xl",
      },
      {
        label: "Extra Large",
        value: "rounded-3xl",
      },
      {
        label: "Full",
        value: "rounded-full",
      },
        ],
        defaultValue: "rounded-tl-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
      {
        name: "radiusTopRight",
        label: "Top Right",
        type: "select",
        options: [
          {
        label: "None",
        value: "rounded-none",
      },
      {
        label: "Small",
        value: "rounded-lg",
      },
      {
        label: "Medium",
        value: "rounded-xl",
      },
      {
        label: "Large",
        value: "rounded-2xl",
      },
      {
        label: "Extra Large",
        value: "rounded-3xl",
      },
      {
        label: "Full",
        value: "rounded-full",
      },
        ],
        defaultValue: "rounded-tr-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "radiusBottomLeft",
        label: "Bottom Left",
        type: "select",
        options: [
          {
        label: "None",
        value: "rounded-none",
      },
      {
        label: "Small",
        value: "rounded-lg",
      },
      {
        label: "Medium",
        value: "rounded-xl",
      },
      {
        label: "Large",
        value: "rounded-2xl",
      },
      {
        label: "Extra Large",
        value: "rounded-3xl",
      },
      {
        label: "Full",
        value: "rounded-full",
      },
        ],
        defaultValue: "rounded-bl-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
      {
        name: "radiusBottomRight",
        label: "Bottom Right",
        type: "select",
        options: [
          {
        label: "None",
        value: "rounded-none",
      },
      {
        label: "Small",
        value: "rounded-lg",
      },
      {
        label: "Medium",
        value: "rounded-xl",
      },
      {
        label: "Large",
        value: "rounded-2xl",
      },
      {
        label: "Extra Large",
        value: "rounded-3xl",
      },
      {
        label: "Full",
        value: "rounded-full",
      },
        ],
        defaultValue: "rounded-br-none",
        admin: {
          condition: (_, siblingData) => Boolean(siblingData.radius && siblingData.specifiedRadius),
        },
      },
    ],
  },
];
