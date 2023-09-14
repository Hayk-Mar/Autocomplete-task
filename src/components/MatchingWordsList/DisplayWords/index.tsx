import styles from './styles.module.css';

type PropType = {
    word: string;
    search: string;
    updateSearchValue: Function;
};

const DisplayWords = ({ word, search, updateSearchValue }: PropType) => {
    const regex = new RegExp(search, "gi");
    const highlightedWord = word.replace(
        regex,
        (match) => `<span class=${styles.highlight}>${match}</span>`
    );

    return (
        <li
            onClick={() => updateSearchValue(word)}
            className={styles.displayWordsLi}
            dangerouslySetInnerHTML={{ __html: highlightedWord }}
        />
    );
};

export default DisplayWords;
