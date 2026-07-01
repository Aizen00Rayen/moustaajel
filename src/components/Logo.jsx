import logoImg from '../assets/logo.png'

export default function Logo({ className = 'h-10 w-10', withText = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <img src={logoImg} alt="مستعجل" className={`${className} object-contain`} />
      {withText && (
        <span className="font-extrabold text-xl leading-none text-[#0e3a53]">
          مستعجل<span className="block text-[10px] font-medium text-[#37b6e0] tracking-wide">MOUSTAADJEL</span>
        </span>
      )}
    </div>
  )
}
