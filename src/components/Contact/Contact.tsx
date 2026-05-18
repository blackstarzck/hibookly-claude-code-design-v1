import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import Reveal from '../ui/Reveal';
import ContentSection from '../ui/ContentSection';
import { managers, offices } from '../../content/homepage';

const CONTACT_EMAIL = 'info@hibookly.com';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const STATUS_COLOR: Record<SubmitState, string> = {
  idle: 'text-night-fg-1/[0.52]',
  sending: 'text-night-fg-1/[0.52]',
  success: 'text-bookly-soft',
  error: 'text-[#ffb4a8]',
};

const inputClasses =
  'contact-form-input w-full px-4 py-[14px] bg-black/40 border border-white/[0.12] rounded-md text-night-fg-1 font-[inherit] leading-[1.5] transition-[border-color,background] duration-240 ease-out-soft placeholder:text-night-fg-1/[0.28] hover:border-white/[0.22] focus:outline-none focus:border-white/[0.5]';

export default function Contact() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    if (submitState !== 'success' && submitState !== 'error') return;

    const timer = window.setTimeout(() => {
      setSubmitState('idle');
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [submitState]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !email || !message) return;
    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmitState('error');
      return;
    }

    setSubmitState('sending');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: t('contact.form.subject', { name }),
          name,
          email,
          message,
          botcheck: String(data.get('botcheck') ?? ''),
        }),
      });

      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || result?.success === false) {
        throw new Error('Failed to submit contact form.');
      }

      form.reset();
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <ContentSection
      id="contact"
      tone="dark"
      title={t('nav.links.contact')}
      className="relative overflow-hidden bg-night text-night-fg-1"
    >
      <div className="grid grid-cols-2 gap-20 max-[980px]:grid-cols-1 max-[980px]:gap-14">
        <div className="flex flex-col gap-14 min-w-0">
          <Reveal className="flex flex-col" delay={120}>
            <div className="grid grid-cols-2 gap-y-7 gap-x-6 max-md:mb-14 max-[480px]:gap-x-[18px] max-[480px]:gap-y-[30px]">
              {managers.map((m, i) => (
                <Reveal key={m.id} className="pt-0" delay={i * 80}>
                  <div className="text-bookly-soft tracking-[0.06em] mb-[14px] max-md:text-xs">
                    {t(`contact.managers.${m.id}.region`)}
                  </div>
                  <h4 className="text-xl font-medium m-0 mb-1.5 text-night-fg-1">
                    {t(`contact.managers.${m.id}.name`)}
                  </h4>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-night-fg-1/70 pb-px no-underline hover:text-night-fg-1 max-[480px]:[overflow-wrap:anywhere]"
                  >
                    {m.email}
                  </a>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal className="flex flex-col" delay={160}>
            <div className="font-medium uppercase tracking-widest text-night-fg-1/50 pb-[18px] mb-8 border-b border-night-line-strong" />
            <div className="grid grid-cols-1 gap-4 max-md:gap-7 max-md:mb-14">
              {offices.map((o, i) => (
                <Reveal key={o.id} delay={i * 100}>
                  <div className="font-serif text-base font-normal text-night-fg-1 mb-3">
                    {t(`contact.offices.${o.id}.city`)}
                  </div>
                  <p className="text-sm leading-[1.6] text-night-fg-1/65 m-0">
                    {t(`contact.offices.${o.id}.addr`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-14 min-w-0">
          <Reveal className="flex flex-col" delay={140}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid grid-cols-2 gap-6 max-[700px]:grid-cols-1">
                <label className="flex flex-col gap-[10px]">
                  <span className="text-sm font-semibold tracking-[0.14em] uppercase text-night-fg-1/55">
                    {t('contact.form.name')}
                  </span>
                  <input
                    className={inputClasses}
                    type="text"
                    name="name"
                    placeholder={t('contact.form.namePlaceholder')}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="flex flex-col gap-[10px]">
                  <span className="text-sm font-semibold tracking-[0.14em] uppercase text-night-fg-1/55">
                    {t('contact.form.email')}
                  </span>
                  <input
                    className={inputClasses}
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col gap-[10px]">
                <span className="text-sm font-semibold tracking-[0.14em] uppercase text-night-fg-1/55">
                  {t('contact.form.message')}
                </span>
                <textarea
                  className={`${inputClasses} resize-y min-h-[140px]`}
                  name="message"
                  rows={6}
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </label>

              <div className="flex items-center justify-between gap-6 mt-2 flex-wrap max-[700px]:flex-col max-[700px]:items-stretch">
                <p className="m-0 text-[13px] text-night-fg-1/50 [&_span]:text-night-fg-1 [&_span]:transition-[border-color] [&_span]:duration-240 [&_span]:ease-out-soft">
                  <Trans
                    i18nKey="contact.form.hint"
                    values={{ email: CONTACT_EMAIL }}
                    components={{ span: <span /> }}
                  />
                </p>
                <button
                  type="submit"
                  disabled={submitState === 'sending'}
                  className="inline-flex items-center justify-center gap-2 cursor-pointer border-0 font-[inherit] whitespace-nowrap bg-bookly-primary text-paper px-7 py-[14px] rounded-pill text-sm font-medium transition-[background,color,border-color,transform] duration-[400ms] ease-out-soft hover:bg-bookly-mid hover:text-paper disabled:cursor-progress disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-bookly-soft focus-visible:outline-offset-[3px] max-[700px]:w-full"
                >
                  <span className="relative z-[1]">
                    {submitState === 'sending'
                      ? t('contact.form.sending')
                      : t('contact.form.send')}
                  </span>
                  <ArrowUpRight
                    className="relative z-[1] flex-none transition-transform duration-300 ease-out-soft"
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              </div>
              <p
                className={`min-h-5 -mt-2 text-[13px] leading-[1.5] ${STATUS_COLOR[submitState]}`}
                role="status"
                aria-live="polite"
              >
                {submitState === 'success' && t('contact.form.successMsg')}
                {submitState === 'error' && t('contact.form.errorMsg')}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </ContentSection>
  );
}
