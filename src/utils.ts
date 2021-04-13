import { createLocalStorageStateHook } from 'use-local-storage-state';

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const useSavedWordBookSettings = createLocalStorageStateHook('wordBookSettings', {
  showTranslate: true,
  showButtons: true,
  activePage: 0,
});

export default getRandomNumber;
