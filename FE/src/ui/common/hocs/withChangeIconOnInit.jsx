import { useEffect } from "react";
import { connect } from "react-redux";
import { getIconObjectByKey, getMenuItems } from "../../../redux/menu/selectors";
import { changeActiveIcon } from "../../../redux/menu/actions";

const mapStateToProps = state => ({
  getIconObjByKey: key => getIconObjectByKey(key)(state),
  menuItems:getMenuItems(state)
});

const mapDispatchToProps = {
  changeActiveIcon
};

const disconnectedWithChangeIconOnInit = iconKey => WrappedComponent => props => {
  const { getIconObjByKey, changeActiveIcon, menuItems } = props;
  useEffect(() => {
    const iconObj = getIconObjByKey(iconKey);
    iconObj && changeActiveIcon(iconObj);
  }, [menuItems]);
  return (
    <>
      <WrappedComponent {...props} />
    </>
  );
};

export const withChangeIconOnInit = iconKey => WrappedComponent =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(disconnectedWithChangeIconOnInit(iconKey)(WrappedComponent));
