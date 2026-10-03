export function TierFilter(props: { allTiers: boolean; onChange: (allTiers: boolean) => void }) {
  return (
    <label class="checkbox">
      <input type="checkbox" checked={props.allTiers} onChange={(event) => props.onChange(event.currentTarget.checked)} />
      Show all tiers
    </label>
  )
}
