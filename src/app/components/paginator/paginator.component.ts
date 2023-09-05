import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() pageSize!: number;
  @Input() length!: number;

  @Output() updatePagination = new EventEmitter<number>();

  page: number = 1;

  /**
   * Method to change to the next page
   */
  nextPage() {
    if ((this.pageSize * (this.page + 1)) < (this.length + this.pageSize)) {
      this.page += 1;
      this.emit()
    }
  }

  /**
   * Method to change to the previous page
   */
  previousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.emit();
    }
  }

  /**
   * Emit the offset
   */
  emit() {
    this.updatePagination.emit(this.pageSize * (this.page - 1));
  }
}
