import aiIconImg from '@/public/icon/ai-icon.svg';
import { showModal } from '@/components/AiModal/index.ts';
import './style.css';

// This function adds the AI icon to all editable message boxes on the page
export function addAIIconToMessageBoxes() {
    const messageBoxes = document.querySelectorAll<HTMLDivElement>('.msg-form__contenteditable[contenteditable="true"]'); // Select all editable message boxes

    messageBoxes.forEach((messageBox) => {
        const messageBoxParent = messageBox.parentElement; // Get the parent element of the message box

        // Proceed only if the parent exists and does not already contain the AI icon
        if (messageBoxParent && !messageBoxParent.querySelector('.ai-icon-container')) {
            const iconContainer = createIconContainer(); // Create container for AI icon
            const aiIcon = createAIIcon(); // Create the AI icon element

            // Append the AI icon to the icon container and then to the message box parent
            iconContainer.appendChild(aiIcon);
            messageBoxParent.style.position = 'relative';
            messageBoxParent.appendChild(iconContainer);

            // Add event listeners to handle focus and blur events on the message box
            messageBox.addEventListener('focus', () => toggleIconVisibility(iconContainer, 'flex')); // Show icon on focus
            messageBox.addEventListener('blur', (event) => handleBlur(event, iconContainer, aiIcon)); // Hide icon on blur
            aiIcon.addEventListener('click', showModal); // Show modal when AI icon is clicked
        }
    });
}

// This function creates and returns the container for the AI icon
function createIconContainer(): HTMLDivElement {
    const container = document.createElement('div'); // Create a new div for the icon container
    container.className = 'ai-icon-container';
    container.id = 'ai__icon-id'; // Set an ID for the icon container
    return container;
}

// This function creates and returns the AI icon element
function createAIIcon(): HTMLImageElement {
    const icon = document.createElement('img'); // Create a new image element
    icon.src = aiIconImg;
    icon.alt = 'AI Icon';
    return icon;
}

// This function toggles the visibility of the AI icon container
function toggleIconVisibility(iconContainer: HTMLDivElement, display: string) {
    iconContainer.style.display = display;
}

// This function handles the blur event for the message box
function handleBlur(event: FocusEvent, iconContainer: HTMLDivElement, aiIcon: HTMLImageElement) {
    // Add a small delay to allow for clicks on the icon
    setTimeout(() => {
        // Only hide the icon if focus moves outside the AI icon
        if (!aiIcon.contains(event.relatedTarget as Node)) {
            toggleIconVisibility(iconContainer, 'none'); // Hide the icon container
        }
    }, 300); // Delay to allow the icon click to register
}
