interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      className="search"
      placeholder="Поиск..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
