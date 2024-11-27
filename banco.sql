DROP DATABASE CardDecks;

-- Create the database
CREATE DATABASE CardDecks;

-- Use the newly created database
USE CardDecks;

-- Create the decks table with the 'name' column added
CREATE TABLE decks (
    deck_id VARCHAR(255) PRIMARY KEY,  
    -- Corresponds to 'deck_id' in the object
    
    name VARCHAR(255) NULL,       
    -- Name of the deck (can be NULL)
    
    success BOOLEAN NOT NULL,     
    -- Indicates if deck creation was successful
    
    remaining INT NOT NULL,       
    -- Number of remaining cards in the deck
    
    shuffled BOOLEAN NOT NULL,    
    -- Indicates if the deck is shuffled
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    -- Timestamp when the record is created
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
    -- Timestamp when the record is updated
);

-- Create the cards table with the new 'on_hand' column
CREATE TABLE cards (
    id INT AUTO_INCREMENT PRIMARY KEY,   
    -- Unique identifier for each card
    
    deck_id VARCHAR(255),                
    -- Foreign key referencing the deck
    
    code VARCHAR(10) NOT NULL,           
    -- Card code (e.g., "3S")
    
    image VARCHAR(255),                  
    -- Card image (PNG URL)
    
    svg_image VARCHAR(255),              
    -- SVG image URL
    
    value VARCHAR(50) NOT NULL,          
    -- Card value (e.g., "3")
    
    suit VARCHAR(50) NOT NULL,           
    -- Card suit (e.g., "SPADES")
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    -- Timestamp when the record is created
    
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    -- Timestamp when the record is updated
    
    on_hand BOOLEAN DEFAULT false,  -- Indicates if the card is in hand (TRUE or FALSE)
    -- Default value is FALSE, meaning the card is not in hand by default
    
    CONSTRAINT fk_deck FOREIGN KEY (deck_id) REFERENCES decks(deck_id) ON DELETE CASCADE,
    -- Reference to decks table
    UNIQUE (deck_id,code)
);

DROP VIEW IF EXISTS translated_deck_view;

CREATE VIEW translated_deck_view AS
SELECT 
    deck_id AS "ID baralho",
    name AS "Nome",
    success AS "Sucesso",
    remaining AS "Cartas",
    CASE 
        WHEN shuffled = 1 THEN 'Sim'
        WHEN shuffled = 0 THEN 'Não'
        ELSE NULL
    END AS "Embaralhado",
    created_at AS "Data cadastro",
    updated_at AS "Data atualização"
FROM decks;