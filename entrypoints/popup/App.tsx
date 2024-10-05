import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

function App() {
    return (
        <>
            <div>
                <a href="https://wxt.dev" target="_blank">
                    <img src={wxtLogo} className="logo" alt="WXT logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1 >LinkedIn AI Reply System</h1>
            <div className="card">
                <p>
                    This system helps you generate smart and professional replies on LinkedIn.
                    Use AI to craft responses that enhance your networking and save time!
                </p>

            </div>
        </>
    );
}

export default App;
