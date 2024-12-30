import { MockProxy } from "./tests/mockProxy";


export interface IBook {
    get id(): string;
    get title(): string;
    get author(): string;
    get publicationYear(): Date;
    get genre(): string;
    get isBorrowed(): boolean;
    get rating(): number;
}

export interface ILibraryManager {
    getAllBooks(): Promise<IBook[]>;
    getBookById(id: string): Promise<IBook | undefined>;
    addBook(book: IBook): Promise<void>;
    removeBook(id: string): Promise<void>;
    updateBook(book: IBook): Promise<void>;
}

export class LibraryManager implements ILibraryManager {
    private _proxy: MockProxy;

    constructor(proxy: MockProxy) {
        if (!proxy) {
            throw new Error("Proxy is required");
        }
        this._proxy = proxy;
    }

    private async fetchBooksFromApi(): Promise<IBook[]> {
        const result = await this._proxy.fetchAllBooks();
        if (!result.result || !result.result.data) {
            return [];
        }
        return result.result.data;
    }

    async getAllBooks(): Promise<IBook[]> {
        return await this.fetchBooksFromApi();
    }

    async getBookById(id: string): Promise<IBook | undefined> {
        const books = await this.getAllBooks();
        if (!books || books.length === 0) {
            throw new Error("No books found");
        }
        return books.find((b) => b.id === id);
    }

    async addBook(book: IBook): Promise<void> {
        const books = await this.getAllBooks();
        books.push(book);
    }

    async removeBook(id: string): Promise<void> {
        const books = await this.getAllBooks();
        const index = books.findIndex((b) => b.id === id);
        if (index !== -1) {
            books.splice(index, 1);
        }
    }

    async updateBook(book: IBook): Promise<void> {
        const books = await this.getAllBooks();
        const index = books.findIndex((b) => b.id === book.id);
        if (index !== -1) {
            books[index] = book;
        }
        else {
            throw new Error('Book not found.');
        }
    }
}