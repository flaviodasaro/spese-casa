import { useState, useEffect } from "react";
import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { SETTINGS_KEY } from "../../common/constants";
import { GenericForm } from "../../common/components/form/generic-form/GenericForm";
import { SinglePageTemplate } from "../../layout/content/single-page-template/SinglePageTemplate";
import { InputRow } from "../../common/components/form/input-row/InputRow";
import { Input } from "../../common/components/form/input/Input";
import { HOSTNAME_OPTIONS } from "../../../redux/common/constants";
import { withNamespaces } from "react-i18next";

const SettingsPageComponent = ({
  customHostname,
  isFormDisabled,
  changeCustomHostname,
  selectedHostname,
  selectHostname,
  isCustomSelected,
  setHostnameByType,
  t
}) => {
  const [hostnameOptions, setHostnameOptions] = useState([]);
  useEffect(() => {
    setHostnameOptions(
      HOSTNAME_OPTIONS.map(id => ({
        id,
        label: t(`SETTINGS.FORM.OPTION_LIST.${id}`)
      }))
    );
  }, []);
  return (
    <SinglePageTemplate h1LabelKey={"SETTINGS.TITLE"}>
      <GenericForm disableSubmitBtn={isFormDisabled} onSubmit={() => setHostnameByType(selectedHostname, customHostname)}>
        <InputRow
          Component1={
            <Input
              type="select"
              name="SETTINGS.FORM.HOSTNAME_LIST"
              labelKey="SETTINGS.FORM.HOSTNAME_LIST"
              optionList={hostnameOptions}
              value={selectedHostname}
              onChangeByValue={selectHostname}
              valueOptionProp="id"
              textOptionProp="label"
            />
          }
          Component2={
            isCustomSelected ? (
              <Input
                name="SETTINGS.FORM.CUSTOM_HOSTNAME"
                labelKey="SETTINGS.FORM.CUSTOM_HOSTNAME"
                value={customHostname}
                onChangeByValue={changeCustomHostname}
              />
            ) : (
              <></>
            )
          }
        />
        {}
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const SettingsPage = withNamespaces()(
  withChangeIconOnInit(SETTINGS_KEY)(SettingsPageComponent)
);
