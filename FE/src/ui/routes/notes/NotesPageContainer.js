import { connect } from "react-redux";
import { NotesPage } from "./NotesPage";
import { getNotesFromApi, onSubmitWriteNotes } from "../../../redux/notes/actions";
import { getNotes } from "../../../redux/notes/selectors";

const mapStateToProps = state => ({ notes: getNotes(state) });

const mapDispatchToProps = { getNotesFromApi, onSubmitWriteNotes };

export const NotesPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesPage);
