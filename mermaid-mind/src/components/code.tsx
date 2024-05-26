"use client";

import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useCallback,
  FC,
} from "react";
import { getCodeString } from "rehype-rewrite";
import mermaid from "mermaid";

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode[];
  node?: {
    children?: React.ReactNode[];
  };
  [key: string]: any;
}

export const Code: FC<CodeProps> = ({
  inline,
  children = [],
  className,
  ...props
}) => {
  const demoid = useRef(`dome${randomid()}`);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const isMermaid =
    className && /^language-mermaid/.test(className.toLocaleLowerCase());

  // Ensure code is treated as a string
  const code =
    props.node && props.node.children
      ? getCodeString(props.node.children as any) // Type assertion to satisfy getCodeString
      : (children[0] as string) || "";

  const reRender = async () => {
    if (container && isMermaid) {
      try {
        const str = await mermaid.render(demoid.current, code);
        container.innerHTML = str.svg;
      } catch (error) {
        container.innerHTML = String(error);
      }
    }
  };

  useEffect(() => {
    reRender();
  }, [container, isMermaid, code, demoid]);

  const refElement = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  if (isMermaid) {
    return (
      <Fragment>
        <code id={demoid.current} style={{ display: "none" }} />
        <code ref={refElement} data-name="mermaid" />
      </Fragment>
    );
  }
  return <code>{children}</code>;
};
