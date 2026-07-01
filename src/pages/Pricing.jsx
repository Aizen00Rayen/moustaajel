import { useLang } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { formatMoney } from '../utils/helpers'

export default function Pricing() {
  const { t, lang } = useLang()
  const { db } = useData()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl font-extrabold text-[#0e3a53] mb-4 text-center">{t('pricing_title')}</h1>
      <p className="text-slate-600 max-w-3xl mx-auto text-center mb-12">{t('pricing_intro')}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-14">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-[#0e3a53] mb-2">{t('pricing_client_title')}</h2>
          <p className="text-slate-600 text-sm mb-3">{t('pricing_client_desc')}</p>
          <div className="text-2xl font-extrabold text-[#37b6e0]">
            {formatMoney(db.settings.clientServiceFee, lang, t('common_dzd'))} <span className="text-sm text-slate-400 font-normal">/ {t('new_request_title')}</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-[#0e3a53] mb-2">{t('pricing_huissier_title')}</h2>
          <p className="text-slate-600 text-sm mb-3">{t('pricing_huissier_desc')}</p>
          <div className="text-2xl font-extrabold text-[#37b6e0]">{Math.round(db.settings.commissionRate * 100)}%</div>
        </div>
      </div>

      <h2 className="text-xl font-extrabold text-[#0e3a53] mb-6 text-center">{t('huissier_subscription_title')}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {db.pricingPlans.map((plan) => (
          <div key={plan.id} className={`rounded-xl border p-6 bg-white ${plan.id === 'pro' ? 'border-[#37b6e0] shadow-lg scale-[1.02]' : 'border-slate-200'}`}>
            <h3 className="font-bold text-lg text-[#0e3a53] mb-1">{t(plan.nameKey)}</h3>
            <div className="text-2xl font-extrabold text-slate-800 mb-4">
              {plan.price === 0 ? t('free') : formatMoney(plan.price, lang, t('common_dzd'))}
              {plan.price !== 0 && <span className="text-sm font-normal text-slate-400">{t('per_month')}</span>}
            </div>
            <ul className="space-y-2">
              {plan.featuresKey.map((fk) => (
                <li key={fk} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-[#37b6e0]">✓</span>
                  <span>{t(fk)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
