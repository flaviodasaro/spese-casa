export const isFalsyExceptZero = input => (input === 0 ? false : !input);

export const formatTmsToDateDDMMYYYY = tms => {
    if(tms){
        const parts = tms.split("T");
        const parts2 = parts[0].split("-");
        return `${parts2[2]}/${parts2[1]}/${parts2[0]}`
    }
}