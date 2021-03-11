const initialState = {
    books: [],
    booksReading: [],
    booksRead: []
};

const books = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_BOOKS_FROM_SERVER':
            return {
                ...state,
                books: action.payload,
                booksReading: action.payload.filter(book => !book.read),
                booksRead: action.payload.filter(book => book.read)
            };
        case 'ADD_BOOK':
            return {
                ...state,
                books: [action.payload, ...state.books],
                booksReading: [action.payload, ...state.booksReading]
            };
        case 'MARK_BOOK_AS_READ':
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.name == action.payload.name) {
                        return { ...book, read: true };
                    }
                    return book;
                }),
                booksRead: [...state.booksRead, action.payload],
                booksReading: state.booksReading.filter(
                    book => book.name !== action.payload.name
                )
            };
        default:
            return state;
    }
};

export default books;