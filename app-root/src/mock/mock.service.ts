// @ts-ignore
import Mock from "mockjs";
import { EnableTypeEnum } from "@/constants/enums/enable-type.enum";

const MockService = {
  init() {
    if (process.env.VUE_APP_ENABLE_MOCK === EnableTypeEnum.YES.code) {
      let configArray: any[] = [];
      const files = require.context(".", true, /\.mock.ts$/);
      files.keys().forEach(key => {
        configArray = configArray.concat(files(key).default);
      });
      configArray.forEach(item => {
        for (const [path, target] of Object.entries(item)) {
          const protocol = path.split("|");
          Mock.mock(new RegExp("^" + `.*?${protocol[1]}`), protocol[0], target);
        }
      });
    }
  }
};
export default MockService;
