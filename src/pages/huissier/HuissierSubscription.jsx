import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { formatMoney } from '../../utils/helpers'

export default function HuissierSubscription() {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const { db, getHuissierByUserId, updateHuissier } = useData()
  const huissier = getHuissierByUserId(user.id)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-2">{t('huissier_subscription_title')}</h1>
      <p className="text-slate-500 mb-8">
        {t('huissier_current_plan')}: <span className="font-bold text-[#0e3a53]">{t(`plan_${huissier.plan}`)}</span>
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {db.pricingPlans.map((plan) => {
          const active = huissier.plan === plan.id
          return (
            <div key={plan.id} className={`rounded-xl border p-6 bg-white flex flex-col ${active ? 'border-[#37b6e0] shadow-lg' : 'border-slate-200'}`}>
              <h3 className="font-bold text-lg text-[#0e3a53] mb-1">{t(plan.nameKey)}</h3>
              <div className="text-2xl font-extrabold text-slate-800 mb-4">
                {plan.price === 0 ? t('free') : formatMoney(plan.price, lang, t('common_dzd'))}
                {plan.price !== 0 && <span className="text-sm font-normal text-slate-400">{t('per_month')}</span>}
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.featuresKey.map((fk) => (
                  <li key={fk} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-[#37b6e0]">✓</span>
                    <span>{t(fk)}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={active}
                onClick={() => updateHuissier(huissier.id, { plan: plan.id })}
                className={`rounded-lg px-4 py-2 font-semibold ${
                  active ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-[#0e3a53] text-white hover:bg-[#0a2c3f]'
                }`}
              >
                {active ? t('huissier_current_plan') : t('huissier_choose_plan')}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
