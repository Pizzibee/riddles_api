CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL, 
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);
CREATE TABLE riddles(
	riddle_id SERIAL PRIMARY KEY,
	riddle VARCHAR(500) NOT NULL,
	answer VARCHAR(500) NOT NULL,
	creator_id INTEGER REFERENCES users(user_id)
);
--password is 'azerty'
INSERT INTO users VALUES (DEFAULT, 'Patrick', 'Cyiza', 'patrick@whelp.io', '$2b$05$N.U3DAD/Ke6aNp1fid1Aa.3bnfODpJEv4yLld376UnyLxzHsVkv0m');
INSERT INTO users VALUES (DEFAULT, 'William', 'Whelp', 'william@whelp.io', '$2b$05$N.U3DAD/Ke6aNp1fid1Aa.3bnfODpJEv4yLld376UnyLxzHsVkv0m');
INSERT INTO users VALUES (DEFAULT, 'Sushil', 'Ghambir', 'sushilghambir@gmail.com', '$2b$05$N.U3DAD/Ke6aNp1fid1Aa.3bnfODpJEv4yLld376UnyLxzHsVkv0m');

INSERT INTO riddles VALUES (DEFAULT, 'What has a head, a tail, is brown, and has no legs?', 'A Penny', 1);
INSERT INTO riddles VALUES (DEFAULT, 'Can you name three consecutive days without using the words Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday?', 'Yesterday, Today, and Tomorrow.', 1);
INSERT INTO riddles VALUES (DEFAULT, 'What comes once in a minute, twice in a moment, but never in a thousand years?', 'The letter "m".', 2);
INSERT INTO riddles VALUES (DEFAULT, 'David''s father has three sons : Snap, Crackle and _____ ?', 'David.', 2);
INSERT INTO riddles VALUES (DEFAULT, 'Who created the best API', 'Sushil', 3);
