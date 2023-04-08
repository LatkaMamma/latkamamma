export class Email {
    params: {[key: string]: string} = {};
    path: string;

    constructor(path: string, params: {[key: string]: string}) {
        this.path = path;
        this.params = params;
    }
}

export class Subscription extends Email {
    constructor(params: {name: string, url: string}) {
        super('subscription', params);
    }
}