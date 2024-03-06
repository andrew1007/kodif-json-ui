import { useState } from "react";
import { CompositeUiProps } from "./types";

type Params = CompositeUiProps["style"];

const customAction: Record<string, string> = {
  onHover: "onMouseOver",
};

const useStyleApplicator = (params: Params) => {
  const { webStyle, actions } = params;
  const [computedStyles, setStyles] = useState(webStyle);

  const handlers = Object.fromEntries(
    Object.entries(actions ?? {}).map(([eventName, styles]) => {
      const fn = () =>
        setStyles({
          ...webStyle,
          ...styles,
        });
      return [customAction[eventName] ?? eventName, fn];
    })
  );

  type Ret = {
    computedStyles: typeof computedStyles;
  } & {
    [eventHandler: string]: () => void;
  };

  return {
    computedStyles,
    ...handlers,
  } as Ret;
};

export default useStyleApplicator;
