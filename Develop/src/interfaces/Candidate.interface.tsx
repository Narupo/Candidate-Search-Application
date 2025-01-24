// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    readonly name: string | undefined;
    readonly login: string //| null;
    readonly location: string | null;
    readonly avatar_url: string;
    readonly email: string;
    readonly html_url: string;
    readonly company: string | null;
}

