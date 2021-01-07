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

const handleValueGetter = (payObj, payment) => {
  if (!payObj) {
    return "";
  }
  if (payObj.valueGetter) {
    return payObj.valueGetter(payment);
  }
  if (payObj.useRawValue) {
    return payObj.value;
  }
  return "";
};

export const PaymentsTable = withNamespaces()(
  ({ dataColumns, actionColumns, payments, handleInputChange, t }) => {
    if (!payments) {
      return <></>;
    }

    return (
      <Table className="payment-table">
        <TableHead className="payment-table-head">
          <TableRow>
            {dataColumns.map(col => (
              <TableCell key={col.paymentKey} className="test-class-name" {...col.additionalHeadCellProps}>
                {t(col.headerLabelKey)}
              </TableCell>
            ))}
            {actionColumns.map(action => (
              <TableCell key={action.actionKey} className="test-class-name" {...action.additionalHeadCellProps}>
                {t(action.headerLabelKey)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((pay, index) => {
            return (
              <TableRow key={pay.idPagamento || `PaymentsTableRow_${index}`}>
                {dataColumns.map(col => {
                  const {
                    paymentKey,
                    inquiry,
                    inputType,
                    optionList,
                    valueOptionProp,
                    textOptionProp
                  } = col;
                  const payObj = pay[paymentKey];

                  if (!payObj) {
                    return <TableCell></TableCell>;
                  }

                  return (
                    <TableCell {...col.additionalCellProps}>
                      {inquiry ? (
                        handleValueGetter(payObj, pay)
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
                    <TableCell {...action.additionalCellProps} className={`icon-settings ${action.additionalClassname}`}>
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
  payments: []
};
