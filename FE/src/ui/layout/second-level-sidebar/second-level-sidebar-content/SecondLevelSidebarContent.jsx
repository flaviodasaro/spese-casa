import "./SecondLevelSibarContent.scss";

const Element = ({ label, onClick }) => (
  <>
    <p className="paragraph" onClick={onClick}>
      {label}
    </p>
  </>
);

export const SecondLevelSidebarContent = ({
  clickedIcon,
  navigateAndCloseSidebar
}) => {
  if (!clickedIcon) {
    return <></>;
  }

  const { children } = clickedIcon;
  return (
    <div className="second-level-sidebar-content">
      {children ? (
        children.map(el => (
          <Element
            key={el.key}
            label={el.label}
            onClick={event => navigateAndCloseSidebar(el.route)}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
