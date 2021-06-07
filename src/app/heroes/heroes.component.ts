import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroesDeleteDialogComponent } from './heroes-delete-dialog.component';
import { HeroesEditDialogComponent } from './heroes-edit-dialog.component';
import { HeroesService } from './heroes.service';
import { Hero } from './models';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  @ViewChild('heroInput', { static: true }) heroInput: HTMLInputElement;
  heroes: Hero[] = [];
  filterText: string;
  constructor(private heroesService: HeroesService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.heroes = await this.heroesService.getAll().toPromise();
  }

  async delete(id: number) {
    const dialogRef = this.dialog.open(HeroesDeleteDialogComponent, {
      width: '250px',
      data: this.heroes.find((h) => h.id === id).name,
    });

    dialogRef.componentInstance.onDelete.subscribe(async () => {
      await this.heroesService.delete(id).toPromise();
      await this.getAll();
    });
  }

  async update(id: number, name: string) {
    const dialogRef = this.dialog.open(HeroesEditDialogComponent, {
      width: '250px',
      data: name,
    });

    dialogRef.componentInstance.onDialogClose.subscribe(async (value) => {
      await this.heroesService.update(id, value).toPromise();
      await this.getAll();
    });
  }

  async getByParameter() {
    this.heroes = await this.heroesService
      .getByParameter(this.filterText)
      .toPromise();
  }

  async add(name: string) {
    await this.heroesService.add(name).toPromise();
    await this.getAll();
    this.filterText = '';
    this.heroInput.value   = '';
  }
}
