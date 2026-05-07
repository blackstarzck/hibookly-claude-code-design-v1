import { territories } from '../content/homepage';

const businessInfo = [
  '경기 김포시 태장로 765',
  '사업자 등록번호 366-88-03545',
  '대표이사 윤덕옥',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <img className="footer__logo" src="/assets/logo_dark.png" alt="Bookly" />
          </div>

          <div className="footer__col">
            <span className="footer__col-label">사업자 정보</span>
            <ul className="footer__info">
              {businessInfo.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <span className="footer__col-label">파트너 국가</span>
            <p className="footer__partners-text">{territories.join(' · ')}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">COPYRIGHT© 2025. Bookly. ALL RIGHT RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
