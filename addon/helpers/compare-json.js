import { helper } from '@ember/component/helper';

export function compareJson([a, b]/*, hash*/) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default helper(compareJson);
