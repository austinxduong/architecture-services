DROP TABLE IF EXISTS orders;

CREATE TABLES orders (
    id BIGINT GENERATED AS ALWAYS IDENTITY PRIMARY KEY,
    quantity INTEGER NOT NULL
);