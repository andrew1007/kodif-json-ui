export type CompositeUiProps = {
  type: 'container' | 'image' | 'text' | 'button' | 'textarea' | 'textfield';
  children: CompositeUiProps[]
  style: {
    webStyle: React.CSSProperties
    actions: Record<string, React.CSSProperties>
  }
  value?: string;
  data: {
    value?: string;
    title?: string;
    placeholder?: string;
  }
}