CREATE TABLE default_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE default_words (
    id SERIAL PRIMARY KEY,
    en VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES default_categories(id) ON DELETE CASCADE
)

CREATE TABLE default_translations (
    id SERIAL PRIMARY KEY,
    language_symbol VARCHAR(255) NOT NULL,
    proununciation VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    example VARCHAR,

    word_id INTEGER REFERENCES default_words(id) ON DELETE CASCADE
)