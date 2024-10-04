import generatePromptIcon from '@/public/icon/generate-prompt-icon.svg';
import insertIconImg from '@/public/icon/insert-icon.svg';
import regenerateIcon from '@/public/icon/regenerate-icon.svg';
import { appendUserMessage, updateAIResponse, insertMessageToLinkedIn } from "@/utils/messageHandler.ts";
import './style.css';

const staticMessage = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."; // This is the message that the AI will send back

// This function shows the modal
export function showModal() {
    const modal = createModal();
    document.body.appendChild(modal); // Add the modal to the webpage

    const aiIcon = document.getElementById('ai__icon-id'); // Find the AI icon to close the modal when clicked outside

    // This function checks if a click is outside the modal or the AI icon
    const handleOutsideClick = (event: MouseEvent) => {
        if (modal && aiIcon) {
            const isOutsideModal = !modal.contains(event.target as Node); // Check if the click is outside the modal
            const isOutsideAiIcon = !aiIcon.contains(event.target as Node); // Check if the click is outside the AI icon

            // If the click was outside both, close the modal
            if (isOutsideModal && isOutsideAiIcon) {
                closeModal(modal); // Close the modal
                window.removeEventListener('click', handleOutsideClick); // Stop listening for outside clicks
            }
        }
    };

    window.addEventListener('click', handleOutsideClick); // Start listening for clicks outside the modal
}

// This function creates the modal structure
function createModal(): HTMLDivElement {
    const modal = document.createElement('div'); // Create a div for the modal
    modal.className = 'modal';

    const messageContainer = createMessageContainer(); // Create a place to show messages
    const inputField = createInputField(); // Create an input box for the user
    const buttonContainer = createButtonContainer(inputField, messageContainer); // Create a place for buttons

    modal.appendChild(messageContainer); // Add the message area to the modal
    modal.appendChild(inputField); // Add the input box to the modal
    modal.appendChild(buttonContainer); // Add the buttons to the modal

    return modal; // Return the completed modal
}

// This function creates the message display area
function createMessageContainer(): HTMLDivElement {
    const messageContainer = document.createElement('div'); // Create a div to show messages
    messageContainer.className = 'message-container'; // Add a class to style the message area
    return messageContainer; // Return the message area
}

// This function creates the input box for user messages
function createInputField(): HTMLInputElement {
    const inputField = document.createElement('input'); // Create an input box
    inputField.type = 'text';
    inputField.placeholder = 'Your Prompt';
    inputField.className = 'input-field';
    return inputField;
}

// This function creates the buttons in the modal
function createButtonContainer(inputField: HTMLInputElement, messageContainer: HTMLDivElement): HTMLDivElement {
    const buttonContainer = document.createElement('div'); // Create a div for buttons
    buttonContainer.className = 'button-container';

    // Create the Generate button
    const generateButton = document.createElement('button');
    generateButton.className = 'generate-button';

    // Create the icon for the Generate button
    const generateIcon = document.createElement('img');
    generateIcon.src = generatePromptIcon; // Set the icon image
    generateIcon.alt = 'Generate Icon';
    generateIcon.style.width = '16px';
    generateIcon.style.height = '16px';
    generateIcon.style.marginRight = '8px';

    generateButton.appendChild(generateIcon); // Add the icon to the button
    generateButton.appendChild(document.createTextNode('Generate')); // Add text to the button
    buttonContainer.appendChild(generateButton); // Add the Generate button to the container

    // Handle click event for the Generate button
    generateButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the modal from closing when the button is clicked
        handleGenerate(inputField, messageContainer, buttonContainer); // Call the function to generate a response
    });

    return buttonContainer;
}

// This function runs when the user clicks the Generate button
function handleGenerate(inputField: HTMLInputElement, messageContainer: HTMLDivElement, buttonContainer: HTMLDivElement) {
    const userMessage = inputField.value.trim(); // Get the user's message and remove extra spaces

    // Check if the user has typed a message
    if (userMessage) {
        appendUserMessage(messageContainer, userMessage); // Show the user's message in the container
        inputField.value = '';
        updateAIResponse(messageContainer, staticMessage); // Show the static response from the AI

        // Now replace the Generate button with options to Insert or Regenerate
        replaceGenerateButton(buttonContainer, messageContainer); // Change the buttons in the container
    } else {
        alert('Please enter a prompt!'); // Alert the user if the input box is empty
    }
}

// This function replaces the Generate button with Insert and Regenerate buttons
function replaceGenerateButton(buttonContainer: HTMLDivElement, messageContainer: HTMLDivElement) {
    buttonContainer.innerHTML = ''; // Clear the current buttons

    // Create and add the Insert button
    const insertButton = document.createElement('button');
    insertButton.className = 'insert-button';
    const insertIcon = document.createElement('img');
    insertIcon.src = insertIconImg;
    insertIcon.alt = 'Insert Icon';
    insertIcon.style.width = '16px';
    insertIcon.style.height = '16px';
    insertIcon.style.marginRight = '8px';

    insertButton.appendChild(insertIcon); // Add the icon to the button
    insertButton.appendChild(document.createTextNode('Insert')); // Add text to the button
    buttonContainer.appendChild(insertButton); // Add the Insert button to the container

    // Create and add the Regenerate button
    const regenerateButton = document.createElement('button');
    regenerateButton.className = 'regenerate-button';
    const regenerateImg = document.createElement('img');
    regenerateImg.src = regenerateIcon;
    regenerateImg.alt = 'Regenerate Icon';
    regenerateImg.style.width = '16px';
    regenerateImg.style.height = '16px';
    regenerateImg.style.marginRight = '8px'; // Add space between icon and text

    regenerateButton.appendChild(regenerateImg); // Add the icon to the button
    regenerateButton.appendChild(document.createTextNode('Regenerate')); // Add text to the button
    buttonContainer.appendChild(regenerateButton); // Add the Regenerate button to the container

    // Insert button functionality
    insertButton.addEventListener('click', () => {
        insertMessageToLinkedIn(staticMessage); // Insert the static message to LinkedIn Message Box
        closeModal(buttonContainer); // Close the modal after sending the message
    });

    // Regenerate button functionality
    regenerateButton.addEventListener('click', () => regenerateMessage(messageContainer)); // Call function to regenerate the message
}

// This function regenerates the AI's response
function regenerateMessage(container: HTMLDivElement) {
    updateAIResponse(container, staticMessage); // Update the message with the static response
}

// This function closes the modal
function closeModal(modal: HTMLDivElement) {
    if (modal) {
        modal.remove(); // Remove the modal from the webpage
    }
}
