export default function RatingStars({ value = 0, onChange, size = 'text-lg' }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className={`flex gap-0.5 ${size}`} dir="ltr">
      {stars.map((s) => (
        <button
          type="button"
          key={s}
          disabled={!onChange}
          onClick={() => onChange && onChange(s)}
          className={`${s <= Math.round(value) ? 'text-amber-400' : 'text-gray-300'} ${onChange ? 'cursor-pointer' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
