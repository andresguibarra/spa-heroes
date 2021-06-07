import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-heroes-edit-dialog',
  templateUrl: './heroes-edit-dialog.component.html'
})

export class HeroesEditDialogComponent implements OnInit {
  onDialogClose: Subject<string> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<HeroesEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string) { }

  ngOnInit() { }
  onNoClick(){
      this.dialogRef.close();
  }

  close(){
    this.onDialogClose.next(this.name);
    this.dialogRef.close();
  }
}
