import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldService } from '@entities/field';
import type { Field } from '@entities/field/types';
import { ProjectService } from '@entities/project';
import type { ProjectApplicationCard } from '@entities/project/types';
import { SkillService } from '@entities/skill';
import type { Skill as CatalogSkill } from '@entities/skill/types';
import { SpecializationService } from '@entities/specialization';
import type { Specialization } from '@entities/specialization/types';
import { UserService } from '@entities/user/UserService';
import type {
  EmploymentType,
  UserLevel,
  WorkFormat,
} from '@entities/user/types';
import { Filter, type FilterOption, type FilterSelect } from '@features/filter';
import { getServices } from '@app/store/services';
import { Button, Tag } from '@shared/ui';
import styles from './RequestsPage.module.css';

const VISIBLE_SKILLS_COUNT = 4;

const PERIOD_OPTIONS: FilterOption[] = [
  { value: 'day', label: 'За день' },
  { value: 'week', label: 'За неделю' },
  { value: 'month', label: 'За месяц' },
  { value: 'year', label: 'За год' },
  { value: 'all', label: 'За все время' },
];

const LEVEL_OPTIONS: FilterOption[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'middle', label: 'Middle' },
  { value: 'senior', label: 'Senior' },
];

const WORK_FORMAT_OPTIONS: FilterOption[] = [
  { value: 'remote', label: 'Удаленно' },
  { value: 'hybrid', label: 'Гибрид' },
];

const EMPLOYMENT_OPTIONS: FilterOption[] = [
  { value: 'full_time', label: 'Полная занятость' },
  { value: 'part_time', label: 'Частичная занятость' },
  { value: 'combined', label: 'Можно совмещать' },
];

const levelLabels: Record<UserLevel, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
};

const workFormatLabels: Record<WorkFormat, string> = {
  remote: 'Удаленно',
  hybrid: 'Гибрид',
};

const employmentLabels: Record<EmploymentType, string> = {
  full_time: 'Полная занятость',
  part_time: 'Частичная занятость',
  combined: 'Можно совмещать',
};

interface RequestsFilters {
  fieldIds: string[];
  specializationIds: string[];
  skillIds: string[];
  level: string;
  workFormat: string;
  employmentType: string;
  period: string;
}

interface ApplicationItem extends ProjectApplicationCard {
  project_id: number;
  project_title: string;
}

const emptyFilters: RequestsFilters = {
  fieldIds: [],
  specializationIds: [],
  skillIds: [],
  level: '',
  workFormat: '',
  employmentType: '',
  period: 'month',
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const getPeriodStart = (period: string): Date | null => {
  if (!period || period === 'all') return null;

  const date = new Date();

  if (period === 'day') {
    date.setDate(date.getDate() - 1);
    return date;
  }

  if (period === 'week') {
    date.setDate(date.getDate() - 7);
    return date;
  }

  if (period === 'month') {
    date.setMonth(date.getMonth() - 1);
    return date;
  }

  if (period === 'year') {
    date.setFullYear(date.getFullYear() - 1);
    return date;
  }

  return null;
};

const getInitials = (displayName: string, username: string) => {
  const nameParts = displayName.trim().split(/\s+/).filter(Boolean);
  const source = nameParts.length > 0 ? nameParts : [username];

  return source
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
};

const getImageUrl = (avatar: string | null, baseUrl: string) => {
  if (!avatar) return null;
  if (/^https?:\/\//.test(avatar)) return avatar;

  try {
    const apiUrl = new URL(baseUrl);
    return `${apiUrl.origin}${avatar}`;
  } catch {
    return avatar;
  }
};

const makeOptions = <T extends { id: number; name: string }>(
  items: T[]
): FilterOption[] =>
  items.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));

export const RequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [skills, setSkills] = useState<CatalogSkill[]>([]);
  const [draftFilters, setDraftFilters] =
    useState<RequestsFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<RequestsFilters>(emptyFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadRequests = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { api } = getServices();
        const userService = new UserService(api);
        const projectService = new ProjectService(api);
        const fieldService = new FieldService(api);
        const specializationService = new SpecializationService(api);
        const skillService = new SkillService(api);

        const [currentUser, fieldsData, specializationsData, skillsData] =
          await Promise.all([
            userService.getCurrent(),
            fieldService.list(),
            specializationService.list(),
            skillService.list(),
          ]);

        if (isCancelled) return;

        setFields(fieldsData);
        setSpecializations(specializationsData);
        setSkills(skillsData);

        if (currentUser.account_type !== 'owner') {
          setApplications([]);
          return;
        }

        const applicationGroups = await Promise.all(
          currentUser.owned_project_ids.map(async (projectId) => {
            const [project, projectApplications] = await Promise.all([
              projectService.getProjectDetail(projectId),
              projectService.getProjectApplications(projectId),
            ]);

            return projectApplications.map((application) => ({
              ...application,
              project_id: project.id,
              project_title: project.title,
            }));
          })
        );

        if (isCancelled) return;

        setApplications(
          applicationGroups
            .flat()
            .sort(
              (left, right) =>
                new Date(right.created_at).getTime() -
                new Date(left.created_at).getTime()
            )
        );
      } catch (requestError) {
        if (isCancelled) return;
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'Не удалось загрузить заявки.';
        setError(message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    void loadRequests();

    return () => {
      isCancelled = true;
    };
  }, []);

  const specializationById = useMemo(() => {
    return new Map(
      specializations.map((specialization) => [
        specialization.id,
        specialization,
      ])
    );
  }, [specializations]);

  const filteredApplications = useMemo(() => {
    const periodStart = getPeriodStart(appliedFilters.period);

    return applications.filter((application) => {
      const user = application.user;

      if (appliedFilters.fieldIds.length > 0) {
        const specialization = user.specialization_id
          ? specializationById.get(user.specialization_id)
          : undefined;

        if (
          !specialization ||
          !appliedFilters.fieldIds.includes(String(specialization.field_id))
        ) {
          return false;
        }
      }

      if (
        appliedFilters.specializationIds.length > 0 &&
        (!user.specialization_id ||
          !appliedFilters.specializationIds.includes(
            String(user.specialization_id)
          ))
      ) {
        return false;
      }

      if (
        appliedFilters.skillIds.length > 0 &&
        !user.skills.some((skill) =>
          appliedFilters.skillIds.includes(String(skill.skill_id))
        )
      ) {
        return false;
      }

      if (appliedFilters.level && user.level !== appliedFilters.level) {
        return false;
      }

      if (
        appliedFilters.workFormat &&
        user.work_format !== appliedFilters.workFormat
      ) {
        return false;
      }

      if (
        appliedFilters.employmentType &&
        user.employment_type !== appliedFilters.employmentType
      ) {
        return false;
      }

      if (
        periodStart &&
        new Date(application.created_at).getTime() < periodStart.getTime()
      ) {
        return false;
      }

      return true;
    });
  }, [applications, appliedFilters, specializationById]);

  const filterSelects: FilterSelect[] = [
    {
      key: 'fields',
      multiple: true,
      options: makeOptions(fields),
      value: draftFilters.fieldIds,
      onChange: (fieldIds) =>
        setDraftFilters((filters) => ({ ...filters, fieldIds })),
      labelText: 'Все направления',
      disabled: fields.length === 0,
    },
    {
      key: 'specializations',
      multiple: true,
      options: makeOptions(specializations),
      value: draftFilters.specializationIds,
      onChange: (specializationIds) =>
        setDraftFilters((filters) => ({ ...filters, specializationIds })),
      labelText: 'Специализация',
      disabled: specializations.length === 0,
    },
    {
      key: 'skills',
      multiple: true,
      variant: 'tags',
      options: makeOptions(skills),
      value: draftFilters.skillIds,
      onChange: (skillIds) =>
        setDraftFilters((filters) => ({ ...filters, skillIds })),
      labelText: 'Навыки',
      disabled: skills.length === 0,
    },
    {
      key: 'level',
      options: LEVEL_OPTIONS,
      value: draftFilters.level,
      onChange: (level) =>
        setDraftFilters((filters) => ({ ...filters, level })),
      labelText: 'Уровень',
    },
    {
      key: 'workFormat',
      options: WORK_FORMAT_OPTIONS,
      value: draftFilters.workFormat,
      onChange: (workFormat) =>
        setDraftFilters((filters) => ({ ...filters, workFormat })),
      labelText: 'Формат работы',
    },
    {
      key: 'employmentType',
      options: EMPLOYMENT_OPTIONS,
      value: draftFilters.employmentType,
      onChange: (employmentType) =>
        setDraftFilters((filters) => ({ ...filters, employmentType })),
      labelText: 'Занятость',
    },
    {
      key: 'period',
      options: PERIOD_OPTIONS,
      value: draftFilters.period,
      onChange: (period) =>
        setDraftFilters((filters) => ({ ...filters, period })),
      labelText: 'За месяц',
    },
  ];

  const handleReset = () => {
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const baseUrl = getServices().api.baseUrl;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.section}>
          <Button
            variant="back"
            className={styles.backButton}
            onClick={() => navigate('/')}
          >
            На главную
          </Button>
          <div className={styles.header}>
            <h2 className={styles.title}>Заявки</h2>
            <span className={styles.count}>{filteredApplications.length}</span>
          </div>

          <Filter
            className={styles.filter}
            selects={filterSelects}
            onApply={() => setAppliedFilters(draftFilters)}
            onReset={handleReset}
          />

          {isLoading && <p className={styles.state}>Загружаем заявки...</p>}

          {!isLoading && error && (
            <p className={styles.state} role="alert">
              {error}
            </p>
          )}

          {!isLoading && !error && filteredApplications.length === 0 && (
            <p className={styles.state}>
              {applications.length === 0
                ? 'Новых заявок пока нет.'
                : 'По выбранным фильтрам заявок нет.'}
            </p>
          )}

          {!isLoading && !error && filteredApplications.length > 0 && (
            <ul className={styles.list}>
              {filteredApplications.map((application) => {
                const user = application.user;
                const avatar = getImageUrl(user.avatar, baseUrl);
                const visibleSkills = user.skills.slice(
                  0,
                  VISIBLE_SKILLS_COUNT
                );
                const hiddenSkillsCount =
                  user.skills.length - visibleSkills.length;

                return (
                  <li className={styles.card} key={application.id}>
                    <div className={styles.date}>
                      <span>Дата заявки</span>
                      <time dateTime={application.created_at}>
                        {formatDateTime(application.created_at)}
                      </time>
                    </div>

                    <div className={styles.person}>
                      {avatar ? (
                        <img
                          className={styles.avatar}
                          src={avatar}
                          alt={user.display_name}
                        />
                      ) : (
                        <span className={styles.avatarFallback}>
                          {getInitials(user.display_name, user.username)}
                        </span>
                      )}

                      <div className={styles.info}>
                        <div>
                          <h3 className={styles.name}>{user.display_name}</h3>
                          <p className={styles.username}>@{user.username}</p>
                        </div>

                        <dl className={styles.meta}>
                          <div>
                            <dt>Проект</dt>
                            <dd>{application.project_title}</dd>
                          </div>
                          <div>
                            <dt>Роль</dt>
                            <dd>
                              {application.project_role_name ??
                                user.specialization_name ??
                                'Не указана'}
                            </dd>
                          </div>
                          <div>
                            <dt>Город</dt>
                            <dd>{user.city ?? 'Не указан'}</dd>
                          </div>
                          <div>
                            <dt>Уровень</dt>
                            <dd>
                              {user.level
                                ? levelLabels[user.level]
                                : 'Не указан'}
                            </dd>
                          </div>
                          <div>
                            <dt>Формат</dt>
                            <dd>
                              {user.work_format
                                ? workFormatLabels[user.work_format]
                                : 'Не указан'}
                            </dd>
                          </div>
                          <div>
                            <dt>Занятость</dt>
                            <dd>
                              {user.employment_type
                                ? employmentLabels[user.employment_type]
                                : 'Не указана'}
                            </dd>
                          </div>
                        </dl>

                        {user.workload_hours_per_week && (
                          <p className={styles.workload}>
                            {user.workload_hours_per_week} ч/неделю
                          </p>
                        )}

                        {user.skills.length > 0 && (
                          <div className={styles.tags}>
                            {visibleSkills.map((skill) => (
                              <Tag key={skill.id}>{skill.name}</Tag>
                            ))}
                            {hiddenSkillsCount > 0 && (
                              <Tag>ещё {hiddenSkillsCount}</Tag>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="tertiary"
                      className={styles.profileButton}
                      onClick={() => navigate(`/profile/${user.id}`)}
                    >
                      В профиль
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
