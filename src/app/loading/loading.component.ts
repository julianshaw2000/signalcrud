import { Component, Signal, inject } from '@angular/core';
// import { MaterialModule } from '../_shared/material.module';
import { LoadingService } from '../_services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingIndicatorComponent {

  loadingService = inject(LoadingService)

  loading = this.loadingService.loading;
}
