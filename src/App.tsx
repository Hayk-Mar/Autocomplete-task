import styles from "./App.module.css";
import AutoComplete from "containers/AutoComplete";

function App() {

    return (
        <div className={styles.App}>
            <header className={styles.appHeader}>
                <h1>Auto Complete</h1>
                <AutoComplete />
            </header>
        </div>
    );
}

export default App;
