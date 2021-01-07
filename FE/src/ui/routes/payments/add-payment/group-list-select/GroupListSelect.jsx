import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../../../common/components/form/input/Input";
import { IconWithTooltip } from "../../../../common/components/icon-with-tooltip/IconWithTooltip";
import { AssociationsModal } from "../associations-modal/AssociationsModal";
import "./GroupListSelect.scss";

export const GroupListSelect = ({
  groupList,
  selectedGroupId,
  selectGroupId,
  selectedGroupName,
  associationList,
  isAssociationsModalOpen,
  onOpenAssociationListModal,
  closeAssociationsModal
}) => {
  const isIconEnabled = groupList.length > 0 && !!selectedGroupId;
  const iconWrapperClass = `${isIconEnabled ? "" : "disabled "}icon-wrapper`;
  return (
    <>
      <div className="wrapper">
        <div className="input-wrapper">
          <Input
            type="select"
            valueOptionProp="idGruppo"
            textOptionProp="nomeGruppo"
            optionList={groupList}
            name="GROUPS.GROUP_LIST"
            labelKey="PAYMENTS.PARTECIPATION_GROUP"
            value={selectedGroupId}
            onChange={event => selectGroupId(event.target.value)}
          />
        </div>
        <div
          onClick={() => {
            isIconEnabled && onOpenAssociationListModal(selectedGroupId);
          }}
          className={iconWrapperClass}
        >
          <IconWithTooltip
            tooltipMessageI18nKey="PAYMENTS.OPEN_ASSOCIATIONS_MODAL"
            fontAwesomeIconProps={{ icon: faLink }}
          />
        </div>
      </div>
      <AssociationsModal
        associationList={associationList}
        groupName={selectedGroupName}
        isOpen={isAssociationsModalOpen}
        onClose={closeAssociationsModal}
      />
    </>
  );
};
