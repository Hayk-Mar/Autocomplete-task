import { useRef, useState } from "react";
import useOutsideClick from 'hooks/useOutsideClick';
import useFetchWords from "services/useFetchWords";
import MatchingWordsList from "components/MatchingWordsList";
import Loading from "components/Loading";
import {checkAlphabeticalText} from 'helpers/validator';
import { ALPHABET_LETTERS_ONLY } from "constants/validatorsErrors";
import styles from "./styles.module.css";

const SearchInput = () => {
    const [search, setSearch] = useState<string>("");
    const [autoCompleteWords, setAutoCompleteWords] = useState<string[]>([]);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
    const { loading, setLoading, abortRequest, fetchAndFilterWords } = useFetchWords();
    const [error, setError] = useState<string>("");
    const [hideAutoCompleteDropdown, setHideAutoCompleteDropdown] = useState(false);
    const containerRef = useRef(null);

    useOutsideClick({
        ref: containerRef,
        callback: () => {
            setHideAutoCompleteDropdown(true);
        },
    });

    const displayAutoComplete = (autoCompleteWords.length > 1 || (autoCompleteWords.length && autoCompleteWords[0] !== search)) && !hideAutoCompleteDropdown && !error;

    const getMatchingWords = async (val: string) => {
        const response: string[] | ReturnType<typeof Object> = await fetchAndFilterWords(val);

        if(response?.hasError) {
            setAutoCompleteWords([]);
            return setError(response.message);
        }
        
        setAutoCompleteWords(response);
    };

    const withDebouncedSearch = (value: string, delay: number = 300) => {
        const trimmedValue = value.trim();
        setSearch(trimmedValue);

        const isMatch = trimmedValue ? checkAlphabeticalText(trimmedValue) : true;

        if (timer) {
            clearTimeout(timer);
            abortRequest();
        }

        if (!isMatch) {
            return setError(ALPHABET_LETTERS_ONLY);
        }

        setError('');

        if (!trimmedValue) {
            setLoading(false);
            return setAutoCompleteWords([]);
        }

        setLoading(true);
        setTimer(setTimeout(() => getMatchingWords(trimmedValue), delay));
    };

    const selectWord = (val: string) => {
        setSearch(val);
        getMatchingWords(val);
    };

    return (
        <div 
            className={styles.autoCompleteContainer}
            ref={containerRef} 
        >
            <input
                type="text"
                value={search}
                placeholder="Enter some word"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    withDebouncedSearch(e.target.value)
                }
                onFocus={() => setHideAutoCompleteDropdown(false)}
                className={displayAutoComplete ? styles.dropdownOpened : ""}
            />

            {error ? (
                <p className={styles.errorMessage}>{error}</p>
            ) : (
                <>
                    {loading ? (
                        <Loading />
                    ) : displayAutoComplete ? (
                        <MatchingWordsList
                            search={search}
                            listOfMatchingWords={autoCompleteWords}
                            updateSearchValue={selectWord}
                        />
                    ) : null}

                    {search && !autoCompleteWords.length && !loading && (
                        <p className={styles.noResults}>No Results :(</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchInput;
