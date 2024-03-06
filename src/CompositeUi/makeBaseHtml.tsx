import React from "react"
import { CompositeUiProps } from "./types"

const valueMap: Record<CompositeUiProps['type'], string> = {
  button: 'children',
  image: 'src',
  text: 'children',
  textarea: 'value',
  textfield: 'value',
  container: 'children'
}

const makeBaseHtml = (tag: string) => (props: CompositeUiProps) => {
  const value = props.data?.value || props.data?.title || props.value
  const valueKey = valueMap[props.type]

  const { webStyle } = props.style

  return (
    <>
      {React.createElement(tag, {
        [valueKey]: value,
        style: webStyle,
      })}
    </>
  )
}

export default makeBaseHtml
