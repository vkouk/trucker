BEGIN TRANSACTION;

CREATE TABLE trucks (
    id serial PRIMARY KEY,
    title text UNIQUE NOT NULL,
    model text,
    brand text,
    licence text,
    color text,
    size text,
    locations json
);

COMMIT;