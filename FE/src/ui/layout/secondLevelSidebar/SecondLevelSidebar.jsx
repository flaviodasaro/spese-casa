import "./SecondLevelSidebar.scss";

export const SecondLevelSidebar = props => {
    const { closed, onClick } = props;
    return <div className={`second-level-sidebar ${closed ? 'closed' : 'open'}`} onClick={onClick} />;
  };