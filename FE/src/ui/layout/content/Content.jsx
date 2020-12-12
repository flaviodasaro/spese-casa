import "./Content.scss";

export const Content = ({children, onClick}) => {
  return <div onClick={onClick} className="content">{children}</div>;
};
