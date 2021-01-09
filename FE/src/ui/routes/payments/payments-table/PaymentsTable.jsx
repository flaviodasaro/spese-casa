import { withNamespaces } from "react-i18next";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Input } from "../../../common/components/form/input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PaymentsTable.scss";
import { isFalsyExceptZero } from "../../../../redux/common/utils";
import { useState, useEffect } from "react";

const CheckboxCell = ({ checked, onChange, hideCheckbox }) => (
  <TableCell padding="checkbox">
    {!hideCheckbox && <Input type="checkbox" checked={checked} onChange={onChange} />}
  </TableCell>
);

const handleValueGetter = (payObj, valueGetter, componentRender) => {
  if (componentRender) {
    return componentRender({ payObj, valueGetter });
  } else if (isFalsyExceptZero(payObj)) {
    return "";
  } else if (valueGetter) {
    return valueGetter(payObj);
  } else {
    return payObj;
  }
};

/**
 * 
 * inquiryDataStructure = true -> 
 *  -> payments = [{
        categoriaSpesa: { idCategoriaSpesa: 1, nomeCategoria: "ALIMENTARI" },
        descrizione: null,
        flgPagato: false,
        gruppoPartecipante: {
          idGruppo: 1,
          nomeGruppo: "SmartPausing",
          noteGruppo: "Tanto paga sempre Calò"
        },
        idPagamento: 2,
        importo: 20.5,
        tmsInserimento: "2020-12-23T14:13:01.675+00:00",
        tmsModifica: null,
        ...
      }]
 * 
 *  inquiryDataStructure = false -> 
 *    -> payments = [{
      categoriaSpesa: { value: "1" },
      descrizione: { value: "asad" },
      flgPagato: { value: true },
      gruppoPartecipante: { value: "1" },
      idPagamento: { value: "1" },
      importo: { value: 12 },
      ...
    }]
 * 
 * 
 */

export const PaymentsTable = withNamespaces()(
  ({
    dataColumns,
    actionColumns,
    payments,
    handleInputChange,
    inquiryDataStructure,
    withCheckboxColumn,
    onChangeSelection,
    isUnselectable,
    t
  }) => {
    if (!payments) {
      return <></>;
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const [unselectableRows, setUnselectableRows] = useState([]);

    useEffect(() => {
      setUnselectableRows(payments.filter(pay => isUnselectable(pay)).map(pay => pay.idPagamento));
    }, [payments]);

    function changeSelectionSingle(index) {
      const add = isFalsyExceptZero(selectedRows.find(el => el === index));
      let newRows = [];
      if (add) {
        newRows = selectedRows.concat([index]);
      } else {
        newRows = selectedRows.filter(el => el !== index);
      }
      setSelectedRows(newRows);

      onChangeSelection && onChangeSelection(newRows);
    }
    function isHeadCheckboxSelected() {
      return selectedRows.length === payments.length - unselectableRows.length;
    }
    function changeSelectionAll() {
      let newRows = [];
      if (!isHeadCheckboxSelected()) {
        //select all
        newRows = payments.map(el => el.idPagamento);
      }
      setSelectedRows(newRows);
      onChangeSelection && onChangeSelection(newRows);
    }

    return (
      <Table className="payment-table">
        <TableHead className="payment-table-head">
          <TableRow>
            {withCheckboxColumn && (
              <CheckboxCell
                checked={isHeadCheckboxSelected()}
                onChange={changeSelectionAll}
              />
            )}
            {dataColumns.map(col => (
              <TableCell
                key={col.paymentKey}
                className="test-class-name"
                {...col.additionalHeadCellProps}
              >
                {t(col.headerLabelKey)}
              </TableCell>
            ))}
            {actionColumns.map(action => (
              <TableCell
                key={action.actionKey}
                className="test-class-name"
                {...action.additionalHeadCellProps}
              >
                {t(action.headerLabelKey)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((pay, index) => {
            const { idPagamento } = pay;
            const isSelected = selectedRows.includes(idPagamento);
            return (
              <TableRow
                key={idPagamento || `PaymentsTableRow_${index}`}
                className={`${isSelected ? "selected" : ""}`}
              >
                {withCheckboxColumn && (
                    <CheckboxCell
                      checked={isSelected}
                      hideCheckbox = {unselectableRows.includes(idPagamento)}
                      onChange={() => changeSelectionSingle(idPagamento)}
                    />
                  )}
                {dataColumns.map(col => {
                  const {
                    paymentKey,
                    valueGetter,
                    componentRender,
                    inputType,
                    optionList,
                    valueOptionProp,
                    textOptionProp
                  } = col;
                  const payObj = pay[paymentKey];
                  if (payObj === null || payObj === undefined) {
                    return <TableCell></TableCell>;
                  }

                  return (
                    <TableCell {...col.additionalCellProps}>
                      {inquiryDataStructure ? (
                        handleValueGetter(payObj, valueGetter, componentRender)
                      ) : (
                        <Input
                          type={inputType}
                          value={payObj.value}
                          optionList={optionList}
                          valueOptionProp={valueOptionProp}
                          textOptionProp={textOptionProp}
                          onChange={event =>
                            handleInputChange(
                              index,
                              paymentKey,
                              event.target.value
                            )
                          }
                        />
                      )}
                    </TableCell>
                  );
                })}
                {actionColumns.map(action => {
                  const { iconName, handleClick } = action;
                  return (
                    <TableCell
                      {...action.additionalCellProps}
                      className={`icon-settings ${action.additionalClassname}`}
                    >
                      <FontAwesomeIcon
                        icon={iconName}
                        size="2x"
                        onClick={() => handleClick(index)}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
);

PaymentsTable.defaultProps = {
  dataColumns: [],
  actionColumns: [],
  payments: [],
  isUnselectable: payment => false //by default all is selectable
};
