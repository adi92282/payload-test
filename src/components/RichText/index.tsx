/* eslint-disable */
import {
  type DefaultNodeTypes,
  type SerializedBlockNode,
  type SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import { type SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";

import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CodeBlock, type CodeBlockProps } from "@/blocks/Code/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { cn } from "@/utilities/cn";
import { FormBlock, type FormBlockType } from "@/blocks/Form/Component"; // 👈 dodany import typu

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from "@/payload-types";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | FormBlockType> // 👈 dodany FormBlockType

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug as string;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) =>
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-3xl"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    formBlock: ({ node }: { node: SerializedBlockNode<FormBlockType> }) =>
      <FormBlock {...node.fields} />,
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) =>
      <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) =>
      <CallToActionBlock {...node.fields} />,
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = false, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn("text-center text-h2",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "prose mx-auto md:prose-md dark:prose-invert": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}