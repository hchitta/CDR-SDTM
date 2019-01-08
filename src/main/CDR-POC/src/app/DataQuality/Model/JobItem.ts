import { Timestamp } from "rxjs/Rx";

export class JobItem {

    uniqueId: number;
    study: string;
    form: string;
    category: string;
    check: string;
    variable: string;
    input: string;
    jobStatus: string;
    jobStartTimestamp: Date;
    jobEndTimestamp: Date;
    message: string;

}