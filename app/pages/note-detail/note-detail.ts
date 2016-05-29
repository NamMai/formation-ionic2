import {Page, NavController, NavParams, Toast} from 'ionic-angular';
import {NoteService, Note} from '../../providers/note-service/note-service';


@Page({
  templateUrl: 'build/pages/note-detail/note-detail.html',
})
export class NoteDetailPage {
  note : Note = null;

  constructor(public nav: NavController, navParams: NavParams, public noteService: NoteService) {
    let passedNote = navParams.get('note');
    if (passedNote !== undefined){
      this.note = passedNote;
    }else{
      this.note = new Note('','',null, false);
      this.saveNote();
    }

  }


  public saveNote(showBadge: boolean = false){
    if (this.note.id === null){
      this.noteService.saveNote(this.note).then((data)=>{
        //set the automatic created id à notre note
        this.note.id = data.res["insertId"];
      });
    }else{
      this.noteService.updateNote(this.note);
    }
    if(showBadge){
      let toast = Toast.create({
        message:'Note saved!',
        duration: 3000
      });
      this.nav.present(toast);
    }
  }


  //appelé quand la page pop
  private onPageWillUnload(){
    this.saveNote(true);
  }
}
