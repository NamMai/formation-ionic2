import {Page, NavController} from 'ionic-angular';
import {NoteService, Note} from '../../providers/note-service/note-service';
import {NoteDetailPage} from '../note-detail/note-detail';
import {Truncate} from '../../pipes/truncate';

@Page({
  templateUrl: 'build/pages/done/done.html',
  pipes: [Truncate]
})
export class DoneClass {
notes : Note[];
  constructor(public nav: NavController, public noteService: NoteService) {
  }

  private loadNotes() {
    this.notes = [];
    this.noteService.getNotes().then(
      data => {
        this.notes = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.notes.push(new Note(item.title, item.text, item.id, item.checked));
          }
        }
      });
  }


  //push the details page pour la note selectionnée
  public noteSelected(item: Note){
    this.nav.push(NoteDetailPage, {'note': item});
  }

  public removeNote(note: Note){
    this.noteService.removeNote(note);

    let index = this.notes.indexOf(note);
    if (index > -1){
       this.notes.splice(index,1);
    }
}

public checkthat(note : Note){
  this.noteService.checkthatNote(note);

  /*let index = this.notes.indexOf(note);
  if (index > -1){
    this.notes[index].checked = !note.checked;
  }*/
}

  private onPageDidEnter(){
    this.loadNotes();
  }
}
