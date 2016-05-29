import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';


export class Note {
  title: string;
  text: string;
  id: number;
  checked : boolean;
  constructor(title: string, text: string, id: number, checked: boolean) {
    this.title = title;
    this.text = text;
    this.id = id;
    this.checked = checked;
  }
}

@Injectable()
export class NoteService {
  storage: Storage = null;

  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT, checked BOOLEAN)');
  }

  // Get all notes of our DB
  public getNotes() {
    return this.storage.query('SELECT * FROM notes');
  }

  // Save a new note to the DB
  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text, checked) VALUES (?,?, ?)';
    return this.storage.query(sql, [note.title, note.text, true]);
  }

  // Update an existing note with a given ID
  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }

  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }

  public checkthatNote(note: Note){

    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\", checked = \"' + !note.checked + '\" WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }
}
