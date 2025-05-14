export enum ErrorCode {
    INVALID_CHARACTER_NAME = 400,
    INVALID_DATE = 401,
    INVALID_OCID = 402,
    MISSING_API_KEY = 500,
    UNKNOWN = 501,
    NEXON_FAILED = 4000
}

const errorMessageMap: Record<ErrorCode, string>  = {
    [ErrorCode.INVALID_CHARACTER_NAME]: "Invalid character name",
    [ErrorCode.INVALID_DATE]: "Invalid request date",
    [ErrorCode.INVALID_OCID]: "Invalid OCID",
    [ErrorCode.MISSING_API_KEY]: "Missing API Key",
    [ErrorCode.UNKNOWN]: "An Unknown error has occured",
    [ErrorCode.NEXON_FAILED]: "Request failed"
}

export class AppError extends Error {
    code: ErrorCode;
    status: number;

    constructor(code: ErrorCode, status: number = 500, message?: string) {
        super(message);
        this.code = code;
        this.status = status;
        if (message === undefined) {
            this.message = errorMessageMap[code];
        }
    }
}
