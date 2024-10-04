import { addAIIconToMessageBoxes } from '@/components/AiIcon/index.ts';
import { observeDOMChanges } from '@/composables/useMutationObserver';

export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('LinkedIn AI icon script loaded.');
    // Initialize the AI icon and observe DOM changes
    addAIIconToMessageBoxes();
    observeDOMChanges(addAIIconToMessageBoxes);
  },
});
