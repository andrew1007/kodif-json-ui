import React from "react";
import Container from "./Container"
import makeBaseHtml from "./makeBaseHtml";
import { CompositeUiProps } from "./types";
import useStyleApplicator from "./useStyleApplicator";

const compositeMap: Record<CompositeUiProps['type'], React.FC<any>> = {
  container: Container,
  image: makeBaseHtml('img'),
  button: makeBaseHtml('button'),
  text: makeBaseHtml('span'),
  textarea: makeBaseHtml('textarea'),
  textfield: makeBaseHtml('textarea'),
}

const CompositeUi = (props: CompositeUiProps) => {
  const { type, style } = props
  const { computedStyles, ...handlers } = useStyleApplicator(style)

  if (type === 'container') {
    const { childUi } = props
    return (
      <div style={computedStyles} {...handlers}>
        {childUi.map((childProps, idx) => {
          return <CompositeUi key={idx} {...childProps} />
        })}
      </div>
    )
  }

  const CurrentComponent = compositeMap[type]
  return <CurrentComponent {...props} />
}

export default CompositeUi
