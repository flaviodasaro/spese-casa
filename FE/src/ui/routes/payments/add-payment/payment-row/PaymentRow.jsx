import { Input } from "../../../../common/components/form/input/Input";

const editModeColumns = [
  { value: "idPagamento" },
  { valueGetter: pay => pay.utentePagante && pay.utentePagante.idUtente },
  { valueGetter: pay => pay.utentePagante && pay.utentePagante.username },
  { valueGetter: pay => pay.gruppoPartecipante && pay.gruppoPartecipante.idGruppo },
  { valueGetter: pay => pay.gruppoPartecipante && pay.gruppoPartecipante.nomeGruppo }
];

const deleteModeColumns = ["idPagamento"];

//const StaticColumn = ({ value }) => {};

const InquiryPaymentColumn = ({ payment, columnSettings }) => {
  const { value, valueGetter } = columnSettings;
  const val = valueGetter ? valueGetter(payment) : value;
  return (
    <div>
      <span>{val}</span>
    </div>
  );
};

const EditPaymentColumn = ({ payment, columnSettings }) => {
    const { value, type,  } = columnSettings;
    const val = valueGetter ? valueGetter(payment) : value;
    return (
      <Input />
    );
  };

export const PaymentRow = ({
  payment,
  onDelete,
  clone,
  markAsPaid,
  editMode
}) => {
  return (
    <div>
      {staticColumns.map(col => (
        <InquiryPaymentColumn payment={payment} columnSettings={col} />
      ))}
      {onDelete && <InquiryPaymentColumn></InquiryPaymentColumn>}
    </div>
  );
};
