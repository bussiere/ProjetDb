Date: 2012-12-19
Title: Les Query en django
Category: Geek
Tags: Django,Query,Sql



Pour ceux qui ne sont pas au courant, Django c'est le bien.

Sauf que je galere tout le temps avec les query, du coup cet article va me servir de pense bete a moi aussi et de tutorial pour vous.
Je m'appui


Donc :

Recuperer tout les objets d'un type :
all_entries = Entry.objects.all()


Mettre un filtre precis sur un objet :
(ici le = signifie exactement)
Entry.objects.filter(pub_date__year=2006)


Tout les objets ne correspondant pas a une requete :
(ici le = signifie exactement)
Entry.objects.exclude(pub_date__year=2006)

Pour des questions de lisibilité il vaut mieux enchainer les query :

q1 = Entry.objects.filter(headline__startswith="What")
q2 = q1.exclude(pub_date__gte=datetime.date.today())
q3 = q1.filter(pub_date__gte=datetime.date.today())
q4 = q2.filter(pub_date__year=2006)


Pour obtenir un objet precis :
one_entry = Entry.objects.get(pk=1)

Par contre attention la requete leve une erreur si cette requete ne renvois rien.

Si vous n'etes pas sur il vaut mieux utiliser :
Ceci renverra null ou quelquechose si elle existe et pas d'erreur
Entry.objects.filter(pk__exact=1)

Des recherches qui contiennent un bout de texte (like en sql) :

# toute les annees 2000 (qui contiennent 20 donc)
# mais peut ramener 1920
Entry.objects.filter(pub_date__year__contains='20')

#ne ramene que les annees spot 2000 (inclus) :
Entry.objects.filter(pub_date__year__startswith='20')

Requete particuliere et multiple :

# Ramene les entrees avec les  id 1, 4 et 7
Entry.objects.filter(pk__in=[1,4,7])

# Ramene les entrees avec  id > 14
Entry.objects.filter(pk__gt=14)


Requete avec des relations :
Blog.objects.filter(entry__authors__name='Lennon')


Source :
https://docs.djangoproject.com/en/dev/topics/db/queries/