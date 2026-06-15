import { Api } from '../../shared/api/api.class';
import type { Specialization, SpecializationListParams } from './types';
import { SPECIALIZATIONS } from '@shared/api/constants';

export class SpecializationService {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  list(params?: SpecializationListParams): Promise<Specialization[]> {
    return this.api.get<Specialization[]>(SPECIALIZATIONS, params);
  }
}
