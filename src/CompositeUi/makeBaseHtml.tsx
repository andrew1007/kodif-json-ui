import React from "react"
import { CompositeUiProps } from "./types"
import useStyleTransformer from "./useStyleApplicator"

type Fn = (props: CompositeUiProps) => Record<string, any>

const propComputeMap: Partial<Record<CompositeUiProps['type'], Fn>> = {
  button: (props) => {
    return {
      children: props.data?.title
    }
  },
  image: (props) => {
    return {
      src: props.value
    }
  },
  text: (props) => {
    return {
      children: props.data.value,
    }
  },
  textarea: (props) => {
    return {
      placeholder: props.data.placeholder,
      children: props.data.value,
    }
  },
  textfield: (props) => {
    return {
      placeholder: props.data.placeholder,
      children: props.data.value,
    }
  },
}

const makeBaseHtml = (tag: string) => (props: CompositeUiProps) => {
  const { type, style } = props
  const { className } = useStyleTransformer(style)
  const computedProps = propComputeMap[type]?.(props)

  return (
    <>
      {React.createElement(tag, {
        ...computedProps,
        className,
      })}
    </>
  )
}

export default makeBaseHtml
