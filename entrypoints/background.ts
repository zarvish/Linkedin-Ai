export default defineBackground(() => {

    console.log('Background script running...');

    const quoteOfTheDay = "“The only way to do great work is to love what you do.” – Steve Jobs";
    console.log(`Quote of the Day: ${quoteOfTheDay}`);

    // Fun fact about me
    const funFact = "Fun Fact: I’m passionate about pushing the boundaries of technology while keeping the human element at the core of every solution.";
    console.log(funFact);

    // Example of handling browser events
    browser.runtime.onInstalled.addListener(() => {
        console.log('Extension successfully installed. Ready to create something awesome!');
    });

    console.log("Background script ready and excited for what's to come!");

});
