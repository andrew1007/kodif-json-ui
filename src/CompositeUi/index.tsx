import React from "react";
import makeBaseHtml from "./makeBaseHtml";
import { CompositeUiProps } from "./types";
import useStyleApplicator from "./useStyleApplicator";

const compositeMap: Partial<Record<CompositeUiProps['type'], React.FC<any>>> = {
  image: makeBaseHtml('img'),
  button: makeBaseHtml('button'),
  text: makeBaseHtml('div'),
  textarea: makeBaseHtml('textarea'),
  textfield: makeBaseHtml('input'),
}

const CompositeUi = (props: CompositeUiProps) => {
  const { type, style } = props
  const { computedStyles, ...handlers } = useStyleApplicator(style)

  if (type === 'container') {
    const { children } = props
    return (
      <div style={computedStyles} {...handlers}>
        {children.map((childProps, idx) => {
          return <CompositeUi key={idx} {...childProps} />
        })}
      </div>
    )
  }

  const CurrentComponent = compositeMap[type]
  return CurrentComponent ? <CurrentComponent {...props} /> : null
}

export default CompositeUi
