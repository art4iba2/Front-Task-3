interface Props {
  min: number
  max: number
}

export default function Slider({ min, max }: Props) {

  return (
    <input type="range" min={min} max={max} />
  )
}