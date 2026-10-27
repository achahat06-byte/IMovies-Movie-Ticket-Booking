🎬 IMovies — Movie Ticket Booking Made Simple

**A modern, interactive movie ticket booking website built to make movie nights easier.**

🔗 **Live Demo:** https://achahat06-byte.github.io/IMovies-Movie-Ticket-Booking/

# Project Overview

IMovies is a cinema-themed movie ticket booking web application that allows users to explore movies, discover showtimes, select seats, and manage their bookings through an attractive and user-friendly interface.

The project focuses on providing a smooth browsing and booking experience with a responsive design and interactive features.

 ## Objectives

- Develop an intuitive online movie booking interface.
- Display movie information, genres, ratings, and ticket prices.
- Enable users to select seats and manage demo bookings.
- Provide watchlist and movie review features.
- Create a responsive, visually appealing cinema experience.

### Features

- 🎥 Movie listings and poster cards
- 🔎 Movie search and genre filters
- 🎟️ Interactive seat selection
- 📅 Show and booking selection
- 📋 Booking history and management
- ❤️ Watchlist and favorites
- ⭐ Movie ratings and reviews
- 📊 Demo administration dashboard
- 📱 Responsive layout
- 💾 Browser-based storage for supported demo data

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Browser Local Storage
- GitHub and GitHub Pages

# How to Use

1. Open the live demo using the link above.
2. Browse the available movies.
3. Search for a movie or filter by genre.
4. Select a movie and choose the available show and seats.
5. Confirm the demo booking.
6. Explore your bookings, watchlist, and review features.


## 🏛️ System Architecture

### Current Implementation

The current version is a client-side web application hosted on GitHub Pages.

```mermaid
flowchart TD
    A[User] --> B[Web Browser]
    B --> C[IMovies Website]
    C --> D[HTML and CSS]
    C --> E[JavaScript]
    C --> F[Bootstrap UI]
    E --> G[Browser Local Storage]
    C --> H[GitHub Pages Hosting]

    style A fill:#ff477e,color:#fff,stroke:#ff477e
    style C fill:#18243d,color:#fff,stroke:#ff477e
    style G fill:#173d35,color:#fff,stroke:#20b486
    style H fill:#18243d,color:#fff,stroke:#8298ff
```

### Proposed Full-Stack Architecture

The following architecture represents the planned future expansion of IMovies.

```mermaid
flowchart TD
    U[User / Admin] --> UI[React Frontend]
    UI --> API[Node.js and Express REST API]
    API --> AUTH[Authentication and Validation]
    AUTH --> DB[(MongoDB Database)]
    API --> PAY[Payment Gateway]
    DB --> DATA[Users, Movies, Shows, Seats, Bookings]
    API --> RES[Booking Confirmation]

    style U fill:#ff477e,color:#fff,stroke:#ff477e
    style UI fill:#18243d,color:#fff,stroke:#8298ff
    style API fill:#18243d,color:#fff,stroke:#ff477e
    style DB fill:#173d35,color:#fff,stroke:#20b486
```


## 🗄️ ER Diagram (Entity–Relationship Diagram)

The ER diagram represents the proposed database entities and their relationships for the complete IMovies booking system.

```mermaid
erDiagram
    USER ||--o{ BOOKING : makes
    USER ||--o{ REVIEW : writes
    MOVIE ||--o{ SHOW : has
    MOVIE ||--o{ REVIEW : receives
    THEATER ||--o{ SHOW : hosts
    SHOW ||--o{ SEAT : contains
    SHOW ||--o{ BOOKING : receives
    BOOKING ||--o{ BOOKING_SEAT : includes
    SEAT ||--o{ BOOKING_SEAT : assigned
    BOOKING ||--o| PAYMENT : has

    USER {
        int user_id PK
        string name
        string email
        string password_hash
    }

    MOVIE {
        int movie_id PK
        string title
        string genre
        string language
        int duration
        float rating
    }

    THEATER {
        int theater_id PK
        string name
        string location
    }

    SHOW {
        int show_id PK
        int movie_id FK
        int theater_id FK
        datetime show_time
        float ticket_price
    }

    SEAT {
        int seat_id PK
        int show_id FK
        string seat_number
        string status
    }

    BOOKING {
        int booking_id PK
        int user_id FK
        int show_id FK
        datetime booking_time
        float total_amount
        string status
    }

    BOOKING_SEAT {
        int booking_id FK
        int seat_id FK
    }

    PAYMENT {
        int payment_id PK
        int booking_id FK
        float amount
        string payment_status
    }

    REVIEW {
        int review_id PK
        int user_id FK
        int movie_id FK
        int rating
        string comment
    }
```

**Note:** This is a proposed relational database design. The current GitHub Pages demo does not implement this database or process real payments.


## Project Structure

```text
IMovies-Movie-Ticket-Booking/
├── index.html
└── README.md
```

## Project Limitations

This version is a front-end demonstration. Booking and favorite data are stored locally in the browser where supported. It does not provide a production backend, shared real-time seat availability, secure user authentication, or actual payment processing.

## Future Enhancements

- React-based frontend
- Node.js and Express REST API
- MongoDB database integration
- Secure authentication using JWT
- Shared seat availability and temporary seat locking
- Payment gateway integration
- Admin tools for managing movies and shows
- Booking confirmation notifications

## Deployment

The project is published using GitHub Pages.

## 📄 Conclusion

IMovies demonstrates the design and implementation of an interactive movie ticket booking interface, combining movie discovery, seat selection, booking management, and a modern cinema-inspired user experience.
