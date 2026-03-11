interface Props {
  onToggle: () => void
}

export default function Toggle({ onToggle }: Props) {

  return (
    <button onClick={onToggle}>
      Сменить тему
    </button>
  )
}