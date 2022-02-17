--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: business; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.business (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    description character varying(255),
    phone_number character varying(11),
    profile_image_url character varying(2048),
    rating numeric,
    address character varying(100),
    messaging_id integer NOT NULL,
	CONSTRAINT "bussiness_pk" PRIMARY KEY ("id")
    CONSTRAINT business_rating_check CHECK ((rating < (6)::numeric))
);


ALTER TABLE public.business OWNER TO eris;

--
-- Name: business_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_id_seq OWNER TO eris;

--
-- Name: business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.business_id_seq OWNED BY public.business.id;


--
-- Name: business_offerings; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.business_offerings (
    id integer NOT NULL,
    business_id integer NOT NULL,
    offering_id integer NOT NULL
);


ALTER TABLE public.business_offerings OWNER TO eris;

--
-- Name: business_offerings_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.business_offerings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_offerings_id_seq OWNER TO eris;

--
-- Name: business_offerings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.business_offerings_id_seq OWNED BY public.business_offerings.id;


--
-- Name: business_offerings_offering_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.business_offerings_offering_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_offerings_offering_id_seq OWNER TO eris;

--
-- Name: business_offerings_offering_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.business_offerings_offering_id_seq OWNED BY public.business_offerings.offering_id;


--
-- Name: business_reviews; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.business_reviews (
    id integer NOT NULL,
    review_id integer NOT NULL,
    user_id integer NOT NULL,
    business_id integer NOT NULL
);


ALTER TABLE public.business_reviews OWNER TO eris;

--
-- Name: business_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.business_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_reviews_id_seq OWNER TO eris;

--
-- Name: business_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.business_reviews_id_seq OWNED BY public.business_reviews.id;


--
-- Name: business_reviews_user_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.business_reviews_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_reviews_user_id_seq OWNER TO eris;

--
-- Name: business_reviews_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.business_reviews_user_id_seq OWNED BY public.business_reviews.user_id;


--
-- Name: offering; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.offering (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    description character varying(255) NOT NULL,
    price double precision NOT NULL,
    image_url character varying(2048)
);


ALTER TABLE public.offering OWNER TO eris;

--
-- Name: offering_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.offering_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offering_id_seq OWNER TO eris;

--
-- Name: offering_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.offering_id_seq OWNED BY public.offering.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.review (
    review_id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying(30) NOT NULL,
    body character varying(255) NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.review OWNER TO eris;

--
-- Name: review_review_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.review_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_review_id_seq OWNER TO eris;

--
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.review_review_id_seq OWNED BY public.review.review_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(25) NOT NULL,
    first_name character varying(25),
    last_name character varying(25),
    score integer,
    profile_image_url character varying(2048),
    is_admin boolean DEFAULT false,
    public_id character varying(50),
    password character varying,
    email character varying,
    "messaging_id" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);


ALTER TABLE public.users OWNER TO eris;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO eris;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: business id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business ALTER COLUMN id SET DEFAULT nextval('public.business_id_seq'::regclass);


--
-- Name: business_offerings id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings ALTER COLUMN id SET DEFAULT nextval('public.business_offerings_id_seq'::regclass);


--
-- Name: business_offerings offering_id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings ALTER COLUMN offering_id SET DEFAULT nextval('public.business_offerings_offering_id_seq'::regclass);


--
-- Name: business_reviews id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews ALTER COLUMN id SET DEFAULT nextval('public.business_reviews_id_seq'::regclass);


--
-- Name: business_reviews user_id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews ALTER COLUMN user_id SET DEFAULT nextval('public.business_reviews_user_id_seq'::regclass);


--
-- Name: offering id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.offering ALTER COLUMN id SET DEFAULT nextval('public.offering_id_seq'::regclass);


--
-- Name: review review_id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review ALTER COLUMN review_id SET DEFAULT nextval('public.review_review_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.business (id, name, description, phone_number, profile_image_url, rating, address) FROM stdin;
3	burger shot	greasiest burgers in the nation	1234567890	https://www.businessalligators.com/wp-content/uploads/2018/02/pizza-store-1200x900.jpeg	4	123 main street
4	asian buffet	authentic chinese food	1234567890	https://www.businessalligators.com/wp-content/uploads/2018/02/pizza-store-1200x900.jpeg	4	123 main street
6	leons ice cream	custard cones, banana splits	1234567890	https://www.businessalligators.com/wp-content/uploads/2018/02/pizza-store-1200x900.jpeg	4	123 main street
8	mr gattis	pizza buffet	1234567890	https://www.businessalligators.com/wp-content/uploads/2018/02/pizza-store-1200x900.jpeg	4	123 main street
1	pizza planet	pizza thats out of this world	1234567890	https://www.businessalligators.com/wp-content/uploads/2018/02/pizza-store-1200x900.jpeg	4	123 main street
\.


--
-- Data for Name: business_offerings; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.business_offerings (id, business_id, offering_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: business_reviews; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.business_reviews (id, review_id, user_id, business_id) FROM stdin;
101	119	7	1
102	120	7	1
103	121	7	1
104	122	7	3
105	123	7	3
106	124	7	3
139	157	7	3
140	158	7	3
141	159	7	3
142	160	7	1
143	161	7	1
144	162	7	1
145	163	7	1
146	164	7	1
147	165	7	1
\.


--
-- Data for Name: offering; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.offering (id, name, description, price, image_url) FROM stdin;
1	pizza	cheesy pepperoni pizza	8.99	https://www.hungryhowies.com/sites/default/files/styles/menu_item_280x175/public/images/menu-items/thumbnails/buildyourownpizza_0.png?itok=fgzFck86
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.review (review_id, user_id, title, body, rating) FROM stdin;
119	7	fsadfasdf	fasdf	4
120	7	fsadfasdf	fasdf	4
121	7	great experience	woooh!	5
122	7	greasy burger	the best burger with the most grease	4
123	7	greasy burger	the best burger with the most grease	4
124	7	yuck	bad burgers :(	1
157	7	trse	test review with auth	4
158	7	👍👍	😊😊	5
159	7	mcdonalds is better	👎👎	1
160	7	asdfasdf	asdfasd	4
161	7	adsfasdf	sdfasdf	4
162	7	test review	this is a test review	5
163	7	test review2	another test review	2
164	7	test review 3		3
165	7			0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.users (id, username, first_name, last_name, score, profile_image_url, is_admin, public_id, password, email) FROM stdin;
1	eris	\N	\N	11	\N	f	\N	\N	\N
2	testuser	\N	\N	15	\N	f	\N	\N	\N
3	test2	\N	\N	34	\N	f	\N	\N	\N
4	testuser123	\N	\N	1	\N	\N	df5d8847-8f67-4371-a792-3e58f0ab9f74	pbkdf2:sha256:260000$J1LmNuyjO8GCoZg3$847de62af884b6c236495907ec0c3b83755ec17df7d6571f82963339bc2ced93	
7	edna	edna	pina	32	\N	t	c4a1fe18-5c81-4472-80b5-db567f7c70c2	pbkdf2:sha256:260000$tTikNlnnuS2bsJAT$eaee5a253b2cf7224c79d7176aaa1509d55794d7dcfe13aa4e86fe97e882e3e3	\N
\.


--
-- Name: business_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_id_seq', 8, true);


--
-- Name: business_offerings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_offerings_id_seq', 1, true);


--
-- Name: business_offerings_offering_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_offerings_offering_id_seq', 1, true);


--
-- Name: business_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_reviews_id_seq', 147, true);


--
-- Name: business_reviews_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_reviews_user_id_seq', 99, true);


--
-- Name: offering_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.offering_id_seq', 1, true);


--
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.review_review_id_seq', 165, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: business business_name_key; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_name_key UNIQUE (name);


--
-- Name: business_offerings business_offerings_business_id_key; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT business_offerings_business_id_key UNIQUE (business_id);


--
-- Name: business_offerings business_offerings_offering_id_key; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT business_offerings_offering_id_key UNIQUE (offering_id);


--
-- Name: business_offerings business_offerings_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT business_offerings_pk PRIMARY KEY (id);


--
-- Name: business business_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_pk PRIMARY KEY (id);


--
-- Name: business_reviews business_reviews_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews
    ADD CONSTRAINT business_reviews_pk PRIMARY KEY (id);


--
-- Name: offering offering_name_key; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.offering
    ADD CONSTRAINT offering_name_key UNIQUE (name);


--
-- Name: offering offering_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.offering
    ADD CONSTRAINT offering_pk PRIMARY KEY (id);


--
-- Name: review review_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pk PRIMARY KEY (review_id);


--
-- Name: users user_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: users users_public_id_key; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_public_id_key UNIQUE (public_id);


--
-- Name: business_offerings business_offerings_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT business_offerings_fk0 FOREIGN KEY (business_id) REFERENCES public.business(id);


--
-- Name: business_offerings business_offerings_fk1; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT business_offerings_fk1 FOREIGN KEY (offering_id) REFERENCES public.offering(id);


--
-- Name: business_reviews business_reviews_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews
    ADD CONSTRAINT business_reviews_fk0 FOREIGN KEY (review_id) REFERENCES public.review(review_id);


--
-- Name: business_reviews business_reviews_fk1; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews
    ADD CONSTRAINT business_reviews_fk1 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: business_reviews business_reviews_fk2; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews
    ADD CONSTRAINT business_reviews_fk2 FOREIGN KEY (business_id) REFERENCES public.business(id);


--
-- PostgreSQL database dump complete
--

