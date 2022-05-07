export default class Response<T> {
    public status: boolean;
    public data: T;
    public messages: string;
    public error: string;

    constructor(status: boolean, data: T, messages: string, error: string) {
        this.status = status;
        this.data = data;
        this.messages = messages;
        this.error = error;
    }
}
