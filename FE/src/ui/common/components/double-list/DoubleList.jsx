import "./DoubleList.scss";
import { withNamespaces } from "react-i18next";

const CustomUl = withNamespaces()(({ contentClassName, keyGetter, TextGetterComponent, list, titleKey, t }) => {
  return (
    <div className={contentClassName || ""}>
      <h5 className="title-h5">{t(titleKey)}</h5>
      <ul>
        {list &&
          list.map(el => {
            return <li key={keyGetter(el)}>{TextGetterComponent({el})}</li>;
          })}
      </ul>
    </div>
  );
});

const DoubleList = ({ list1Props, list2Props }) => {
  return (
    <div className="whole-container">
        <CustomUl {...list1Props} />
        <CustomUl {...list2Props} />
    </div>
  );
};

export { DoubleList };
