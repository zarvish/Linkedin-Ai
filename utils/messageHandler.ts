// utils/messageUtils.ts

export function appendUserMessage(container: HTMLDivElement, message: string) {
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message'; // Apply user message class
    userMessageElement.textContent = message;

    container.appendChild(userMessageElement);
}

export function updateAIResponse(container: HTMLDivElement, newMessage: string) {
    const aiResponseElement = document.getElementById('ai-response');

    if (aiResponseElement) {
        aiResponseElement.style.opacity = '0'; // Fade out
        setTimeout(() => {
            aiResponseElement.textContent = newMessage;
            aiResponseElement.style.opacity = '1'; // Fade in
        }, 300); // Delay for fade-out effect
    } else {
        const newAiResponseElement = document.createElement('div');
        newAiResponseElement.className = 'ai-response'; // Apply AI response class
        newAiResponseElement.textContent = newMessage;
        newAiResponseElement.id = 'ai-response';
        newAiResponseElement.style.opacity = '1'; // Ensure it's visible initially
        container.appendChild(newAiResponseElement);
    }
}

export function insertMessageToLinkedIn(message: string) {
    const linkedInMessageBox = document.querySelector('.msg-form__contenteditable') as HTMLElement;
    const placeholderElement = document.querySelector('.msg-form__placeholder') as HTMLElement;

    if (linkedInMessageBox) {
        linkedInMessageBox.innerHTML = '';

        const pElement = document.createElement('p');
        pElement.textContent = message;

        linkedInMessageBox.appendChild(pElement);
        linkedInMessageBox.focus();

        const range = document.createRange();
        const selection = window.getSelection();
        selection?.removeAllRanges();

        range.selectNodeContents(linkedInMessageBox);
        range.collapse(false);

        if (selection) {
            selection.addRange(range);
        }

        linkedInMessageBox.dispatchEvent(new Event('input', { bubbles: true }));

        if (placeholderElement) {
            placeholderElement.classList.remove('msg-form__placeholder');
        }
    } else {
        console.error('LinkedIn message box not found.');
    }
}
