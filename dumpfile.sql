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
    business_type character varying,
    password character varying NOT NULL,
    email character varying NOT NULL,
    CONSTRAINT business_rating_check CHECK ((rating < (6)::numeric))
);


ALTER TABLE public.business OWNER TO eris;

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
-- Name: bussiness_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.bussiness_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bussiness_id_seq OWNER TO eris;

--
-- Name: bussiness_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.bussiness_id_seq OWNED BY public.business.id;


--
-- Name: carousel_image; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.carousel_image (
    business_id integer NOT NULL,
    image_url character varying(2048) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.carousel_image OWNER TO eris;

--
-- Name: carousel_image_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.carousel_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carousel_image_id_seq OWNER TO eris;

--
-- Name: carousel_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.carousel_image_id_seq OWNED BY public.carousel_image.id;


--
-- Name: direct_messages; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.direct_messages (
    id integer NOT NULL,
    message_id integer NOT NULL,
    sender_id integer NOT NULL,
    reciever_id integer NOT NULL,
    previous_message_id integer
);


ALTER TABLE public.direct_messages OWNER TO eris;

--
-- Name: direct_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.direct_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direct_messages_id_seq OWNER TO eris;

--
-- Name: direct_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.direct_messages_id_seq OWNED BY public.direct_messages.id;


--
-- Name: message; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.message (
    id integer NOT NULL,
    subject character varying(30) NOT NULL,
    body character varying(255) NOT NULL
);


ALTER TABLE public.message OWNER TO eris;

--
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_id_seq OWNER TO eris;

--
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;


--
-- Name: messaging_ids; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.messaging_ids (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.messaging_ids OWNER TO eris;

--
-- Name: messaging_ids_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.messaging_ids_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messaging_ids_id_seq OWNER TO eris;

--
-- Name: messaging_ids_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.messaging_ids_id_seq OWNED BY public.messaging_ids.id;


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
-- Name: reply; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.reply (
    id integer NOT NULL,
    user_id integer NOT NULL,
    body character varying(100) NOT NULL
);


ALTER TABLE public.reply OWNER TO eris;

--
-- Name: reply_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.reply_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_id_seq OWNER TO eris;

--
-- Name: reply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.reply_id_seq OWNED BY public.reply.id;


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
-- Name: review_reply; Type: TABLE; Schema: public; Owner: eris
--

CREATE TABLE public.review_reply (
    id integer NOT NULL,
    business_review_id integer NOT NULL,
    reply_id integer NOT NULL
);


ALTER TABLE public.review_reply OWNER TO eris;

--
-- Name: review_reply_id_seq; Type: SEQUENCE; Schema: public; Owner: eris
--

CREATE SEQUENCE public.review_reply_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_reply_id_seq OWNER TO eris;

--
-- Name: review_reply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eris
--

ALTER SEQUENCE public.review_reply_id_seq OWNED BY public.review_reply.id;


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
    messaging_id integer NOT NULL
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

ALTER TABLE ONLY public.business ALTER COLUMN id SET DEFAULT nextval('public.bussiness_id_seq'::regclass);


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
-- Name: carousel_image id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.carousel_image ALTER COLUMN id SET DEFAULT nextval('public.carousel_image_id_seq'::regclass);


--
-- Name: direct_messages id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.direct_messages ALTER COLUMN id SET DEFAULT nextval('public.direct_messages_id_seq'::regclass);


--
-- Name: message id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);


--
-- Name: messaging_ids id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.messaging_ids ALTER COLUMN id SET DEFAULT nextval('public.messaging_ids_id_seq'::regclass);


--
-- Name: offering id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.offering ALTER COLUMN id SET DEFAULT nextval('public.offering_id_seq'::regclass);


--
-- Name: reply id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.reply ALTER COLUMN id SET DEFAULT nextval('public.reply_id_seq'::regclass);


--
-- Name: review review_id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review ALTER COLUMN review_id SET DEFAULT nextval('public.review_review_id_seq'::regclass);


--
-- Name: review_reply id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review_reply ALTER COLUMN id SET DEFAULT nextval('public.review_reply_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.business (id, name, description, phone_number, profile_image_url, rating, address, messaging_id, business_type, password, email) FROM stdin;
1	pizza hut	No one out pizzas the Hut	1234567890	https://franchise.pizzahut.com/images/logo_header_min.png	4	\N	2	food	pbkdf2:sha256:260000$0AOenMqQLpCrIG89$e90147d1f4b1543f28781ba575471efb502dd314a54e75acffb3c799c5fcabf5	test@gmail.com
12	Firestone	Tire Company	1234567890	https://downtownlascruces.org/wp-content/uploads/2019/12/779dda76fcbe67b889749dea97fcfa69.png	\N	\N	46	automotive	pbkdf2:sha256:260000$gbSNmXkLo15OMoed$431218eeebd964ae17cfb744908ac66752f9a67e27ca702e02c2037d9ddc6d98	firestone@gmail.com
6	subway	eat fresh!	1234567890	https://assets.simpleviewinc.com/simpleview/image/upload/crm/nacogdoches/subway_logo_og-1--552935d35056b3a_5529377f-5056-b3a8-49e770490bdbae60.png	\N	123 main street	39	food	pbkdf2:sha256:260000$0AOenMqQLpCrIG89$e90147d1f4b1543f28781ba575471efb502dd314a54e75acffb3c799c5fcabf5	test2@gmail.com
8	ubreakifix	Electronic repair store	9561234567	https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/UBreakiFix.jpg/220px-UBreakiFix.jpg	\N	\N	41	phone_repair	pbkdf2:sha256:260000$0AOenMqQLpCrIG89$e90147d1f4b1543f28781ba575471efb502dd314a54e75acffb3c799c5fcabf5	test3@gmail.com
7	mcdonalds	biggest fast food chain in the world!		https://yt3.ggpht.com/ytc/AKedOLS5rTsrjzAgo0yJdrdHBSdEskUL4JsSwCvDCfcKdw=s900-c-k-c0x00ffffff-no-rj	\N	\N	40	food	pbkdf2:sha256:260000$0AOenMqQLpCrIG89$e90147d1f4b1543f28781ba575471efb502dd314a54e75acffb3c799c5fcabf5	test5@gmail.com
\.


--
-- Data for Name: business_offerings; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.business_offerings (id, business_id, offering_id) FROM stdin;
\.


--
-- Data for Name: business_reviews; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.business_reviews (id, review_id, user_id, business_id) FROM stdin;
195	214	1	12
\.


--
-- Data for Name: carousel_image; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.carousel_image (business_id, image_url, id) FROM stdin;
12	https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pile-of-tires-on-white-background-royalty-free-image-672151801-1561751929.jpg?crop=1.00xw:0.629xh;0,0.311xh&resize=1200:*	19
12	https://s3-media0.fl.yelpcdn.com/bphoto/z_OZzWMeI8aje5atrGnZ2A/348s.jpg	20
12		21
\.


--
-- Data for Name: direct_messages; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.direct_messages (id, message_id, sender_id, reciever_id, previous_message_id) FROM stdin;
1	1	1	2	\N
3	5	2	1	1
8	10	1	2	\N
10	12	2	1	10
11	25	1	46	\N
13	28	46	1	25
14	30	1	46	28
15	31	46	46	\N
16	32	1	2	\N
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.message (id, subject, body) FROM stdin;
1	hours	what are your open hours
2	hello	i love your service
3	hello	i love your service
4	hello	i love your service
5	hours	our hours are monday-friday 9am-5pm
6	asdfasdfasd	asdfasdfasdfasd
7	large pizza	how much is a large pepperoni pizza?
8	large pizza	how much is a large pepperoni pizza?
9	large pizza 	what is the price for a large pepperoni pizza?
10	df	df
12	large piza	our large pizza is $10.99+tax
13	brake job	how much is a total brake job\n
14	brake job	what is the cost for a total brake replacement job
15	brake job	what is the cost for a total brake replacement job
16	brake job	what is the cost for a total brake replacement job
17	brake job	what is the cost for a total brake replacement job
18	brake job	what is the cost for a total brake replacement job
19	brake job	what is the cost for a total brake replacement job
20		sdfsdgf
21	gdfgdfg	dsfgdsf
22	sdfsdf	sdfsdf
23	brake job price	what is the cost for a total brake replacement
24	brake job price	what is the cost for a total brake replacement
25	brake job price	what is the cost for a total brake replacement
27	brake job price	sdfasdf
28	brake job price	the price will be $419+tax
29	brake job price	how long would that take
30	brake job price	how long will that take?
31	test	business to business
32	xcvbxcvb	bvxcvb
\.


--
-- Data for Name: messaging_ids; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.messaging_ids (id, name) FROM stdin;
2	pizza hut
1	eris
3	\N
4	\N
5	\N
6	\N
7	\N
8	\N
9	\N
10	\N
11	\N
12	\N
13	\N
14	\N
15	\N
16	\N
17	\N
18	\N
19	\N
20	\N
21	\N
22	\N
23	\N
24	\N
25	\N
26	\N
27	\N
28	\N
29	\N
30	\N
31	\N
32	\N
33	\N
39	subway
40	mcdonalds
41	ubreakifix
46	Firestone
\.


--
-- Data for Name: offering; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.offering (id, name, description, price, image_url) FROM stdin;
\.


--
-- Data for Name: reply; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.reply (id, user_id, body) FROM stdin;
11	1	i love the margaritas!
14	1	and the cheesy bread!
15	1	Do they even sell margaritas?
16	1	yuck!
17	16	AWESOME!
18	16	no way!
19	16	great food
20	16	hate it here...
21	1	my favorite!
22	1	i love the whole wheat bread!
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.review (review_id, user_id, title, body, rating) FROM stdin;
214	1	Service is Great	fast friendly service !	5
\.


--
-- Data for Name: review_reply; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.review_reply (id, business_review_id, reply_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: eris
--

COPY public.users (id, username, first_name, last_name, score, profile_image_url, is_admin, public_id, password, email, messaging_id) FROM stdin;
35	ASDASD			\N		f	1646365c-5985-40c1-a873-817b475a0ef3	pbkdf2:sha256:260000$xQFP6Q54jOmp0lbR$909cba2b2bc00f10c9268da73c1e8fd356b3bc44bbb85a7404c128d5d7990a35	\N	33
1	eris			10	https://cdnb.artstation.com/p/assets/images/images/001/390/295/large/ayhan-aydogan-sprmn.jpg?1445589563	t	114c8877-53bb-4fe1-a00d-f6feefc7794b	pbkdf2:sha256:260000$LWzxDuRZN2POElzm$067246cdba0ef7ad10087436cd935154d5a021fcddafde45f59c8d1c4fa5fec2	\N	1
15	tester			\N		f	5a37a1e3-f1e1-4060-9f5e-b7f966f7118c	pbkdf2:sha256:260000$y1EzFmFvTZfxucoU$97c4e4778eb26f95a3c1f9c600ae819116201a55872cedc4d2ca4bb8be0fc4fb	\N	13
16	tester123			\N		f	20dd2394-f407-4bee-a487-39dddf45f778	pbkdf2:sha256:260000$6dq9qCTat5Z8TPnX$17a69fdf06049aa56bbbb933f6934a2b260dabe0f52fd7e3ddc89f1e62ca4b76	\N	14
17	newuser			\N		f	32f97f35-357b-4f16-9cc9-93e850994543	pbkdf2:sha256:260000$jdxfB9jO1nkk7Ift$29f00aeaaac483c749286658733030175c0fe716acfe63f9a26a39ec1464cb8e	\N	15
18	edna			\N		f	5fc7d580-3a56-4013-9b5b-36e59b5a3692	pbkdf2:sha256:260000$fFhBzU20lVZxvgd3$37337fef22b14c1d4f9ac3076ac389368628f0d2277d6f519a779f1b50be642b	\N	16
19	roger			\N		f	5e862747-5c1e-42e2-8bb7-6353420f051f	pbkdf2:sha256:260000$4s7mOFApAQDKdQl6$e24a607ba4ee18c6ede33fc70a77f69e7abc1e0fb2edca11ba0aa07e0c7b534a	\N	17
20	greenman			\N		f	2e844d60-cedf-4c00-a92d-10aa95e1778b	pbkdf2:sha256:260000$7JY1Ib5lsNmqAQ6H$41906f4682659402aee4e5b7a2486b64e6d34998c4a353374117f45cf3fd2440	\N	18
21	dinosaur			\N		f	a6d9e2d6-69ad-4c27-b2f9-edb31d441075	pbkdf2:sha256:260000$LQVfb6oLjhC5kPfS$71130614140ddd7632ae63365db5dd70f0361be18232e7bd3d495d36b51faa9d	\N	19
22	dinosaur1			\N		f	10627066-ffd7-4426-a310-c9cc97e2f447	pbkdf2:sha256:260000$OEtBtCv5ctbtMK0j$5157c2dba710e34d868da058bb775128ee96ba4e21045138581315c7361e2f21	\N	20
23	dinosaur12			\N		f	7bd1d070-5437-4e12-a920-e4c3ffc725c3	pbkdf2:sha256:260000$rfK0rkNEpm1BMl3v$8e02873e06bf113f2f0f7d5501a281a31afcbf2fb1549feccfbc9580f7cd1b26	\N	21
24	dinosaur123			\N		f	94576b72-9f9a-4401-9ad3-2a0693b76463	pbkdf2:sha256:260000$OEY0I3APEXOTCJUN$0044043654fa45142ee278fbd3ae54b56e4149dd2a170772568b4a4daf081d1e	\N	22
25	dinosaur1232			\N		f	95f8bec6-6691-4736-9fbd-e664d54e2707	pbkdf2:sha256:260000$wgaRJorXiDGopXHR$693a82cc80202c1f1b34962d7b7bff43911f880cd2533254e1ce6b36868b7ab0	\N	23
26	dinosaur123234			\N		f	638bc2ab-b1d5-45ff-b758-30919bcd74de	pbkdf2:sha256:260000$w4t9z1KhsnzSJRfd$2bf27c73c0bc1cbdd06bac5d7907eb8c0c874403a3ed57d0d42d94ace37e20d9	\N	24
27	asdf			\N		f	e0c34fef-24cb-49f6-ab68-56845488424b	pbkdf2:sha256:260000$KPEIVpC2UVkeASdc$c0ea9d4207a60bb391d07f19edfed0fc8b56ccca31989f932b8ba0eb9d16a3ec	\N	25
28	adfadsf			\N		f	26b636c7-a414-4478-b5d6-b07996b3d909	pbkdf2:sha256:260000$ShHTWY0RRjObny6r$1086d1deed1b69ebe2dbdb7fccb2f644064594adefa4283fda546f2bd476a93b	\N	26
29	asdfsadf			\N		f	743811cd-0df6-41d7-a7a4-0db7a47462d6	pbkdf2:sha256:260000$Lq5fG73DkeuBhPGf$ca66090e16c5e6f54b7e4621c7274c2b503cb3755374bd52b736abde01132589	\N	27
30	asdfasdf			\N		f	a1c0135c-6dc1-456d-af53-e704bb5634ce	pbkdf2:sha256:260000$ZeCpRPm06AjOip6T$0d53026657b0a1fb58626589d1c0ab3f62fd0a5bd29ad2164f32212413d5156a	\N	28
31	asdfasdfa			\N		f	ffa48f97-9b8a-467f-adee-87666087dec6	pbkdf2:sha256:260000$jJA8JggLX4kGkLdT$4e92e6b31be464a5e66a37a553ce1187ce39db575f591fe487f29c729a481d74	\N	29
32	asdfasdfas			\N		f	51727993-836d-4fbc-844f-997d6ea4d26a	pbkdf2:sha256:260000$QQxaPjuQXarrWQtc$2556fc5a4f846aa098badfe5e74639627f48b826798cc28cc16fdbb15a985560	\N	30
33	asdfdfasdf			\N		f	26199713-9527-4757-8d8f-f109c74120be	pbkdf2:sha256:260000$bwZeYxSKOXKUL15A$20bfdb004adcceadad775931651d7d593913f63987fab90ec6359dcdcba8f3a5	\N	31
34	sfgdsfgsdfg			\N		f	952e8b8c-9838-4842-94cf-8f566b95c1f0	pbkdf2:sha256:260000$SJopMCWe4Zv4SiID$9fa1a6fec8360cb6c93ce952a7f857eaa81a3d4b7015bf1134e4e332b8faddf6	\N	32
\.


--
-- Name: business_offerings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_offerings_id_seq', 10, true);


--
-- Name: business_offerings_offering_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_offerings_offering_id_seq', 2, true);


--
-- Name: business_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_reviews_id_seq', 195, true);


--
-- Name: business_reviews_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.business_reviews_user_id_seq', 99, true);


--
-- Name: bussiness_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.bussiness_id_seq', 12, true);


--
-- Name: carousel_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.carousel_image_id_seq', 21, true);


--
-- Name: direct_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.direct_messages_id_seq', 16, true);


--
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.message_id_seq', 32, true);


--
-- Name: messaging_ids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.messaging_ids_id_seq', 46, true);


--
-- Name: offering_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.offering_id_seq', 14, true);


--
-- Name: reply_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.reply_id_seq', 24, true);


--
-- Name: review_reply_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.review_reply_id_seq', 17, true);


--
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.review_review_id_seq', 214, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eris
--

SELECT pg_catalog.setval('public.users_id_seq', 35, true);


--
-- Name: business_offerings business_offerings_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT business_offerings_pk PRIMARY KEY (id);


--
-- Name: business_reviews business_reviews_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_reviews
    ADD CONSTRAINT business_reviews_pk PRIMARY KEY (id);


--
-- Name: business bussiness_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT bussiness_pk PRIMARY KEY (id);


--
-- Name: carousel_image carousel_image_pkey; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.carousel_image
    ADD CONSTRAINT carousel_image_pkey PRIMARY KEY (id);


--
-- Name: direct_messages direct_messages_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_pk PRIMARY KEY (id);


--
-- Name: message message_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pk PRIMARY KEY (id);


--
-- Name: messaging_ids messaging_ids_name_key; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.messaging_ids
    ADD CONSTRAINT messaging_ids_name_key UNIQUE (name);


--
-- Name: messaging_ids messaging_ids_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.messaging_ids
    ADD CONSTRAINT messaging_ids_pk PRIMARY KEY (id);


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
-- Name: reply reply_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_pk PRIMARY KEY (id);


--
-- Name: review review_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pk PRIMARY KEY (review_id);


--
-- Name: review_reply review_reply_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review_reply
    ADD CONSTRAINT review_reply_pk PRIMARY KEY (id);


--
-- Name: business unique_email; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


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
-- Name: business bussiness_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT bussiness_fk0 FOREIGN KEY (messaging_id) REFERENCES public.messaging_ids(id);


--
-- Name: carousel_image carousel_image_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.carousel_image
    ADD CONSTRAINT carousel_image_fk0 FOREIGN KEY (business_id) REFERENCES public.business(id);


--
-- Name: direct_messages direct_messages_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_fk0 FOREIGN KEY (message_id) REFERENCES public.message(id);


--
-- Name: direct_messages direct_messages_fk1; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_fk1 FOREIGN KEY (sender_id) REFERENCES public.messaging_ids(id);


--
-- Name: direct_messages direct_messages_fk2; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_fk2 FOREIGN KEY (reciever_id) REFERENCES public.messaging_ids(id);


--
-- Name: direct_messages direct_messages_previous_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.direct_messages
    ADD CONSTRAINT direct_messages_previous_message_id_fkey FOREIGN KEY (previous_message_id) REFERENCES public.message(id);


--
-- Name: business_offerings fk_business_id; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.business_offerings
    ADD CONSTRAINT fk_business_id FOREIGN KEY (business_id) REFERENCES public.business(id);


--
-- Name: reply reply_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: review_reply review_reply_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review_reply
    ADD CONSTRAINT review_reply_fk0 FOREIGN KEY (business_review_id) REFERENCES public.business_reviews(id);


--
-- Name: review_reply review_reply_fk1; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.review_reply
    ADD CONSTRAINT review_reply_fk1 FOREIGN KEY (reply_id) REFERENCES public.reply(id);


--
-- Name: users users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: eris
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk0 FOREIGN KEY (messaging_id) REFERENCES public.messaging_ids(id);


--
-- PostgreSQL database dump complete
--

