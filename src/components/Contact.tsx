import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { managers, offices } from '../content/homepage';

const CONTACT_EMAIL = 'info@hibookly.com';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
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
          subject: `[Bookly 문의] ${name}`,
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
    <section id="contact" className="section section--night contact">
      <div className="section__inner">
        <Reveal as="h2" className="section__title contact__title" delay={120}>
          문의하기
        </Reveal>

        <div className="contact__grid">
          <div className="contact__col">
            <Reveal className="contact__group" delay={120}>
              <div className="managers">
                {managers.map((m, i) => (
                  <Reveal key={`${m.region}-${m.name}`} className="manager" delay={i * 80}>
                    <div className="manager__region">{m.region}</div>
                    <h4 className="manager__name">{m.name}</h4>
                    <a className="manager__email" href={`mailto:${m.email}`}>{m.email}</a>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal className="contact__group" delay={160}>
              <div className="subhead subhead--rule"></div>
              <div className="offices">
                {offices.map((o, i) => (
                  <Reveal key={o.city} className="office" delay={i * 100}>
                    <div className="office__city">{o.city}</div>
                    <p className="office__addr">{o.addr}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="contact__col">
            <Reveal className="contact__group" delay={140}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  className="contact-form__botcheck"
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div className="contact-form__row">
                  <label className="contact-form__field">
                    <span className="contact-form__label">이름</span>
                    <input
                      className="contact-form__input"
                      type="text"
                      name="name"
                      placeholder="담당자 이름"
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="contact-form__field">
                    <span className="contact-form__label">이메일</span>
                    <input
                      className="contact-form__input"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className="contact-form__field">
                  <span className="contact-form__label">메시지</span>
                  <textarea
                    className="contact-form__textarea"
                    name="message"
                    rows={6}
                    placeholder="저작권 문의 또는 협업 제안을 자유롭게 적어 주세요."
                    required
                  />
                </label>

                <div className="contact-form__actions">
                  <p className="contact-form__hint">
                    또는 <span>{CONTACT_EMAIL}</span> 로 직접 보내주셔도 됩니다.
                  </p>
                  <button type="submit" className="btn-pill contact-form__submit" disabled={submitState === 'sending'}>
                    <span className="btn-pill__label">
                      {submitState === 'sending' ? '전송 중' : '보내기'}
                    </span>
                    <ArrowUpRight className="btn-pill__icon" size={18} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
                <p className={`contact-form__status contact-form__status--${submitState}`} role="status" aria-live="polite">
                  {submitState === 'success' && '문의가 접수되었습니다.'}
                  {submitState === 'error' && '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.'}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
