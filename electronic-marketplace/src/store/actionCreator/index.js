import * as UserActionCreators from "../state/actions/userActions";
import * as CategoryActionCreators from "../state/actions/categoryActions";
import * as ManufacturerActions from "../state/actions/manufacturerActions";
import * as RoleActions from "../state/actions/rolesActions";


const actions = {
  ...UserActionCreators,
  ...CategoryActionCreators,
  ...ManufacturerActions,
  ...RoleActions,
};

export default actions;
