import {Observable, Subject, Subscription} from 'rxjs';

export class IsLoginService {
    public static login: Subject<boolean> = new Subject();
    public static logins = new Subscription();
    public static login$: Observable<boolean> = IsLoginService.login.asObservable();
    constructor() {}
    public static update(loginState: boolean) {
        IsLoginService.login.next(loginState);
    }
    public static add(subscription: Subscription) {
        IsLoginService.logins.add(subscription);
    }
}
