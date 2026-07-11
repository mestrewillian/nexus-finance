import Constants from 'expo-constants';

export const appConfig = {
  name: Constants.expoConfig?.name ?? 'Nexus Finance',
  version: Constants.expoConfig?.version ?? 'Não informada',
} as const;