import { DataGrid } from "@material-ui/data-grid";
import { GenericForm } from "../../common/components/form/generic-form/GenericForm";
import { InputRow } from "../../common/components/form/input-row/InputRow";
import { Input } from "../../common/components/form/input/Input";
import { SinglePageTemplate } from "../../layout/content/single-page-template/SinglePageTemplate";
import { withNamespaces } from "react-i18next";
import { SPENDING_CATEGORIES_KEY } from "../../common/constants";
import "./SpendingCategories.scss";

const columns = [
  { field: "idCategoriaSpesa", headerName: "Id", width: 70 },
  {
    field: "nomeCategoria",
    headerName: "Nome Categoria",
    width: 250
  },
  { field: "noteCategoria", headerName: "Note Categoria", width: 750 }
];

const SpendingCategoriesComponent = withNamespaces()(
  ({
    t,
    categoryList,
    nomeCategoria,
    noteCategoria,
    changeSpendingCategoryName,
    changeSpendingCategoryNotes,
    fetchAllSpendingCategories,
    insertSpendingCategory
  }) => {
    return (
      <SinglePageTemplate
        h1LabelKey="SPENDING_CATEGORIES.TITLE"
        onInit={fetchAllSpendingCategories}
      >
        <div className="table-wrapper">
          <DataGrid columns={columns} rows={categoryList} pageSize={10} />
        </div>
        <h2 className="heading">{t("SPENDING_CATEGORIES.SUBTITLE")}</h2>
        <GenericForm
          withClearButton={false}
          disableSubmitBtn={!nomeCategoria || !noteCategoria}
          onSubmit={() => {
            insertSpendingCategory(nomeCategoria, noteCategoria).then(res =>
              fetchAllSpendingCategories()
            );
          }}
        >
          <InputRow
            Component1={
              <Input
                name="SPENDING_CATEGORIES.NAME"
                labelKey="SPENDING_CATEGORIES.NAME"
                value={nomeCategoria}
                onChange={event =>
                  changeSpendingCategoryName(event.target.value)
                }
              />
            }
            Component2={
              <Input
                name="SPENDING_CATEGORIES.NOTES"
                labelKey="SPENDING_CATEGORIES.NOTES"
                value={noteCategoria}
                onChange={event =>
                  changeSpendingCategoryNotes(event.target.value)
                }
              />
            }
          />
        </GenericForm>
      </SinglePageTemplate>
    );
  }
);

export const SpendingCategories = withChangeIconOnInit(SPENDING_CATEGORIES_KEY)(SpendingCategoriesComponent);