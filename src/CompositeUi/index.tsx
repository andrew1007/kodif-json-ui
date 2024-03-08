import React from "react";
import makeBaseHtml from "./makeBaseHtml";
import { CompositeUiProps } from "./types";
import useStyleApplicator from "./useStyleApplicator";

const compositeMap: Partial<Record<CompositeUiProps['type'], React.FC<CompositeUiProps>>> = {
  image: makeBaseHtml('img'),
  button: makeBaseHtml('button'),
  text: makeBaseHtml('div'),
  textarea: makeBaseHtml('textarea'),
  textfield: makeBaseHtml('input'),
}

const CompositeUi = (props: CompositeUiProps) => {
  const { type, } = props
  const { style, className } = useStyleApplicator(props.style)

  if (type === 'container') {
    const { children } = props
    return (
      <div style={style} className={className}>
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
