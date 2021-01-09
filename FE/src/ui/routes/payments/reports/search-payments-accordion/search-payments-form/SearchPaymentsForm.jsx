import { useState } from "react";
import { GenericForm } from "../../../../../common/components/form/generic-form/GenericForm";
import { InputRow } from "../../../../../common/components/form/input-row/InputRow";
import { Input } from "../../../../../common/components/form/input/Input";

export const SearchPaymentsForm = ({
  userList,
  selectedUserId,
  selectUserIds,
  groupList,
  selectedGroupId,
  selectGroupId,
  categoryList,
  onSubmit
}) => {
  const [paymentId, changePaymentId] = useState();
  const [importoMin, changeImportoMin] = useState();
  const [importoMax, changeImportoMax] = useState();
  const [selectedCategory, selectCategory] = useState(null);
  const [description, changeDescription] = useState(null);
  const [flgPagato, changeFlgPagato] = useState(null);
  const [dateInsMin, setDateInsMin] = useState(null);
  const [dateInsMax, setDateInsMax] = useState(null);
  const [dateModMin, setDateModMin] = useState(null);
  const [dateModMax, setDateModMax] = useState(null);
  return (
    <div>
      <GenericForm
        submitLabelKey="COMMON.FORM.SEARCH"
        withClearButton={false}
        onSubmit={() => {
          onSubmit({
            idPagamento: paymentId,
            idUtentePagante: selectedUserId,
            idGruppoPartecipante: selectedGroupId,
            idCategoriaSpesa: selectedCategory,
            flgPagato: flgPagato,
            importoMin: importoMin,
            importoMax: importoMax,
            descrizione: description,
            tmsInserimentoMin: dateInsMin,
            tmsInserimentoMax: dateInsMax,
            tmsModificaMin: dateModMin,
            tmsModificaMax: dateModMax
          });
        }}
      >
        <InputRow
          Component1={
            <Input
              type="number"
              labelKey="REPORTS.PAYMENT_ID"
              value={paymentId}
              onChangeByValue={changePaymentId}
            />
          }
          Component2={
            <Input
              type="select"
              name="GROUPS.USER_LIST"
              labelKey="PAYMENTS.PAY_USER"
              optionList={userList}
              value={selectedUserId}
              onChange={event => selectUserIds([event.target.value])}
              valueOptionProp="idUtente"
              textOptionProp="username"
            />
          }
          marginBottom="50px"
        />
        <InputRow
          Component1={
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
          }
          Component2={
            <Input
              type="select"
              labelKey="PAYMENTS.INPUT_CATEGORY"
              optionList={categoryList}
              valueOptionProp="idCategoriaSpesa"
              textOptionProp="nomeCategoria"
              value={selectedCategory}
              onChange={event => selectCategory(event.target.value)}
            />
          }
          marginBottom="50px"
        />
        <InputRow
          Component1={
            <Input
              labelKey="PAYMENTS.DESCRIPTION"
              value={description}
              onChangeByValue={changeDescription}
            />
          }
          Component2={
            <Input
              type="select"
              labelKey="REPORTS.PAID"
              optionList={[
                { value: true, text: "True" },
                { value: false, text: "False" }
              ]}
              value={flgPagato}
              onChangeByValue={changeFlgPagato}
            />
          }
          marginBottom="50px"
        />
        <InputRow
          Component1={
            <Input
              type="number"
              labelKey="REPORTS.IMPORTO_MIN"
              value={importoMin}
              onChangeByValue={changeImportoMin}
            />
          }
          Component2={
            <Input
              type="number"
              labelKey="REPORTS.IMPORTO_MAX"
              value={importoMax}
              onChangeByValue={changeImportoMax}
            />
          }
          marginBottom="50px"
        />
        <InputRow
          Component1={
            <Input
              type="date-picker"
              labelKey="REPORTS.DATA_INS_MIN"
              value={dateInsMin}
              onChange={setDateInsMin}
            />
          }
          Component2={
            <Input
              type="date-picker"
              labelKey="REPORTS.DATA_INS_MAX"
              value={dateInsMax}
              onChange={setDateInsMax}
            />
          }
          marginBottom="50px"
        />
        <InputRow
          Component1={
            <Input
              type="date-picker"
              labelKey="REPORTS.DATA_MOD_MIN"
              value={dateModMin}
              onChange={setDateModMin}
            />
          }
          Component2={
            <Input
              type="date-picker"
              labelKey="REPORTS.DATA_MOD_MAX"
              value={dateModMax}
              onChange={setDateModMax}
            />
          }
          marginBottom="50px"
        />
      </GenericForm>
    </div>
  );
};
