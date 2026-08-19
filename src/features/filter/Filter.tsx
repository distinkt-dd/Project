import { useState } from 'react';
import { Select } from '@shared/ui/select';
import { Button } from '@shared/ui/button';
import styles from './Filter.module.css';

const DIRECTION_OPTIONS = [
  { value: 'design', label: 'Дизайн' },
  { value: 'sound', label: 'Звук и музыка' },
  { value: 'content', label: 'Контент и тексты' },
  { value: 'creative-management', label: 'Креативное управление' },
  { value: 'marketing', label: 'Маркетинг и продвижение' },
  { value: 'development', label: 'Разработка' },
  { value: 'production', label: 'Съемки и продакшн' },
  { value: 'product-management', label: 'Управление продуктом' },
];

const TAG_OPTIONS = [
  { value: 'graphic-designer', label: 'графический дизайнер' },
  { value: 'web-designer', label: 'веб-дизайнер' },
  { value: 'ux-ui', label: 'UX/UI дизайнер' },
  { value: 'front', label: 'front разработчик' },
  { value: 'back', label: 'back разработчик' },
  { value: 'marketer', label: 'маркетолог' },
  { value: 'copywriter', label: 'копирайтер' },
  { value: 'smm', label: 'SMM' },
];

const PERIOD_OPTIONS = [
  { value: 'day', label: 'За день' },
  { value: 'week', label: 'За неделю' },
  { value: 'month', label: 'За месяц' },
  { value: 'year', label: 'За год' },
  { value: 'all', label: 'За все время' },
];

interface FilterProps {
  className?: string;
}

export const Filter: React.FC<FilterProps> = () => {
  const [directions, setDirections] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [period, setPeriod] = useState('');

  return (
    <div className={styles.filter}>
      <div className={styles.selectContainer}>
        <div className={styles.selectWrap}>
          <Select
            multiple
            size="S"
            options={DIRECTION_OPTIONS}
            value={directions}
            onChange={setDirections}
            labelText="Все направления"
          />
          {directions.length > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {directions.length}
            </span>
          )}
        </div>
        <div className={styles.selectWrap}>
          <Select
            multiple
            variant="tags"
            size="S"
            options={TAG_OPTIONS}
            value={tags}
            onChange={setTags}
            labelText="Теги"
          />
          {tags.length > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {tags.length}
            </span>
          )}
        </div>
        <Select
          size="S"
          options={PERIOD_OPTIONS}
          value={period}
          onChange={setPeriod}
          labelText="За месяц"
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="secondary">Применить</Button>
        <button className={styles.resetButton}>Сбросить фильтры</button>
      </div>
    </div>
  );
};
