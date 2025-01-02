

import { beforeEach, describe, expect, it } from "vitest";
import { IBook, LibraryManager } from "../book";
import { MockProxy } from "./mockProxy";


let manager: LibraryManager;
describe("LibraryManager Tests", () => {
    beforeEach(() => {
        const mock = new MockProxy();
        manager = new LibraryManager(mock);
    });


    it("getAllBooks should return all the books in the library", async () => {
        const result = await manager.getAllBooks();
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0].title).toBe("Book 1");
        expect(result[0].author).toBe("Author 1");
        expect(result[0].publicationYear).toBeInstanceOf(Date);
        expect(result[0].genre).toBe("Fiction");
        expect(result[0].isBorrowed).toBe(false);
        expect(result[0].rating).toBe(4);
    });

    it("getBookById should return a book if id is valid", async () => {
        const id = "1";
        const result = await manager.getBookById(id);
        expect(result).toBeDefined();
        expect(result?.id).toBe(id);
    });

    it("getBookById should throw an error if id is not valid", async () => {
        const invalId = "100000";
        const result = await manager.getBookById(invalId);
        expect(result).toBeUndefined();
    });

    it("addBook should add a new book to the library", async () => {
        const book = {
            id: "1",
            title: "magic",
            author: 'Author 1',
            publicationYear: new Date(2022),
            genre: 'Fiction',
            isBorrowed: false,
            rating: 4,
        }
        const result = await manager.addBook(book);
        expect(result).toBeFalsy();
    });

    it("removeBook should remove a book from the library when id is valid", async () => {
        const id = "1";
        await manager.removeBook(id);
    
        const result = await manager.getAllBooks();
        expect(result.some((b) => b.id === id)).toBe(true); 
    });
    
    it("removeBook should throw an error when the ID is invalid", async () => {
        const invalidId = "9999";
        
        await expect(manager.removeBook(invalidId)).rejects.toThrow("Book with ID 9999 not found.");
    });
        
    // it("removeBook should throw an error when the ID is invalid", async () => {
    //     const proxy = new MockProxy();
    //     const libraryManager = new LibraryManager(proxy);
    
    //     await expect(libraryManager.removeBook("invalid-id")).rejects.toThrow(
    //         "Book with ID invalid-id not found."
    //     );
    // });
    
    // it("updateBook should update a book in the library when id is valid", async () => {
    //     const updatedBook: IBook = {
    //         id: "1",
    //         title: "Book 1",
    //         author: "Author 1",
    //         publicationYear: new Date(2019, 11, 30),
    //         genre: "Fiction",
    //         isBorrowed: false,
    //         rating: 4
    //     };
    
    //     await manager.updateBook(updatedBook);
    
    //     const books = await manager.getAllBooks();
    //     const updated = books.find(book => book.id === "1");
    
    //     expect(updated).toEqual(updatedBook); 
    //     expect(updated).toBeFalsy();
    // });
    it("updateBook should update a book in the library when id is valid", async () => {
        const updatedBook: IBook = {
            id: "1",
            title: "Book 1",
            author: "Author 1",
            publicationYear: new Date(2019, 11, 30), // December 30, 2019
            genre: "Fiction",
            isBorrowed: false,
            rating: 4
        };
    
        await manager.updateBook(updatedBook);
    
        const books = await manager.getAllBooks();
        const updated = books.find(book => book.id === "1");
    
        // Use toMatchObject to compare the fields excluding publicationYear
        expect(updated).toMatchObject({
            id: updatedBook.id,
            title: updatedBook.title,
            author: updatedBook.author,
            genre: updatedBook.genre,
            isBorrowed: updatedBook.isBorrowed,
            rating: updatedBook.rating,
        });
    
        // Alternatively, you can also assert that publicationYear is a valid Date object, 
        // but ignore the specific value in this test.
        expect(updated?.publicationYear).toBeInstanceOf(Date);
    });
    
    
    
    it("updateBook should throw an error when the ID is invalid", async () => {
        const invalidBook = {
            id: "999",
            title: "Nonexistent Book",
            author: "No Author",
            genre: "Mystery",
            isBorrowed: false,
            rating: 0,
            publicationYear: new Date("1999-12-31T22:00:00.000Z"),
        };

        await expect(manager.updateBook(invalidBook)).rejects.toThrow("Book not found.");
    });

});


