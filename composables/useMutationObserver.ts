export function observeDOMChanges(callback: () => void) {
    const observer = new MutationObserver(() => {
        callback();
    });

    // Observe changes to the body or any child elements
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
