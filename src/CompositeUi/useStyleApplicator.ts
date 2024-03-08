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
      "!important;\n";
  }

  return cssString;
};

const initializeStyleSheet = (className: string, actions: Record<string, React.CSSProperties>) => {
  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet as CSSStyleSheet;

  Object.entries(actions ?? {}).forEach(([action, jss]) => {
    const selector = `.${className}${customAction[action]}`;
    styleSheet.insertRule(`${selector} {${jssToCSS(jss)}}`);
  });

  return styleEl;
};

const getRandomClassName = () => `a_${Math.random()}`.replace(/\./g, "");

const useStyleApplicator = (params: Params) => {
  const { webStyle, actions } = params;
  const className = useMemo(getRandomClassName, []);

  useEffect(() => {
    const sheet = initializeStyleSheet(className, actions);
    return () => {
      sheet.remove();
    };
  }, [actions, className]);

  return {
    style: webStyle,
    className: className,
  };
};

export default useStyleApplicator;
