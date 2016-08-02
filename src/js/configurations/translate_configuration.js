import ru from '../../localization/ru';
import en from '../../localization/en';
export function translateConfiguration ($translateProvider) {
$translateProvider
  .useSanitizeValueStrategy(null)
  .translations('en', en) 
  .translations('ru', ru) 
  .fallbackLanguage(['en', 'ru'])
  .useMissingTranslationHandlerLog()
  .preferredLanguage('en')
  .registerAvailableLanguageKeys(['en', 'ru'], {
    'en_*': 'en',
    'ru_*': 'ru',
    'uk_*': 'ru',
    'be_*': 'ru'
  })
  .determinePreferredLanguage()
  .useLocalStorage();
}