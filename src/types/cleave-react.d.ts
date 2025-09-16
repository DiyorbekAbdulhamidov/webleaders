declare module 'cleave.js/react' {
  import * as React from 'react'

  interface CleaveOptions {
    prefix?: string
    blocks?: number[]
    delimiters?: string[]
    numericOnly?: boolean
    phone?: boolean
    phoneRegionCode?: string
    onValueChanged?: (event: { target: HTMLInputElement }) => void
  }

  interface CleaveProps extends React.InputHTMLAttributes<HTMLInputElement> {
    options: CleaveOptions
  }

  const Cleave: React.FC<CleaveProps>

  export default Cleave
}