import {Observable, Subject, Subscription} from 'rxjs';

export class SubAppService {
    static appName: Subject<string> = new Subject();
    static appNames = new Subscription();
    static appName$: Observable<string> = SubAppService.appName.asObservable();
    constructor(){}
    static update(appName: string) {
        SubAppService.appName.next(appName);
    }
    static add(subscription: Subscription) {
        SubAppService.appNames.add(subscription);
    }
}
