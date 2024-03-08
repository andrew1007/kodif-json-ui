import React, { useEffect, useMemo } from "react";
import { CompositeUiProps } from "./types";

type Params = CompositeUiProps["style"];

const customAction: Record<string, string> = {
  onHover: ":hover",
  onFocus: ":focus",
};

const jssToCSS = (jss: React.CSSProperties) => {
  let cssString = "";
  for (const objectKey in jss) {
    cssString +=
      objectKey.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) +
      ": " +
      jss[objectKey as keyof React.CSSProperties] +
      ";\n";
  }

  return cssString;
};

type InitializeStyleSheetParams = {
  className: string;
  actions: Record<string, React.CSSProperties>;
  styles: React.CSSProperties;
};

const initializeStyleSheet = (params: InitializeStyleSheetParams) => {
  const { actions, className, styles } = params;
  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet as CSSStyleSheet;

  styleSheet.insertRule(`.${className} {${jssToCSS(styles)}}`);

  Object.entries(actions ?? {}).forEach(([action, jss]) => {
    const selector = `.${className}${customAction[action]}`;
    styleSheet.insertRule(`${selector} {${jssToCSS(jss)}}`);
  });

  return styleEl;
};

const getRandomClassName = () => `a_${Math.random()}`.replace(/\./g, "");

const useStyleTransformer = (params: Params) => {
  const { webStyle, actions } = params;
  const className = useMemo(getRandomClassName, []);

  useEffect(() => {
    const sheet = initializeStyleSheet({
      className,
      actions,
      styles: webStyle,
    });

    return () => {
      sheet.remove();
    };
  }, [actions, className, webStyle]);

  return {
    className,
  };
};

export default useStyleTransformer;
