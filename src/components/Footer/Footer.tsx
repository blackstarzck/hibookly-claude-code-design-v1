import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const businessLines = t('footer.businessLines', { returnObjects: true }) as string[];
  const territories = t('footer.territories', { returnObjects: true }) as string[];

  return (
    <footer className="bg-paper border-t border-line pt-16 max-md:pt-12 pb-8 max-md:pb-7 px-gutter">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] max-md:grid-cols-1 gap-12 max-md:gap-8 pb-10 max-md:pb-8">
          <div className="flex flex-col gap-[14px]">
            <img
              className="self-start h-[22px] w-auto"
              src="/assets/logo_dark.png"
              alt="Bookly"
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-ink-4">
              {t('footer.businessInfoLabel')}
            </span>
            <ul className="list-none m-0 p-0 flex flex-col gap-1.5 text-sm text-ink-3 leading-[1.5]">
              {businessLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-ink-4">
              {t('footer.partnerCountriesLabel')}
            </span>
            <p className="m-0 font-serif text-sm text-ink-3 leading-[1.6]">
              {territories.join(' · ')}
            </p>
          </div>
        </div>

        <div className="border-t border-line pt-6">
          <p className="m-0 text-xs tracking-[0.08em] text-ink-4">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
