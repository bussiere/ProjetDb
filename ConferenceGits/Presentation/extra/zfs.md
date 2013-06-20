Date: 2013-05-29
Title: Zfs
Category: Geek
Tags: zfs,unix,ubuntu,linux

Quelques commandes utiles pour zfs :


Revenir en arriere :

	zfs rollback tank/home/ahrens@tuesday

Envoyer et recevoir une image :


	# zfs send tank/gozer@0830 > /bkups/gozer.083006
	# zfs receive tank/gozer2@today < /bkups/gozer.083006
	# zfs rename tank/gozer tank/gozer.old
	# zfs rename tank/gozer2 tank/gozer