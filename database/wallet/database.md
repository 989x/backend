## Database Schema for Wallet System

### Users Table:

```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    date_of_birth DATE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    profile_image_url VARCHAR(255),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_token VARCHAR(255),
    last_login TIMESTAMP,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_phone_number CHECK (phone_number IS NULL OR LENGTH(phone_number) >= 10)
);
```

### Wallets Table:

```sql
CREATE TABLE wallets (
    wallet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    currency_code VARCHAR(5) NOT NULL DEFAULT 'USD',
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    wallet_name VARCHAR(255),
    wallet_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_balance CHECK (balance >= 0),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

### Transactions Table:

```sql
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    wallet_id INT,
    amount DECIMAL(15, 2) NOT NULL,
    type ENUM('credit', 'debit') NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'completed',
    metadata JSON,
    transaction_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_amount CHECK (amount > 0),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (wallet_id) REFERENCES wallets(wallet_id) ON DELETE CASCADE
);
```

### Cards Table:

```sql
CREATE TABLE cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    card_number VARCHAR(20),
    cardholder_name VARCHAR(100),
    expiration_date DATE,
    cvv VARCHAR(4),
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_card_number CHECK (LENGTH(card_number) = 16),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

### Indexes and Constraints:

```sql
CREATE INDEX idx_user_id ON wallets (user_id);
CREATE INDEX idx_wallet_id ON transactions (wallet_id);
CREATE INDEX idx_user_id_transactions ON transactions (user_id);
CREATE INDEX idx_user_id_cards ON cards (user_id);
```

Feel free to use and modify this database schema for your wallet system. Ensure to maintain referential integrity and optimize performance with appropriate indexes. 💳📊
