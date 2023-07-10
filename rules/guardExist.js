import { Rule } from "simple-body-validator";

class GuardExist extends Rule {
  passes(value) {
    return value === 'admin';
  }

  getMessage() {
    return "Not authorized.";
  }
}
export default GuardExist;
