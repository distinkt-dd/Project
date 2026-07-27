import styles from './SpecializationCard.module.css';

interface SpecializationCardProps {
  name: string;
}

export const SpecializationCard: React.FC<SpecializationCardProps> = ({
  name,
}: SpecializationCardProps) => {
  return <article className={styles.card}>{name}</article>;
};
