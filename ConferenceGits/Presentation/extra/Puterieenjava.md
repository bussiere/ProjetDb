Date: 2012-12-28
Title: Petite Puterie en java
Category: Geek
Tags: geek,java,prog

[0]: http://sametmax.com/loperateur-not-bitwise-ou-tilde-en-javascript/  "Tres bon blog"
[1]: http://sametmax.com "Tres bon site"

Suite a ce [post][0] sur le site de [sam et max][1], j'ai eu l'idée d'une petite puterie en java.

Je vous la livre :

    for (int i = 0;i < 5; i = -(~i))
    {
        System.out.println(i);
    }
