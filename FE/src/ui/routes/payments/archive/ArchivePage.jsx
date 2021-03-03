import { useEffect, useState, useCallback, useRef } from "react";
import { DoubleList } from "../../../common/components/double-list/DoubleList";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import { PAYMENTS_KEY } from "../../../common/constants";
import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { PaymentsTable } from "../payments-table/PaymentsTable";
import { SinglePageTemplate } from "../../../layout/content/single-page-template/SinglePageTemplate";
import { staticActionColumns } from "../commons";
import "./ArchivePage.scss";
import { IconWithTooltip } from "../../../common/components/icon-with-tooltip/IconWithTooltip";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const keyGetter = el => el && el.userId;

const getAmountClassName = amount => {
  if (amount > 0) {
    return "positive";
  }
  if (amount < 0) {
    return "negative";
  }
  return "";
};

const TextGetterComponent = ({ el }) => {
  return (
    el && (
      <>
        <span className="username">{el.username}</span>
        <span className={`amount ${getAmountClassName(el.amount)}`}>
          {el.amount} €
        </span>
      </>
    )
  );
};

const commonListProps = {
  contentClassName: "utenti-list",
  keyGetter,
  TextGetterComponent
};

const recalculateAmount = (obj, newAmount) => ({
  ...obj,
  amount: (Number(obj.amount || 0) + Number(newAmount || 0)).toFixed(2)
});

const getDataColumns = (utentiBrv, utentiKtv) => [
  {
    paymentKey: "utenteBrv",
    headerLabelKey: "PAYMENTS.INPUT_CATEGORY",
    inputType: "select",
    optionList: utentiBrv,
    valueOptionProp: "userId",
    textOptionProp: "username",
    additionalCellProps: {}
  },
  {
    paymentKey: "utenteKtv",
    headerLabelKey: "PAYMENTS.INPUT_CATEGORY",
    inputType: "select",
    optionList: utentiKtv,
    valueOptionProp: "userId",
    textOptionProp: "username",
    additionalCellProps: {}
  },
  {
    paymentKey: "amount",
    headerLabelKey: "PAYMENTS.INPUT_AMOUNT",
    inputType: "number",
    additionalCellProps: {}
  }
];

const emptyPay = {
  utenteBrv: { value: "" },
  utenteKtv: { value: "" },
  amount: { value: "" }
};

let timeoutId = null;

const debouncedCallback = (callback, debounceTime = 400) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(callback, debounceTime);
};

const ArchiveComponent = ({ aggregateData, handleArchiveInit }) => {
  const [utentiBrvOrigin, setUtentiBrvOrigin] = useState([]);
  const [utentiBrv, setUtentiBrv] = useState([]);
  const [utentiKtvOrigin, setUtentiKtvOrigin] = useState([]);
  const [utentiKtv, setUtentiKtv] = useState([]);
  const [payments, setPayments] = useState([emptyPay]);
  const [actionColumns, setActionColumns] = useState(staticActionColumns);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const fakeButtonRef = useRef(null);

  const init = useCallback(() => {
    if (aggregateData) {
      const newUtentiBrv = aggregateData.filter(agg => agg.amount > 0);
      const newUtentiKtv = aggregateData.filter(agg => agg.amount < 0);
      setUtentiBrv(newUtentiBrv);
      setUtentiBrvOrigin(newUtentiBrv);
      setUtentiKtv(newUtentiKtv);
      setUtentiKtvOrigin(newUtentiKtv);
    }
  }, [aggregateData]);

  const resetForm = useCallback(() => {
    setPayments([emptyPay]);
    init();
  }, [aggregateData]);

  const mockClick = useCallback(() => {
    setTimeout(() => {
      fakeButtonRef &&
        fakeButtonRef.current &&
        fakeButtonRef.current.click &&
        fakeButtonRef.current.click();
    }, 300);
  }, [fakeButtonRef]);

  const onChangePayments = useCallback(() => {
    let newUtentiBrv = [...utentiBrvOrigin];
    let newUtentiKtv = [...utentiKtvOrigin];

    payments.forEach(pay => {
      const { amount, utenteBrv, utenteKtv } = pay;
      newUtentiBrv = newUtentiBrv.map(brv => {
        if (brv.userId !== utenteBrv.value) {
          return brv;
        } else {
          return recalculateAmount(brv, -Number(amount.value));
        }
      });
      newUtentiKtv = newUtentiKtv.map(ktv => {
        if (ktv.userId !== utenteKtv.value) {
          return ktv;
        } else {
          return recalculateAmount(ktv, Number(amount.value));
        }
      });
    });

    setUtentiBrv(newUtentiBrv);
    setUtentiKtv(newUtentiKtv);
  }, [payments, utentiBrvOrigin, utentiKtvOrigin]);

  useEffect(() => {
    setDisableSubmit(payments.some(pay => pay.amount != 0));
  }, [payments]);

  useEffect(() => {
    init();
  }, [aggregateData]);

  useEffect(() => {
    setActionColumns(
      actionColumns.map(el => ({
        ...el,
        handleClick: index => {
          if (el.actionKey === "deleteRow") {
            setPayments(payments.filter((_, i) => i !== index));
            mockClick();
          }else{
            setPayments(payments.concat([payments[index]]));
            mockClick();
          }
        }
      }))
    );
  }, [payments]);

  return (
    <SinglePageTemplate onInit={handleArchiveInit(true)}>
      <DoubleList
        list1Props={{
          ...commonListProps,
          list: utentiBrv,
          titleKey: "Utenti BRV"
        }}
        list2Props={{
          ...commonListProps,
          list: utentiKtv,
          titleKey: "Utenti KTV"
        }}
      />
      <GenericForm
        disableSubmitBtn={disableSubmit}
        onSubmit={() => console.log("Pay: ", payments)}
        onClearForm={resetForm}
      >
        <PaymentsTable
          dataColumns={getDataColumns(utentiBrv, utentiKtv)}
          actionColumns={actionColumns}
          payments={payments}
          handleInputChange={(index, key, value) => {
            const newPayments = payments.map((el, i) => {
              if (i !== index) {
                return el;
              }
              return { ...el, [key]: { ...el[key], value } };
            });
            setPayments(newPayments);
            if (key === "amount") {
              debouncedCallback(mockClick);
            } else {
              mockClick();
            }
          }}
        />

        <div style={{ display: "none" }}>
          <p ref={fakeButtonRef} onClick={() => onChangePayments()}></p>
        </div>

        <div className="add-icon-wrapper">
          <span>
            <IconWithTooltip
              tooltipMessageI18nKey="PAYMENTS.ADD_ROW"
              fontAwesomeIconProps={{
                icon: faPlus,
                size: "3x",
                onClick: () => {
                  setPayments(payments.concat(emptyPay));
                }
              }}
            />
          </span>
        </div>
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const ArchivePage = withChangeIconOnInit(PAYMENTS_KEY)(ArchiveComponent);
