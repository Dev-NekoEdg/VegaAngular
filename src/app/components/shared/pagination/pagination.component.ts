import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input('total-items') totalItems: number = 0;
	@Input('page-size') pageSize = 0;
	@Output('page-changed') pageChanged = new EventEmitter();
	pages: any[] =[];
	currentPage = 1; 
  
  ngOnChanges(changes: SimpleChanges): void {
    this.currentPage = 1;
        
		var pagesCount = Math.ceil(this.totalItems / this.pageSize); 
		this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);

    // console.log(this);
  }

  changePage(page: number){
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if (this.currentPage == this.pages?.length)
			return; 
		
		this.currentPage++;
    // console.log("next", this);
		this.pageChanged.emit(this.currentPage);
	}

}
