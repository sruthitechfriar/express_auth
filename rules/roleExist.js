import { Rule } from "simple-body-validator";
import Role from "../models/role.js";

class RoleExist extends Rule {
  async passes(value) {
    const role = await Role.findOne({ name: value });
    if (role) {
      return false;
    } else {
      return true;
    }
  }

  getMessage() {
    return "Invalid role specified.";
  }
}
export default RoleExist;
