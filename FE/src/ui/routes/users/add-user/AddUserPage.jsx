import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import "./AddUserPage.scss";

const AddUserPageComponent = ({ mockSuccess }) => {
  const handleSubmit = ({ formDataEntries }) => {
    for (let el of formDataEntries) {
      console.log(el);
      console.log(el[0]);
      console.log(el[1]);
      setTimeout(() => mockSuccess(1), 1000);
    }
  };
  return (
    <div>
      <h1 className="h1-txt">Aggiungi utente</h1>
      <div className="form-wrapper">
        <GenericForm
          inputPropsList={[
            { name: "username", label: "username", value: 123 },
            { name: "pw", label: "pw" },
            { name: "pw1", label: "pw1" },
            { name: "pw2", label: "pw2" },
            { name: "pw3", label: "pw3" }
          ]}
          onSubmit={handleSubmit}
          submitLabelKey={"SUBMIT"}
        />
      </div>
    </div>
  );
};

export const AddUserPage = withChangeIconOnInit(USERS_KEY)(
  AddUserPageComponent
);
