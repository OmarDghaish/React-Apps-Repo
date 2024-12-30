# LiBraryManager Test

This repository contains a comprehensive test for the 'manager' object, designed to verify the functionality and robustness of its API methods. The 'manager' facilitates operations for managing library books, such as retrieving all books, fetching books by ID, adding new books, deleting existing ones, and updating book information. These tests ensure proper error handling, data validation, and the correct execution of API functionalities.
---

## Table of Contents

- [Overview](#overview)
- [Tested Features](#tested-features)
  - [Getting All Books](#getting-all-books)
  - [Getting Book By Id](#getting-book-by-id)
  - [Adding Books ](#adding-books)
  - [Removing Book](#removing-book) 
  - [Updating Book](#updating-book)


---

## Overview

The purpose of this test suite is to validate the 'manager' API's capabilities in handling various operations and edge cases. The key objectives of the tests are:

1. Error Handling: Ensure appropriate error messages are returned for invalid inputs or operations.
2. Data Validation: Confirm the API performs proper validation of provided data.
3. Functional Accuracy: Verify that API methods execute correctly and return expected results.
4. Integration Testing: Validate specific integrations, such as file-related operations like uploads and downloads.
---

## Setup
Before each test, a new instance of `LibraryManager` is initialized with a mocked `mock`. 
---

## Tested Features

### Getting All Books

- Validate that all books in the library are retrieved successfully.
- Ensure the returned data matches the expected structure and content.
- Test edge cases, such as when the library contains no books.


### Getting Book By ID
- Confirm that a valid ID returns the correct book information.
- Ensure an error is thrown for invalid or non-existent IDs.


### Adding Books
- Validate that new books can be added successfully to the library.
- Test for proper validation of book data, such as required fields and field formats.
- Confirm error handling for duplicate entries or missing data.


### Removing Books
- Verify that books are successfully removed when a valid ID is provided.
- Test behavior when attempting to remove a book with an invalid or non-existent ID.
- Confirm that the state of the library is updated correctly after a book is removed.


### Updating Books
- Validate that existing books can be updated with new information.
- Test for proper validation of updated data.
- Ensure appropriate error handling for invalid book IDs or data fields.