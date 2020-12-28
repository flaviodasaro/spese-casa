import { withChangeIconOnInit } from "../../../common/hocs/withChangeIconOnInit";
import { USERS_KEY } from "../../../common/constants";
import { useState } from "react";
import { FeedbackModal } from "../../../common/components/feedback-modal/FeedbackModal";
import { withNamespaces } from "react-i18next";
import { GenericForm } from "../../../common/components/form/generic-form/GenericForm";
import "./AddUserPage.scss";

const AddUserPageComponent = ({ t }) => {
  const [open, setOpen] = useState(false);
  const handleSubmit = ({ formDataEntries }) => {
    for (let el of formDataEntries) {
      console.log(el);
      console.log(el[0]);
      console.log(el[1]);
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
        {/* <form onSubmit={handleSubmit}>
          <Input name="username" />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form> */}
      </div>
      <button onClick={() => setOpen(true)}>OPEN MODAL</button>
      <FeedbackModal
        isSuccess
        isOpen={open}
        title={t("USERS.TITLE")}
        subtitle={t("USERS.SUBTITLE_OK")}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const AddUserPage = withNamespaces()(
  withChangeIconOnInit(USERS_KEY)(AddUserPageComponent)
);
