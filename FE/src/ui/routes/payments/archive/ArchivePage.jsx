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
import { faMoneyCheck, faPlus, faMagic } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../common/components/form/button/Button";

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

const orderByAmountDescCallback = (a, b) =>
  Math.abs(Number(b.amount || 0)) - Math.abs(Number(a.amount || 0));
const filterNoAmountCallback = utente => utente.amount != 0;

const mapCallback = (userId, newAmount) => utente => {
  if (userId !== utente.userId) {
    return utente;
  }

  return {
    ...utente,
    amount: Number(
      Math.abs(Math.abs(Number(utente.amount || 0)) - newAmount).toFixed(2)
    )
  };
};

const getFilteredandSortedArray = array =>
  array.filter(filterNoAmountCallback).sort(orderByAmountDescCallback);

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
  amount: (
    Number(obj.amount || 0) +
    Number(newAmount || 0) +
    0.0000000001
  ).toFixed(2)
});

const getDataColumns = (utentiBrv, utentiKtv) => [
  {
    paymentKey: "utenteBrv",
    headerLabelKey: "PAYMENTS.ARCHIVE.BRV_USERS_SINGULAR",
    inputType: "select",
    optionList: utentiBrv,
    valueOptionProp: "userId",
    textOptionProp: "username",
    additionalCellProps: {}
  },
  {
    paymentKey: "utenteKtv",
    headerLabelKey: "PAYMENTS.ARCHIVE.KTV_USERS_SINGULAR",
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
  const [initDone, setInitDone] = useState(false);

  const fakeButtonRef = useRef(null);
  const mockClick = useCallback(() => {
    setTimeout(() => {
      fakeButtonRef &&
        fakeButtonRef.current &&
        fakeButtonRef.current.click &&
        fakeButtonRef.current.click();
    }, 300);
  }, [fakeButtonRef]);

  const autoMode = useCallback(() => {
    if (initDone) {
      const newUtentiBrv = aggregateData.filter(agg => agg.amount > 0);
      const newUtentiKtv = aggregateData.filter(agg => agg.amount < 0);
      let utentiBrvCycle = getFilteredandSortedArray([...newUtentiBrv]);
      let utentiKtvCycle = getFilteredandSortedArray([...newUtentiKtv]);
      let iterationCounter = 0;
      const resultPay = [];
      while (
        iterationCounter < 50 &&
        utentiBrvCycle.length > 0 &&
        utentiKtvCycle.length > 0
      ) {
        //step1: select utenteBrv e utenteKtv non ancora azzerati
        const utenteBrv = utentiBrvCycle[0];
        const utenteKtv = utentiKtvCycle[0];

        //step2: calcola amount min
        const amountBrv = utenteBrv.amount;
        const amountKtv = utenteKtv.amount;
        const min = Math.min(Math.abs(amountBrv), Math.abs(amountKtv));

        //step3: add to result
        resultPay.push({
          amount: { value: min },
          utenteBrv: { value: utenteBrv.userId },
          utenteKtv: { value: utenteKtv.userId }
        });

        //step4: subtract to local arrays and refilter + resort
        utentiBrvCycle = getFilteredandSortedArray(
          utentiBrvCycle.map(mapCallback(utenteBrv.userId, min))
        );
        utentiKtvCycle = getFilteredandSortedArray(
          utentiKtvCycle.map(mapCallback(utenteKtv.userId, min))
        );

        //step5: increase counter for debugging and escaping reasons
        ++iterationCounter;
      }

      setPayments(resultPay);
      mockClick();
    }
  }, [aggregateData, initDone, mockClick]);

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
    const isDisabled = utentiBrv
      .concat(utentiKtv)
      .some(utente => utente.amount != 0);
    setDisableSubmit(isDisabled);
  }, [utentiBrv, utentiKtv]);

  useEffect(() => {
    init();
    setInitDone(true);
  }, [aggregateData]);

  useEffect(() => {
    setActionColumns(
      actionColumns.map(el => ({
        ...el,
        handleClick: index => {
          if (el.actionKey === "deleteRow") {
            setPayments(payments.filter((_, i) => i !== index));
            mockClick();
          } else {
            setPayments(
              payments.concat([{ ...payments[index], amount: { value: 0 } }])
            );
            mockClick();
          }
        }
      }))
    );
  }, [payments, utentiBrv, utentiKtv]);

  return (
    <SinglePageTemplate onInit={handleArchiveInit(true)} h1LabelKey={"PAYMENTS.ARCHIVE.TITLE"} >
      <DoubleList
        list1Props={{
          ...commonListProps,
          list: utentiBrv,
          titleKey: "PAYMENTS.ARCHIVE.BRV_USERS_PLURAL"
        }}
        list2Props={{
          ...commonListProps,
          list: utentiKtv,
          titleKey: "PAYMENTS.ARCHIVE.KTV_USERS_SINGULAR"
        }}
      />
      <div className="auto-mode-wrapper">
        <Button
          onClick={autoMode}
          width="100px"
          disabled={!initDone}
        >
          <span>
            Auto Mode
          </span>
          <IconWithTooltip
            fontAwesomeIconProps={{ icon: faMagic, size: "lg" }}
            tooltipMessageI18nKey="PAYMENTS.ARCHIVE.AUTO_MODE"
          />
        </Button>
      </div>
      <GenericForm
        disableSubmitBtn={disableSubmit}
        onSubmit={() => console.log("Pay: ", payments)}
        onClearForm={resetForm}
      >
        <PaymentsTable
          dataColumns={getDataColumns(utentiBrv, utentiKtv)}
          actionColumns={actionColumns}
          payments={payments}
          handleInputChange={(index, key, inputValue) => {
            const newPayments = payments.map((el, i) => {
              if (i !== index) {
                return el;
              }
              let value = inputValue;
              const updatedRawObj = { ...el, [key]: { ...el[key], value } };
              if (key !== "amount") {
                const { utenteBrv, utenteKtv } = updatedRawObj;
                if (
                  utenteBrv &&
                  utenteKtv &&
                  utenteBrv.value &&
                  utenteKtv.value
                ) {
                  const amountBrv = Number(
                    utentiBrv.find(ut => ut.userId === utenteBrv.value).amount
                  );
                  const amountKtv = Number(
                    utentiKtv.find(ut => ut.userId === utenteKtv.value).amount
                  );
                  const min = Math.min(
                    Math.abs(amountBrv),
                    Math.abs(amountKtv)
                  );
                  updatedRawObj.amount = { value: min };
                }
              }

              return updatedRawObj;
            });
            setPayments(newPayments);
            if (key === "amount") {
              setDisableSubmit(true);
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
