-- Скрипт создания таблицы 
create TABLE position (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    latitude double precision,
    longitude double precision,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
