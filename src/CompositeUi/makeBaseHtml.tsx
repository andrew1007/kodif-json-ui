import React from "react"
import { CompositeUiProps } from "./types"
import useStyleApplicator from "./useStyleApplicator"

type Fn = (props: CompositeUiProps) => Record<string, any>

const propComputeMap: Record<CompositeUiProps['type'], Fn> = {
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
    console.log(props)
    return {
      placeholder: props.data.placeholder,
      children: props.data.value,
    }
  },
  textfield: (props) => {
    console.log(props)
    return {
      placeholder: props.data.placeholder,
      children: props.data.value,
    }
  },
  container: () => ({})
}

const makeBaseHtml = (tag: string) => (props: CompositeUiProps) => {
  const { style, type } = props
  const { computedStyles, ...handlers } = useStyleApplicator(style)
  const computedProps = propComputeMap[type](props)

  return (
    <>
      {React.createElement(tag, {
        ...computedProps,
        style: computedStyles,
        ...handlers
      })}
    </>
  )
}

export default makeBaseHtml
