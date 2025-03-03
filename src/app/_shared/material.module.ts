// src/app/ui/material.module.ts (Material UI Module)
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field'; // For Material form fields
import { MatInputModule } from '@angular/material/input'; // For Material input fields
import { MatCardModule } from '@angular/material/card'; // For Material cards
import { MatButtonModule } from '@angular/material/button'; // For Material buttons
import { MatExpansionModule } from '@angular/material/expansion'; // For Material accordion
import { MatSelectModule } from '@angular/material/select'; // For Material dropdowns
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  exports: [
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule { }
