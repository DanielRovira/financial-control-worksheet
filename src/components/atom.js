import { atom } from 'jotai';

export const languageAtom = atom(process.env.REACT_APP_LANG);

// import { useAtom } from 'jotai'
// import { languageAtom } from 'components/atom'

// const [language, setLanguage] = useAtom(languageAtom);

// import { useAtomValue } from 'jotai'
// const language = useAtomValue(languageAtom)
// const lang = require(`components/Languages/${language}.json`);

// const setLanguage = useSetAtom(languageAtom)
