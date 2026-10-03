import { RichText } from '../content/RichText'

export function Guidance(props: { text: string }) {
  return (
    <details class="guidance" open>
      <summary>From the SRD</summary>
      <RichText text={props.text} />
    </details>
  )
}
