import React from "react"
import { CompositeUiProps } from "./types"
import useStyleApplicator from "./useStyleApplicator"

const valueMap: Record<CompositeUiProps['type'], string> = {
  button: 'children',
  image: 'src',
  text: 'children',
  textarea: 'value',
  textfield: 'value',
  container: 'children'
}

const makeBaseHtml = (tag: string) => (props: CompositeUiProps) => {
  const { style, type, data, value } = props
  const renderValue = data?.value || data?.title || value
  const valueKey = valueMap[type]
  const { computedStyles, ...handlers } = useStyleApplicator(style)

  return (
    <>
      {React.createElement(tag, {
        [valueKey]: renderValue,
        style: computedStyles,
        ...handlers
      })}
    </>
  )
}

export default makeBaseHtml
