PGDMP  %                     }            software-portfolio    17.2    17.1 !    =           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            >           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            @           1262    16387    software-portfolio    DATABASE     �   CREATE DATABASE "software-portfolio" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 $   DROP DATABASE "software-portfolio";
                     postgres    false            �            1259    16399    Admin    TABLE     a   CREATE TABLE public."Admin" (
    id integer NOT NULL,
    email text NOT NULL,
    name text
);
    DROP TABLE public."Admin";
       public         heap r       postgres    false            �            1259    16398    Admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Admin_id_seq";
       public               postgres    false    218            A           0    0    Admin_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;
          public               postgres    false    217            �            1259    16427    Clone    TABLE     �   CREATE TABLE public."Clone" (
    id integer NOT NULL,
    clone_url text,
    image_url text,
    clone_title text,
    "clone_Description" text
);
    DROP TABLE public."Clone";
       public         heap r       postgres    false            �            1259    16426    Clone_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Clone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Clone_id_seq";
       public               postgres    false    224            B           0    0    Clone_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Clone_id_seq" OWNED BY public."Clone".id;
          public               postgres    false    223            �            1259    16418    Project    TABLE     �   CREATE TABLE public."Project" (
    id integer NOT NULL,
    project_url text,
    image_url text,
    project_title text,
    "project_Description" text
);
    DROP TABLE public."Project";
       public         heap r       postgres    false            �            1259    16417    Project_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Project_id_seq";
       public               postgres    false    222            C           0    0    Project_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;
          public               postgres    false    221            �            1259    16409    Recommendation    TABLE     �   CREATE TABLE public."Recommendation" (
    id integer NOT NULL,
    image_url text,
    recommender_name text,
    recommender_title text,
    recommendation text
);
 $   DROP TABLE public."Recommendation";
       public         heap r       postgres    false            �            1259    16408    Recommendation_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Recommendation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Recommendation_id_seq";
       public               postgres    false    220            D           0    0    Recommendation_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Recommendation_id_seq" OWNED BY public."Recommendation".id;
          public               postgres    false    219            �           2604    16402    Admin id    DEFAULT     h   ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);
 9   ALTER TABLE public."Admin" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �           2604    16430    Clone id    DEFAULT     h   ALTER TABLE ONLY public."Clone" ALTER COLUMN id SET DEFAULT nextval('public."Clone_id_seq"'::regclass);
 9   ALTER TABLE public."Clone" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            �           2604    16421 
   Project id    DEFAULT     l   ALTER TABLE ONLY public."Project" ALTER COLUMN id SET DEFAULT nextval('public."Project_id_seq"'::regclass);
 ;   ALTER TABLE public."Project" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            �           2604    16412    Recommendation id    DEFAULT     z   ALTER TABLE ONLY public."Recommendation" ALTER COLUMN id SET DEFAULT nextval('public."Recommendation_id_seq"'::regclass);
 B   ALTER TABLE public."Recommendation" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            4          0    16399    Admin 
   TABLE DATA           2   COPY public."Admin" (id, email, name) FROM stdin;
    public               postgres    false    218   .#       :          0    16427    Clone 
   TABLE DATA           ]   COPY public."Clone" (id, clone_url, image_url, clone_title, "clone_Description") FROM stdin;
    public               postgres    false    224   K#       8          0    16418    Project 
   TABLE DATA           e   COPY public."Project" (id, project_url, image_url, project_title, "project_Description") FROM stdin;
    public               postgres    false    222   N$       6          0    16409    Recommendation 
   TABLE DATA           n   COPY public."Recommendation" (id, image_url, recommender_name, recommender_title, recommendation) FROM stdin;
    public               postgres    false    220   _&       E           0    0    Admin_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Admin_id_seq"', 1, false);
          public               postgres    false    217            F           0    0    Clone_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Clone_id_seq"', 2, true);
          public               postgres    false    223            G           0    0    Project_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Project_id_seq"', 3, true);
          public               postgres    false    221            H           0    0    Recommendation_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Recommendation_id_seq"', 3, true);
          public               postgres    false    219            �           2606    16406    Admin Admin_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "Admin_pkey";
       public                 postgres    false    218            �           2606    16434    Clone Clone_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Clone"
    ADD CONSTRAINT "Clone_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Clone" DROP CONSTRAINT "Clone_pkey";
       public                 postgres    false    224            �           2606    16425    Project Project_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_pkey";
       public                 postgres    false    222            �           2606    16416 "   Recommendation Recommendation_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Recommendation"
    ADD CONSTRAINT "Recommendation_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Recommendation" DROP CONSTRAINT "Recommendation_pkey";
       public                 postgres    false    220            �           1259    16407    Admin_email_key    INDEX     M   CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);
 %   DROP INDEX public."Admin_email_key";
       public                 postgres    false    218            4      x������ � �      :   �   x��νn�0���/p�5�t���.Y�ܚkp�c;�x�&iթR��#��諳%%_�2z���A��Յ'MրG���p�iC�\#��>H�X|RP��}��uM:ƕ�l'T� 8`���EU�����<J�(	�o�
o����`��"��(�W�)<*i6�2��n"v3ia�69k\�d�?���Љ
D�߁Oj��޵]]i5�Z��Y��O�q<����;�-δ�M,�1�?�s���Zt      8     x���OS�0��ɧ�c�q�Co4�-	���2����Ȗ�ֱç� 43�:=hF����~ou�+�\�<�(���b4!�NKi�{�w��x�x�Ê�,�&0��#

��@�p���TH���J��S�	6��c6��el���Rb��*g�g�����������}����\B�hC���j,kL�E��@�q��m��P�-~,�!��j���4U`����I���<��I�+[9I�C(c����n{���Ӊ�}��#���������/o^nۮY��㻋⪷����"�Cl��~��XaM���{�0�b@�#'��j*a�%��n�:z�b͵iu��V����X�����=�}"l��l�*�X�|�ּ������vx�X�_Y��!5���斬�1q��{��MD.�;,~��=����X�;�1P�V��$�֥�m��m7c�6P�HN<��T�٧yT5�������_���3/�����c������?�h�      6   �  x�mU�v�6<���o�hF�#[��$?/r��y��K�h�Ѐ�áO���^�$��hs|�7�TU.������ѐ�����:�ccX�'����ɉ���ue�e����S>)��vj7nu�K�x�0�Փ��-�p7,���,�s���G2��.��ID�Npnl����lG�`��]M~4��?Jm��J�o�˭�z�;CE�C�$�	�ɡ,�65��K��L�B���APkkӔo&)��ōunE�.G�O�;7Q5t�6�ƣp�$F�C"v�S#�ǫ!R����sr�*[Z���8�ȶ��;��U>����Y��Mi#5�>lh�H��F�%��0���R|K	-G'��q�uΧgC���0h�v	Xp	������}�)z���(v@��y#΢&���J�c�UY��7�Ma@�(��-!H+����N���B��V�@����Otwj�?�v����ߎ�N������M��i�+Ƈ��o��������v��[	�,�̥rE�4t�����0���`�
m:?vt�˻����+�`5�]�F�![�$�Dj�p�̏�F�6�Tic7���Nդ��W���v��Y�3i1Ju�.�e��@�S���N6bN�J�J������Ѹ��eBH��#�
���A��A�dg���s7����{�j��iU�
�S��QB��2	�A�oU�o؈.i�-℣u� �[��u+J�Rs}���FeEUv��(�
B˹�ߪA�4g!֌4��zp���_n�;��f4�W���8:��ŋW����7�?Wi��������˕�}Y����o�ttnC�,�~x�s�(�D�hd6�{��x����@Y�tv�J�Sn[}�m]Ǚ��4r�k��=���P�j��
���m�?@GA�;Θ;(�y$b�ePa�������G�H����V}�2�!��REa�K�2ZA����=��d��H���d{;b���i���Wg�N����\��Ĺ�A���m��4�~:�a#kanKt�oL_�f@�A<탘?'j�8�����#b{�/*��z�~��OK��XE�8//ӥϡX�ܒ���륆��-�w8�Y���7�Γ�C���cLH^x�*��!����Ο�[/�Nl����=ā�Z��:88�v��M     