import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrDisplayService {

  constructor(private toastr: ToastrService) { }

  public DisplayToastrSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
  }
  public DisplayToastrInfo(message: string, title?: string): void {
    this.toastr.info(message, title);
  }
  public DisplayToastrWarning(message: string, title?: string): void {
    this.toastr.warning(message, title);
  }
  public DisplayToastrError(message: string, title?: string): void {
    this.toastr.error(message, title);
  }
}
