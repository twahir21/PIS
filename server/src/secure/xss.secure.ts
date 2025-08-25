import xss from "xss";

export const xssNum = (input: number | string): number => {
    const num = Number(input);
    return isNaN(num) ? 0 : num;
};

export const xssStr = (input: string): string => xss(input);
