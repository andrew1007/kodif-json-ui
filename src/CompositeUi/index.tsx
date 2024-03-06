import React from "react";
import Container from "./Container"
import makeBaseHtml from "./makeBaseHtml";
import { CompositeUiProps } from "./types";

const compositeMap: Record<CompositeUiProps['type'], React.FC<any>> = {
  container: Container,
  image: makeBaseHtml('img'),
  button: makeBaseHtml('button'),
  text: makeBaseHtml('span'),
  textarea: makeBaseHtml('textarea'),
  textfield: makeBaseHtml('textarea'),
}

const CompositeUi = (props: CompositeUiProps) => {
  const { type } = props

  if (type === 'container') {
    const { childUi, style } = props
    return (
      <Container style={style.webStyle}>
        {childUi.map((childProps, idx) => {
          return <CompositeUi key={idx} {...childProps} />
        })}
      </Container>
    )
  }

  const CurrentComponent = compositeMap[type]
  return <CurrentComponent {...props} />
}

export default CompositeUi
