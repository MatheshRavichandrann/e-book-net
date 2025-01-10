import { Component, OnInit } from '@angular/core';
import { BookResponse, BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-return-books',
  standalone: false,
  
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit{
  page = 0;
    size = 5;
    message = '';
    level = 'success';
    
    returnedBooks: PageResponseBorrowedBookResponse = {};

    constructor(
      private bookService: BookService,
      private toastService: ToastrService
    ){}
  
    ngOnInit(): void {
      this.findAllReturnedBooks();
    }

  
    findAllReturnedBooks(){
      this.bookService.findAllReturnedBooks({
        page: this.page,
        size: this.size
      }).subscribe({
        next: (resp) => {
          this.returnedBooks = resp;
        }
      })
    }
  
  
    goToFirstPage(){
      this.page = 0;
      this.findAllReturnedBooks();
    }
  
    goToPreviousPage(){
      this.page--;
      this.findAllReturnedBooks();
  
    }
  
  
    goToPage(page: number){
      this.page = page;
      this.findAllReturnedBooks();
  
    }
  
    goToNextPage(){
      this.page++;
      this.findAllReturnedBooks();
  
    }
  
  
    goToLastPage(){
      this.page == this.returnedBooks.totalPage as number - 1;
      this.findAllReturnedBooks();
    }
  
  
    get isLastPage(): boolean{
      return this.page == this.returnedBooks.totalPage as number -1;
    }


    approveBookReturn(book: BorrowedBookResponse){
      if (!book.returned) {
        this.toastService.error('The book is not yet return', 'Oops!');
      }
      this.bookService.approveReturnBorrowBook({
        'book-id': book.id as number
      }).subscribe({
        next: () => {
          this.toastService.success('Book return approved', 'Yayy!')
          this.findAllReturnedBooks();
        }
      });

    }

}
