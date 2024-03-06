type ContainerProps = {
  children: React.ReactNode
  style: React.CSSProperties
}

const Container = (props: ContainerProps) => {
  return (
    <div style={props.style}>
      {props.children}
    </div>
  )
}

export default Container