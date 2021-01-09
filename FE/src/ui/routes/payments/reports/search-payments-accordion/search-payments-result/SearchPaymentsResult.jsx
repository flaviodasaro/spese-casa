import { useState } from "react";
import { formatTmsToDateDDMMYYYY } from "../../../../../../redux/common/utils";
import { Button } from "../../../../../common/components/form/button/Button";
import { Input } from "../../../../../common/components/form/input/Input";
import { PaymentsTable } from "../../../payments-table/PaymentsTable";
import "./SearchPaymentsResult.scss";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { IconWithTooltip } from "../../../../../common/components/icon-with-tooltip/IconWithTooltip";
import { withNamespaces } from "react-i18next";
import "./SearchPaymentsResult.scss";

const dataColumns = [
  {
    paymentKey: "idPagamento",
    headerLabelKey: "REPORTS.PAYMENT_ID"
  },
  {
    paymentKey: "utentePagante",
    headerLabelKey: "PAYMENTS.PAY_USER",
    valueGetter: utente => utente && utente.username
  },
  {
    paymentKey: "gruppoPartecipante",
    headerLabelKey: "PAYMENTS.PARTECIPATION_GROUP",
    valueGetter: gruppo => gruppo && gruppo.nomeGruppo
  },
  {
    paymentKey: "categoriaSpesa",
    headerLabelKey: "PAYMENTS.INPUT_CATEGORY",
    valueGetter: categoriaSpesa =>
      categoriaSpesa && categoriaSpesa.nomeCategoria
  },
  {
    paymentKey: "flgPagato",
    headerLabelKey: "REPORTS.PAID",
    valueGetter: flag => !!flag,
    componentRender: ({ payObj, valueGetter }) => (
      <Input type="checkbox" disabled checked={valueGetter(payObj)} />
    )
  },
  {
    paymentKey: "importo",
    headerLabelKey: "PAYMENTS.INPUT_AMOUNT"
  },
  {
    paymentKey: "descrizione",
    headerLabelKey: "PAYMENTS.DESCRIPTION"
  },
  {
    paymentKey: "tmsInserimento",
    headerLabelKey: "REPORTS.DATA_INS",
    valueGetter: formatTmsToDateDDMMYYYY
  },
  {
    paymentKey: "tmsModifica",
    headerLabelKey: "REPORTS.DATA_MOD",
    valueGetter: formatTmsToDateDDMMYYYY
  }
];

export const SearchPaymentsResult = withNamespaces()(
  ({
    payments,
    fetched,
    aggregateAmount,
    markPaymentsAsPaid,
    lastFetchRequest,
    t
  }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    return (
      <div className="wrapper">
        <div className="pay-btn-row">
          {fetched && (
            <span>
              <Button
                onClick={() => {
                  markPaymentsAsPaid(selectedRows, lastFetchRequest);
                }}
                width="100px"
                disabled={selectedRows.length === 0}
              >
                <IconWithTooltip
                  fontAwesomeIconProps={{ icon: faMoneyCheck, size: "lg" }}
                  tooltipMessageI18nKey="REPORTS.MARK_AS_PAID"
                />
              </Button>
            </span>
          )}
        </div>
        <div>
          {fetched && (
            <p>
              <span>{`${t("REPORTS.TOTAL")}${aggregateAmount} €`}</span>
            </p>
          )}
        </div>
        <PaymentsTable
          inquiryDataStructure
          withCheckboxColumn
          payments={payments}
          dataColumns={dataColumns}
          onChangeSelection={setSelectedRows}
          isUnselectable={payment => payment.flgPagato}
        />
      </div>
    );
  }
);
