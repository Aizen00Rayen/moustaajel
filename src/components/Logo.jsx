export default function Logo({ className = 'h-10 w-10', withText = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="#f4f8fb" stroke="#0e3a53" strokeWidth="2" />
        {/* scales of justice */}
        <g stroke="#37b6e0" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="50" y1="18" x2="50" y2="34" />
          <line x1="30" y1="24" x2="70" y2="24" />
          <line x1="30" y1="24" x2="22" y2="38" />
          <line x1="30" y1="24" x2="38" y2="38" />
          <path d="M18 38 a12 9 0 0 0 24 0 Z" />
          <line x1="70" y1="24" x2="62" y2="38" />
          <line x1="70" y1="24" x2="78" y2="38" />
          <path d="M58 38 a12 9 0 0 0 24 0 Z" />
        </g>
        {/* running figure */}
        <g fill="#0e3a53">
          <circle cx="60" cy="42" r="5.2" />
          <path d="M44 92c1-8 4-15 9-19l6-13-9-8-7 7-5-4 10-11c2-2 5-3 8-2l12 5 8 10-5 4-6-7-3 6 8 9c3 3 4 7 4 11l1 12h-6l-1-11-9-9-5 12c3 3 5 8 5 13z" />
        </g>
      </svg>
      {withText && (
        <span className="font-extrabold text-xl leading-none text-[#0e3a53]">
          مستعجل<span className="block text-[10px] font-medium text-[#37b6e0] tracking-wide">MOUSTAADJEL</span>
        </span>
      )}
    </div>
  )
}
