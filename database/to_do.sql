--
-- PostgreSQL database dump
--

\restrict Q7j0Tol3Iht92wM9yHJdd4bQ5yev0H5aJnM6yRtMxVvRrHKhYPyjMqjp27ymTd7

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: to_do_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.to_do_data (
    id integer NOT NULL,
    title character varying(255),
    status boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.to_do_data OWNER TO postgres;

--
-- Name: to_do_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.to_do_data ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.to_do_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: to_do_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.to_do_data (id, title, status, created_at) FROM stdin;
43	Cek mau berak yo	t	2026-08-14 19:25:21.383507
34	Olahraga Sore	t	2026-07-31 01:41:12.087234
35	Tidur Kecapean	t	2026-07-31 01:41:17.752255
33	Baca Malaka Book "The cure of procrastination"	t	2026-07-31 01:40:55.659443
44	Panel Tanggal a	t	2026-08-19 00:02:43.469588
45	Makan Ges	t	2026-08-19 07:34:11.491636
32	Service Motor	t	2026-07-31 01:40:31.186244
37	Music Player + Lyrics	f	2026-08-03 00:32:29.249843
36	Perbaiki To-Do. (Edit) - Aku di update dari postgres	t	2026-07-31 01:41:44.603721
\.


--
-- Name: to_do_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.to_do_data_id_seq', 45, true);


--
-- Name: to_do_data to_do_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.to_do_data
    ADD CONSTRAINT to_do_data_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict Q7j0Tol3Iht92wM9yHJdd4bQ5yev0H5aJnM6yRtMxVvRrHKhYPyjMqjp27ymTd7

