import {Observable, Subject, Subscription} from 'rxjs';

export class IsLoginService {
    static login: Subject<boolean> = new Subject();
    static logins = new Subscription();
    static login$: Observable<boolean> = IsLoginService.login.asObservable();
    constructor(){}
    static update(loginState: boolean) {
        IsLoginService.login.next(loginState);
    }
    static add(subscription: Subscription) {
        IsLoginService.logins.add(subscription);
    }
}
