import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Users: {},
};

const pluralNames = {  Users: 'Users' }

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
