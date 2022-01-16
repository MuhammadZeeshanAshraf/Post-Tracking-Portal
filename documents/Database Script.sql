CREATE SCHEMA IF NOT EXISTS Post_Tracking_Portal;

CREATE TABLE post_tracking_portal.importprocess (
	id serial NOT NULL,
	total_tracking_ids varchar(1024) NULL,
	book_ids varchar(1024) NULL,
	not_book_ids varchar(1024) NULL,
	book_on_same_date varchar(1024) NULL,
	not_book_on_same_date varchar(1024) NULL,
	total_bill varchar(1024) NULL,
	create_date date NOT NULL DEFAULT CURRENT_DATE,
	file_name varchar(1024) NULL
);



CREATE TABLE post_tracking_portal.tracking (
	process_id serial NOT NULL,
	tracking_id varchar(1024) NULL,
	booking_date varchar(1024) NULL,
	customer_pin_code varchar(1024) NULL,
	amount varchar(1024) NULL,
	book_status varchar(1024) NULL,
	"type" varchar(1024) NULL,
	booked_at varchar(1024) NULL,
	delivery_location varchar(1024) NULL
);

TRUNCATE ONLY tracking,importprocess RESTART IDENTITY;
