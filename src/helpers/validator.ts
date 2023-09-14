import { ALPHABET_REGEXP } from "constants/regexp";

export const checkAlphabeticalText = (val: string) => {
    if (val.match(ALPHABET_REGEXP)) {
        return true;
    }

    return false;
};
