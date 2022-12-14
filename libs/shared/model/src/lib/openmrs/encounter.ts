import * as Joi from 'joi';
import { Location } from './location';
import { Provider } from './provider';
import { Patient } from './patient';
import { Obs, ObsEncounterForm } from './obs';

export interface EncounterRole {
  name: string;
  description: string;
  retired: boolean;
  uuid: string;
}

export interface EncounterRoleForm {
  name: string;
  description?: string;
  uuid?: string;
}

export interface EncounterProvider {
  provider: Provider;
  encounterRole: EncounterRole;
  uuid: string;
}

export interface EncounterProviderForm {
  provider: string;
  encounterRole: string;
  uuid?: string;
}

export interface EncounterType {
  name: string;
  description?: string;
  uuid: string;
}

export interface Encounter {
  encounterDatetime: Date;
  obs: Obs[];
  patient: Patient;
  location: Location;
  encounterType: EncounterType;
  encounterProviders: EncounterProvider[];
  uuid: string;
}

export interface EncounterForm {
  encounterDatetime?: Date;
  obs: ObsEncounterForm[];
  patient: string;
  location: string;
  encounterType: string;
  encounterProviders: EncounterProviderForm[];
  uuid?: string;
}

export const ENCOUNTER_INITIAL_VALUES: EncounterForm = {
  patient: '',
  encounterProviders: [{ encounterRole: '', provider: '' }],
  location: '',
  obs: [],
  encounterDatetime: undefined,
  encounterType: '',
  uuid: undefined,
};

export const encounterSchema = Joi.object<EncounterForm>({
  encounterDatetime: Joi.date()
    .required()
    .messages({ 'any.required': 'Ce champ est requis' }),
  location: Joi.string().required().messages({
    'string.empty': 'La structure est requise',
    'string.required': 'La structure est requise',
  }),
  encounterType: Joi.string().required().messages({
    'string.empty': 'Ce champ est requise',
    'string.required': 'Ce champ est requise',
  }),
  patient: Joi.when('uuid', {
    is: Joi.string().exist(),
    then: Joi.string().required().messages({
      'string.empty': 'Le patient est requis',
      'string.required': 'Le patient est requis',
    }),
    otherwise: Joi.optional(),
  }),
  encounterProviders: Joi.optional(),
  obs: Joi.optional(),
  uuid: Joi.optional(),
});
