# Library Management System

---

## 1. List actors — Who uses the system?

- Member (User)
- Librarian (User)
- Manager (User)

---

## 2. List main actions — What do they do?

- Register users (members, librarians, managers)
- Add / update / view materials
- Borrow material (Loan creation)
- Return material + calculate fines
- Reserve material when unavailable
- Add reviews for materials
- Track overdue loans
- Auto-delete expired reservations (cron job)
- Auto-update overdue loans (cron job)

---

## 3. Find the nouns — Each important noun becomes a collection

- User
- Material
- Loan
- Reservation
- Review

---

## 4. Draw relationships

- User (1) -> (M) Loan (as member)
- User (1) -> (M) Loan (as recordedBy librarian)
- User (1) -> (M) Reservation
- User (1) -> (M) Review

- Material (1) -> (M) Loan
- Material (1) -> (M) Reservation
- Material (1) -> (M) Review

- Loan (M) -> (1) User (member)
- Loan (M) -> (1) Material
- Reservation (M) -> (1) User
- Reservation (M) -> (1) Material
- Review (M) -> (1) User
- Review (M) -> (1) Material

---

## 5. Name fields by role

---

### User
```js
User {
    name,
    email,
    phone,
    password,
    role [member, librarian, manager],
    registeredAt,

    // Member fields
    address?,
    dateOfBirth?,
    membershipNumber?,

    // Librarian fields
    responsibleDepartment?
}

### Material
```js

Material {
    materialType [book, magazine, cd, map],
    title,
    publisher,
    publicationYear,
    category,

    totalCopies,
    availableCopies,

    coverImageUrl?,

    author?,
    isbn?,

    issueNumber?,
    month?,
    year?
}

### Loan
```js

Loan {
    member (REF: User),
    material (REF: Material),
    recordedBy (REF: User),

    loanDate,
    dueDate,
    actualReturnDate?,

    status [active, returned, overdue, cancelled],

    finePerDay,
    totalFineAmount,
    paymentStatus [paid, unpaid]
}

### Reservation
```js

Reservation {
    material (REF: Material),
    member (REF: User),

    reservedAt,
    queuePriority,

    notifiedWhenAvailable,
    autoCancelAfter
}

### Review
```js

Review {
    material (REF: Material),
    member (REF: User),

    rating (1-5),
    reviewText?
}

## 6. Business Logic
Loan.findOne({
    member,
    material,
    status: "active"
})

Review.findOne({
    member,
    material
})

Loan.updateMany(
{
    status: "active",
    dueDate: { $lt: now }
},
{
    $set: { status: "overdue" }
}
)

Reservation.deleteMany({
    autoCancelAfter: { $lt: now }
})

## 7. System Rules Summary
Cannot borrow same material twice (active loan)
Borrow only if availableCopies > 0
Reserve only if material is unavailable
One review per member per material
Loans become overdue automatically after due date
Reservations expire automatically
Returning loan increases availableCopies