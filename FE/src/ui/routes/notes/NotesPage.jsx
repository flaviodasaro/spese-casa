import { GenericForm } from "../../common/components/form/generic-form/GenericForm";
import { TextArea } from "../../common/components/form/TextArea";
import { NOTES_KEY } from "../../common/constants";
import { withChangeIconOnInit } from "../../common/hocs/withChangeIconOnInit";
import { SinglePageTemplate } from "../../layout/content/single-page-template/SinglePageTemplate";
import "./Notes.scss";

const NotesPageComponent = ({ notes, getNotesFromApi, onSubmitWriteNotes }) => {
  return (
    <SinglePageTemplate onInit={getNotesFromApi} h1LabelKey={"MENU.NOTES"}>
      <GenericForm
        onSubmit={onSubmitWriteNotes}
        onClearForm={getNotesFromApi}
      >
        <div className="text-area-wrapper">
          <TextArea name="notesTextArea" value={notes}></TextArea>
        </div>
      </GenericForm>
    </SinglePageTemplate>
  );
};

export const NotesPage = withChangeIconOnInit(NOTES_KEY)(NotesPageComponent);
