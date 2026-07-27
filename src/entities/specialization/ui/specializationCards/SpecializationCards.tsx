import styles from './SpecializationCards.module.css';
import { SpecializationCard } from './specializationCard/SpecializationCard';
import topLeftImg from '../../assets/pink_fuzz.png';
import rightBottomImg from '../../assets/blue_fuzz.png';

interface Specialization {
  id: number;
  name: string;
}

interface SpecializationCardsProps {
  data: Specialization[];
}

export const SpecializationCards: React.FC<SpecializationCardsProps> = ({
  data,
}) => {
  return (
    <div className={styles.specializationCards}>
      <img src={topLeftImg} aria-hidden="true" className={styles.TLImg} />
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.id}>
            <SpecializationCard name={item.name} />
          </li>
        ))}
      </ul>
      <img src={rightBottomImg} aria-hidden="true" className={styles.RBImg} />
    </div>
  );
};
