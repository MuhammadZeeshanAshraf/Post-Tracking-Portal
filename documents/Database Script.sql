CREATE SCHEMA IF NOT EXISTS Post_Tracking_Portal;

CREATE TABLE post_tracking_portal.importprocess (
	id serial NOT NULL,
	total_tracking_ids varchar(1024) NULL,
	book_ids varchar(1024) NULL,
	not_book_ids varchar(1024) NULL,
	book_on_same_date varchar(1024) NULL,
	not_book_on_same_date varchar(1024) NULL,
	total_bill varchar(1024) NULL,
	create_date date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE post_tracking_portal.tracking (
	process_id serial NOT NULL,
	tracking_id varchar(1024) NULL,
	booking_date varchar(1024) NULL,
	customer_pin_code varchar(1024) NULL,
	amount varchar(1024) NULL,
	book_status varchar(1024) NULL
);

TRUNCATE ONLY tracking,importprocess RESTART IDENTITY;


INSERT INTO post_tracking_portal.importprocess (total_tracking_ids,book_ids,not_book_ids,book_on_same_date,not_book_on_same_date,total_bill,create_date) VALUES
	 ('7','7','0','0','7','178','2022-01-16');
	
	
	INSERT INTO post_tracking_portal.tracking (tracking_id,booking_date,customer_pin_code,amount,book_status) VALUES
	 ('RJ265644359IN','05/01/2022 16:59:59','600070','27.00','Booked'),
	 ('RJ258644631IN','12/01/2022 11:44:56','700030','26.00','Booked'),
	 ('RJ258629342IN','12/01/2022 11:35:28','231313','22.00','Booked'),
	 ('RJ270838882IN','12/01/2022 11:35:28','736176','34.00','Booked'),
	 ('RJ258624610IN','12/01/2022 11:35:28','125001','22.00','Booked'),
	 ('RJ265644535IN','12/01/2022 11:35:28','122001','22.00','Booked'),
	 ('RJ258629254IN','12/01/2022 11:44:56','400018','25.00','Booked');
	
	
