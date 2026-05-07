import Reveal from './Reveal';
import Counter from './Counter';
import { stats } from '../content/homepage';

export default function AboutStats() {
  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <Reveal key={stat.label} className="stat-cell" delay={index * 120}>
          <div className="stat-cell__value">
            <Counter to={stat.value} suffix={stat.suffix} />
          </div>
          <div className="stat-cell__label">{stat.label}</div>
        </Reveal>
      ))}
    </div>
  );
}
