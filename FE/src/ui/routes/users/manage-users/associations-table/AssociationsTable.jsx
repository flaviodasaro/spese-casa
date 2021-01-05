import { DataGrid } from "@material-ui/data-grid";


const columns = [
    { field: "idAssociazioneUtenteGruppo", headerName: "Id", width: 70 },
    {
      field: "idUtente",
      valueGetter: params => params.row.utente.idUtente,
      headerName: "Id utente",
      width: 130
    },
    {
      field: "usernameUtente",
      valueGetter: params => params.row.utente.username,
      headerName: "Username utente",
      width: 250
    },
    { field: "tmsInserimento", headerName: "Tms Inserimento", width: 250 }
  ];

export const AssociationsTable = ({
  rows,
  pageSize,
  checkboxSelection,
  onSelectionChange
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      checkboxSelection={checkboxSelection}
      onSelectionChange={onSelectionChange}
    />
  );
};

AssociationsTable.defaultProps = {
  rows: [],
  pageSize: 5,
  checkboxSelection: false
};
