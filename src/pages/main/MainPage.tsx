import { Hero } from '@widgets/hero';
import { Opportunities } from '@widgets/opportunities';
import { Questions } from '@widgets/questions';
import { WeeklyProjects } from '@widgets/weeklyProjects';

export const MainPage: React.FC = () => {
  return (
    <>
      <Hero />
      <WeeklyProjects />
      <Opportunities />
      <Questions />
    </>
  );
};
