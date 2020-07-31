import {Observable, Subject, Subscription} from 'rxjs';

export class SubAppService {
    public static appName: Subject<string> = new Subject();
    public static appNames = new Subscription();
    public static appName$: Observable<string> = SubAppService.appName.asObservable();
    constructor() {}
    public static update(appName: string) {
        SubAppService.appName.next(appName);
    }
    public static add(subscription: Subscription) {
        SubAppService.appNames.add(subscription);
    }
}
