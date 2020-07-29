import {SysDictInfo} from "../entity/domain/SysDictInfo";
const dictPrefix = 'DICT-';


export const DictionaryService = {
    initDictionary(appName: string, dictionarys: any[]): void {
        let dictionary:any = {};
        dictionarys.forEach(e => {
            dictionary[e.name] = e.fields;
        });
        localStorage.setItem(dictPrefix + appName, JSON.stringify(dictionary));
    },
    getDictionary(key: string | undefined, appName: string): SysDictInfo[] {
        if(!!key) {
            if(!!appName) {
                let dictionary: any = localStorage.getItem(dictPrefix + appName);
                dictionary = JSON.parse(dictionary);
                return dictionary[key];
            }
        }
        return [];
    },
    getNameByCode(name: string, code: string, appName: string): string {
        const dicts = DictionaryService.getDictionary(name, appName);
        const dictionary: any = dicts.find((e: any) => e.code === code);
        return dictionary.text;
    },
}
