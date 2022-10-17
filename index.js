// book class: it will contail all the book name, isbn, Author

    class Book{
        constructor(isbn,bookName,author){
            this.bookName = bookName;
            this.isbn = isbn;
            this.author = author;
        }
    }

// the local storage for storing the books 
class Store{

    static getBooks(){
        let books = []

        if(localStorage.getItem('books') == null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

       books.forEach((book, index) => {
            if(books.isbn === isbn){
                books.splice(index,1);
                
            }
       });
        localStorage.setItem('books', JSON.stringify(books));
    }

    

}


// ui operattions 
class UI{
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    
    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML =`
        <td>${book.isbn}</td>
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td> <i class="bi bi-trash text-danger delete"></i> </td>
        `;
        list.appendChild(row);
    }

    static clearField(){
        document.getElementById('isbn').value = "";
        document.getElementById('bookName').value = "";
        document.getElementById('authorName').value = "";
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        
        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        const form = document.getElementById('book-form');

        container.insertBefore(div,form);

        setTimeout(() => {
            
            document.querySelector('.alert').remove();

        },1000);
    }
    static deleteBook(el){
        
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();

        }
    }
}

// display books 
document.addEventListener('DOMContentLoaded',UI.displayBooks);


// removing the book 
document.querySelector('#book-list').addEventListener('click',function(e){
    e.preventDefault()
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.remove());

    UI.showAlert("Book deleted", "success")

});


   document.addEventListener('submit', function(e){
    e.preventDefault();

    // get the form values
   const isbn = document.querySelector('#isbn').value;
   const bookName = document.querySelector('#bookName').value;
   const author = document.querySelector('#authorName').value;
  
   if(isbn === "" || bookName === "" || author ===""){
    // alert("Please Enter all the Required Fields");
    UI.showAlert("Please Enter all the Required Fields","danger");
    
   }else{
        const book = new Book(isbn,bookName,author);
        
        UI.addBookToList(book);

        Store.addBook(book);

        UI.clearField();
        UI.showAlert("Book Added", "success")
   }
   
});
