CREATE TABLE users (
    id            BIGSERIAL    NOT NULL PRIMARY KEY,
    first_name    VARCHAR(100) NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    username      VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,

    created_at    TIMESTAMPTZ  NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT CLOCK_TIMESTAMP()
);

CREATE TABLE friends (
    user_id    BIGINT NOT NULL,
    friend_id  BIGINT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    PRIMARY KEY (user_id, friend_id),

    FOREIGN KEY (user_id)   REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX ON friends (friend_id);

CREATE TABLE groups (
    id         BIGSERIAL   NOT NULL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP()
);

CREATE TABLE group_members (
    group_id   BIGINT      NOT NULL,
    user_id    BIGINT      NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    PRIMARY KEY (group_id, user_id),

    FOREIGN KEY (group_id) REFERENCES groups (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id)  REFERENCES users  (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX ON group_members (user_id);

CREATE TABLE expenses (
    id         BIGSERIAL    NOT NULL PRIMARY KEY,
    user_id    BIGINT       NOT NULL,
    title      VARCHAR(100) NOT NULL,
    amount     FLOAT        NOT NULL,

    --Optional Field
    group_id   BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    FOREIGN KEY (user_id)  REFERENCES users  (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX ON expenses (user_id);
CREATE INDEX ON expenses (group_id);

CREATE TABLE comments (
    id         BIGSERIAL    NOT NULL PRIMARY KEY,
    expense_id BIGINT       NOT NULL,
    user_id    BIGINT       NOT NULL,
    title      VARCHAR(100) NOT NULL,
    body       TEXT         NOT NULL,

    created_at TIMESTAMPTZ  NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    FOREIGN KEY (expense_id) REFERENCES expenses (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id)    REFERENCES users    (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX ON comments (expense_id);
CREATE INDEX ON comments (user_id);

CREATE TABLE expense_debits (
    expense_id BIGINT NOT NULL,
    user_id    BIGINT NOT NULL,
    amount     FLOAT  NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    PRIMARY KEY (expense_id, user_id),

    FOREIGN KEY (expense_id) REFERENCES expenses (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id)    REFERENCES users    (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX ON expense_debits (user_id);

CREATE TABLE expense_credits (
    id         BIGSERIAL   NOT NULL PRIMARY KEY,
    paid_by    BIGINT      NOT NULL,
    paid_to    BIGINT      NOT NULL,
    amount     FLOAT       NOT NULL,

    --Optional Field
    group_id   BIGINT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CLOCK_TIMESTAMP(),

    FOREIGN KEY (paid_by)  REFERENCES users  (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (paid_to)  REFERENCES users  (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups (id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX ON expense_credits (paid_by);
CREATE INDEX ON expense_credits (paid_to);
CREATE INDEX ON expense_credits (group_id);