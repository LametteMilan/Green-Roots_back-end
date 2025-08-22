--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg20.04+1)

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
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.bookmarks (
    id_user integer NOT NULL,
    id_product integer NOT NULL
);


ALTER TABLE public.bookmarks OWNER TO greenroots;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.cart (
    id_cart integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.cart OWNER TO greenroots;

--
-- Name: cart_id_cart_seq; Type: SEQUENCE; Schema: public; Owner: greenroots
--

CREATE SEQUENCE public.cart_id_cart_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_id_cart_seq OWNER TO greenroots;

--
-- Name: cart_id_cart_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: greenroots
--

ALTER SEQUENCE public.cart_id_cart_seq OWNED BY public.cart.id_cart;


--
-- Name: contains; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.contains (
    id_order integer NOT NULL,
    id_product integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.contains OWNER TO greenroots;

--
-- Name: product; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.product (
    id_product integer NOT NULL,
    product_name character varying(50) NOT NULL,
    product_description text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    product_price numeric(10,2) NOT NULL,
    product_localisation character varying(100) NOT NULL,
    image_product character varying(255) NOT NULL
);


ALTER TABLE public.product OWNER TO greenroots;

--
-- Name: product_cart; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.product_cart (
    id_cart integer NOT NULL,
    id_product integer NOT NULL,
    product_quantity integer NOT NULL
);


ALTER TABLE public.product_cart OWNER TO greenroots;

--
-- Name: product_id_product_seq; Type: SEQUENCE; Schema: public; Owner: greenroots
--

CREATE SEQUENCE public.product_id_product_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_product_seq OWNER TO greenroots;

--
-- Name: product_id_product_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: greenroots
--

ALTER SEQUENCE public.product_id_product_seq OWNED BY public.product.id_product;


--
-- Name: rating; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.rating (
    id_user integer NOT NULL,
    id_product integer NOT NULL,
    rating_created_at timestamp with time zone NOT NULL,
    rating_note integer NOT NULL,
    rating_comment text NOT NULL
);


ALTER TABLE public.rating OWNER TO greenroots;

--
-- Name: table_order; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.table_order (
    id_order integer NOT NULL,
    order_status character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    order_total numeric(15,2) NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.table_order OWNER TO greenroots;

--
-- Name: table_order_id_order_seq; Type: SEQUENCE; Schema: public; Owner: greenroots
--

CREATE SEQUENCE public.table_order_id_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.table_order_id_order_seq OWNER TO greenroots;

--
-- Name: table_order_id_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: greenroots
--

ALTER SEQUENCE public.table_order_id_order_seq OWNED BY public.table_order.id_order;


--
-- Name: users; Type: TABLE; Schema: public; Owner: greenroots
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    password character varying(255) NOT NULL,
    email text NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    user_role character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    street character varying(100) NOT NULL,
    zip_code character varying(10) NOT NULL,
    country character varying(50) NOT NULL,
    city character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO greenroots;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: greenroots
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_user_seq OWNER TO greenroots;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: greenroots
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: cart id_cart; Type: DEFAULT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.cart ALTER COLUMN id_cart SET DEFAULT nextval('public.cart_id_cart_seq'::regclass);


--
-- Name: product id_product; Type: DEFAULT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.product ALTER COLUMN id_product SET DEFAULT nextval('public.product_id_product_seq'::regclass);


--
-- Name: table_order id_order; Type: DEFAULT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.table_order ALTER COLUMN id_order SET DEFAULT nextval('public.table_order_id_order_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.bookmarks (id_user, id_product) FROM stdin;
1	1
1	2
1	3
1	4
2	1
2	2
2	3
2	4
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.cart (id_cart, created_at, updated_at, id_user) FROM stdin;
\.


--
-- Data for Name: contains; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.contains (id_order, id_product, quantity, price) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.product (id_product, product_name, product_description, created_at, updated_at, product_price, product_localisation, image_product) FROM stdin;
1	Baobab	Connu comme "l'arbre de vie", il stocke l’eau dans son tronc massif et fournit des fruits riches en vitamine C, feuilles nutritives et écorce médicinale.	2025-07-28 19:47:38.422056+02	2025-07-28 19:47:38.422056+02	18.00	Afrique subsaharienne	baobab.webp
2	Chêne pédonculé	Arbre robuste et à croissance lente, essentiel à la biodiversité forestière. Il abrite de nombreuses espèces d'insectes, oiseaux et champignons.	2025-07-28 19:47:38.423686+02	2025-07-28 19:47:38.423686+02	20.00	France	chene_pedoncule.webp
3	Acajou	Arbre tropical précieux, menacé par l’exploitation illégale. Il joue un rôle clé dans la stabilisation des sols tropicaux.	2025-07-28 19:47:38.424461+02	2025-07-28 19:47:38.424461+02	41.50	Amazonie	acajou.webp
4	Teck	Très prisé pour son bois résistant. Sa plantation durable peut compenser les pertes de forêts naturelles.	2025-07-28 19:47:38.425174+02	2025-07-28 19:47:38.425174+02	11.00	Indonésie	teck.webp
5	Manguier	En plus de ses fruits nutritifs, le manguier est un excellent arbre pour l’ombre et l’amélioration des sols.	2025-07-28 19:47:38.425883+02	2025-07-28 19:47:38.425883+02	99.99	Inde	manguier.webp
6	Pin sylvestre	Résistant au froid, il est essentiel pour reboiser les zones boréales et joue un rôle majeur dans le captage du carbone.	2025-07-28 19:47:38.426663+02	2025-07-28 19:47:38.426663+02	5.00	Russie	pin_sylvestre.webp
7	Albizia	Arbre à croissance rapide, souvent utilisé en agroforesterie. Il améliore la fertilité des sols grâce à sa capacité à fixer l’azote. Moins exigeant en eau que l’eucalyptus, il offre de l’ombre, du fourrage pour le bétail, et aide à lutter contre l’érosion.	2025-07-28 19:47:38.427323+02	2025-07-28 19:47:38.427323+02	89.50	Afrique	albizia.webp
8	Noyer d’Amérique	Arbre à bois noble, il contribue à la biodiversité des forêts tempérées. Ses noix nourrissent de nombreuses espèces.	2025-07-28 19:47:38.428606+02	2025-07-28 19:47:38.428606+02	9.99	Amérique du Nord	noyer_amerique.webp
9	Arbre à pain	Arbre nourricier dont les fruits riches en amidon sont une source alimentaire importante dans les régions tropicales.	2025-07-28 19:47:38.429441+02	2025-07-28 19:47:38.429441+02	20.00	Caraïbes	arbre_a_pain.webp
10	Moringa	Arbre miracle pour ses feuilles très nutritives, ses graines purificatrices d’eau, et sa croissance rapide.	2025-07-28 19:47:38.431224+02	2025-07-28 19:47:38.431224+02	4.50	Inde	moringa.webp
\.


--
-- Data for Name: product_cart; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.product_cart (id_cart, id_product, product_quantity) FROM stdin;
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.rating (id_user, id_product, rating_created_at, rating_note, rating_comment) FROM stdin;
\.


--
-- Data for Name: table_order; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.table_order (id_order, order_status, created_at, updated_at, order_total, id_user) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: greenroots
--

COPY public.users (id_user, password, email, first_name, last_name, user_role, created_at, updated_at, street, zip_code, country, city) FROM stdin;
1	$2b$10$xnyKIVxggh.GIAupUQ6b6OeqkQLpADtpYjBELHnPRAiQKndhN7.Ua	admin@green-roots.com	Vincent	Rousselet	admin	2025-07-28 19:47:38.482539+02	2025-07-28 19:47:38.482539+02	4 rue à gauche	14000	Citoyen du monde	a gauche
2	$2b$10$Ns/Ih1sTVeRLbgdwGp9u6OXiTaQRnn/fP/LfweNU4md3PMPV1L8Se	user@green-roots.com	Milan	Milette	customer	2025-07-28 19:47:38.534395+02	2025-07-28 19:47:38.534395+02	2 rue du boulevard	67890	Oui	Non
\.


--
-- Name: cart_id_cart_seq; Type: SEQUENCE SET; Schema: public; Owner: greenroots
--

SELECT pg_catalog.setval('public.cart_id_cart_seq', 1, false);


--
-- Name: product_id_product_seq; Type: SEQUENCE SET; Schema: public; Owner: greenroots
--

SELECT pg_catalog.setval('public.product_id_product_seq', 10, true);


--
-- Name: table_order_id_order_seq; Type: SEQUENCE SET; Schema: public; Owner: greenroots
--

SELECT pg_catalog.setval('public.table_order_id_order_seq', 1, false);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: greenroots
--

SELECT pg_catalog.setval('public.users_id_user_seq', 2, true);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id_user, id_product);


--
-- Name: cart cart_id_user_key; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_id_user_key UNIQUE (id_user);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id_cart);


--
-- Name: contains contains_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_pkey PRIMARY KEY (id_order, id_product);


--
-- Name: product_cart product_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.product_cart
    ADD CONSTRAINT product_cart_pkey PRIMARY KEY (id_cart, id_product);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id_product);


--
-- Name: product product_product_name_key; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_name_key UNIQUE (product_name);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id_user, id_product);


--
-- Name: table_order table_order_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.table_order
    ADD CONSTRAINT table_order_pkey PRIMARY KEY (id_order);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: bookmarks bookmarks_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: bookmarks bookmarks_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- Name: cart cart_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- Name: contains contains_id_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_id_order_fkey FOREIGN KEY (id_order) REFERENCES public.table_order(id_order);


--
-- Name: contains contains_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: product_cart product_cart_id_cart_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.product_cart
    ADD CONSTRAINT product_cart_id_cart_fkey FOREIGN KEY (id_cart) REFERENCES public.cart(id_cart);


--
-- Name: product_cart product_cart_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.product_cart
    ADD CONSTRAINT product_cart_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: rating rating_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: rating rating_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- Name: table_order table_order_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: greenroots
--

ALTER TABLE ONLY public.table_order
    ADD CONSTRAINT table_order_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- PostgreSQL database dump complete
--

