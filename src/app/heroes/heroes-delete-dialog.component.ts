import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-heroes-delete-dialog',
  templateUrl: './heroes-delete-dialog.component.html'
})

export class HeroesDeleteDialogComponent implements OnInit {
  onDelete: Subject<void> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<HeroesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string) { }

  ngOnInit() { }
  onNoClick(){
      this.dialogRef.close();
  }

  close(){
    this.onDelete.next();
    this.dialogRef.close();
  }
}
