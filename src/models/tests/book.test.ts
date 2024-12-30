

import { beforeEach, describe, expect, it } from "vitest";
import { LibraryManager } from "../book";
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
        expect(result.some((b) => b.id === id)).toBe(false); 
    });
    
    it("removeBook should throw an error when the ID is invalid", async () => {
        const invalidId = "9999";
        
        await expect(manager.removeBook(invalidId)).rejects.toThrow("Book not found.");
    });

    it("updateBook should update a book in the library when id is valid", async () => {
        const updatedBook = {
            id: "1",
            title: "updated",
            author: 'Author 1',
            publicationYear: new Date(2022),
            genre: 'Fiction',
            isBorrowed: false,
            rating: 4,
        }
        const result = await manager.updateBook(updatedBook);
        expect(result).toBeFalsy();
        const newResult = await manager.getAllBooks();
        expect(newResult).toEqual([
            { id: 1, title: "updated", author: "Author 1", genre: "Fiction", isBorrowed: false, rating: 4, publicationYear: new Date("2022-01-01T00:00:00.000Z") }
        ]);
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


