import { IBook } from "../book";

export class MockProxy {
    // Fetching mock books
    async fetchAllBooks(): Promise<{ result: { data: IBook[] } }> {
        const mockBooks: IBook[] = [
            {
                id: "1",
                title: 'Book 1',
                author: 'Author 1',
                publicationYear: new Date(2000, 2, 1),
                genre: 'Fiction',
                isBorrowed: false,
                rating: 4,
            },
            {
                id: "2",
                title: 'Book 2',
                author: 'Author 2',
                publicationYear: new Date(2000, 2, 1),
                genre: 'Fiction',
                isBorrowed: true,
                rating: 5,
            },
            {
                id: "3",
                title: 'Book 3',
                author: 'Author 3',
                publicationYear: new Date(2000, 2, 1),
                genre: 'Fiction',
                isBorrowed: false,
                rating: 2,
            }
        ];
        return { result: { data: mockBooks } };
    }

}
