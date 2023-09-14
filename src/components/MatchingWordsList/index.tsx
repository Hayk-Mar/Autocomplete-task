import DisplayWords from "./DisplayWords";
import styles from "./styles.module.css";

type PropType = {
    search: string;
    listOfMatchingWords: string[];
    updateSearchValue: Function;
};

const AutoCompleteDropdown = ({
    search,
    listOfMatchingWords,
    updateSearchValue,
}: PropType) => {
    return (
        <ul className={styles.dropdownContainer}>
            {listOfMatchingWords.map((word: string) =>
                word !== search ? (
                    <DisplayWords
                        key={word} // We specified the word as key parameter because each word is unique
                        search={search}
                        word={word}
                        updateSearchValue={updateSearchValue}
                    />
                ) : null
            )}
        </ul>
    );
};

export default AutoCompleteDropdown;
