# Hitema-M2x1-ExamMongo2019-2020
Hitema-M2x1-ExamMongo2019-2020
Gestion de Figurine

Une figurine est définit comme:
Price,Name,pointValue,ExpectedTime,Story,Faction.

L'objectif est d'avoir un fonctionnement en réplicat.
On cherche à avoir un store puis un créateur de liste. On peut parler de liste dans le cas d'une liste d'achat ou d'une liste de compétition.
Elles sont composé de la même manière.

Le projet ne sert pas a acheter les figurines mais à éditer une liste prévisionnel pour achat ou campagne.
Pourqui ce thème ? La manière de jouer de chaque faction possède des critères différent, Mongo manipulant des objet JSON est adapté.
L'export de la liste n'est pas prévu durant le projet mais peux être fait si le temps nous l'accorde.

Les figurines et le thème en général est parti du système de jeu de plateau de Games Workshop: Warhammer 40k.
Voir : https://www.games-workshop.com/fr-FR/Warhammer-40-000



By CONTE Corentin.

Rappel Utilisation de Mongo :


**Info**
On définie le port 27058 comme étant le Primary par defaut dans ce fichier


**general**

Démarer un serveur sans réplicat
.\mongod.exe --dbpath <DossierServeur>
Ex: .\mongod.exe --dbpath W:\HitemaM2x1\Mongo\Data

Se connecter à un serveur
.\mongo.exe --port <PortServeur>
Ex: .\mongo.exe --port 27058

Import de fichier
.\mongoimport --port <PortServeur> --db <NomDatabase> --collection <NomCollection> <FileLocation>/restaurants.json
Ex: .\mongoimport --port 27058 --db new_york --collection restaurants ../../restaurants.json

**Replica**

Bien faire un réplicaSet puis un arbitre
->Démarer le Serveur en mode réplica
->Initialisé le réplicaSet
->Démarer le serveur secondaire
->Sur le Principal ajouter le réplica dans le Set
->Démarer le serveur Arbitre
->Sur le Principal ajouter l'arbitre dans le Set

Démarer un réplica
.\mongod.exe --dbpath <DossierServeur> --replSet <NomGroupeReplica> --port <PortServeur/Replica>
Ex: .\mongod.exe --dbpath W:\HitemaM2x1\Mongo\data\R0S1 --replSet rs0 --port 27059

Initialisé un réplicaSet
-> Se connecter au Replica principal.
rs.initiate();

Ajouter un réplica à un set
-> Se connecter au Replica principal.
rs.add("<AddresseSecondaire>")
Ex: 	.\mongo.exe --port 27058
	rs.add("localhost:27059")

Demarer un arbitre de repSet
mongod --port <PortArbitre> --dbpath <DossierArbitre> --replSet <NomGroupeReplica>
Ex: mongod --port 30000 --dbpath W:\HitemaM2x1\Mongo\data\arb --replSet rs0

Ajouter un arbitre au repset
-> Se connecter au Replica principal.
rs.addArb("<AddresseArbitre>")//pour un arbitre déja démarer
Ex: 	.\mongo.exe --port 27058
	rs.addArb("localhost:27030")

**Sharding -- ReplicaShard**
*Info*
Les ports 27059 et 27058(P) sont désormais les configRep.
Les ports 27049 et 27048 sont désormais les Shards.
Le port 27050 est le mongos

Bien faire un Sharding
-> Faire les ConfigReplica
-> Initialisé les repSet sur les configs. 'rs.initiate();'
-> Faire les Shards (différents refset chacun)
-> Initialisé les Shards
-> Initialisé le mongos
-> relié les shard dans le mongos 

Demarer un ConfigReplica
./mongod --configsvr --replSet <NomGroupeReplica1> --port <portConfigServ> --dbpath <DossierCfg>
Ex1: ./mongod --configsvr --replSet configReplSet --port 27058 --dbpath W:\HitemaM2x1\Mongo\data\config1
Ex2: ./mongod --configsvr --replSet configReplSet --port 27059 --dbpath W:\HitemaM2x1\Mongo\data\config2

Démarer les shards et les initialiser (eval execute une commande
mongod --shardsvr --replSet <NomRepSet2ou3> --port <PortShard> --dbpath <DossierShard>
mongo --port <PortShard> --eval "rs.initiate()"
Ex: 	./mongod --shardsvr --replSet sh1 --port 27048 --dbpath W:\HitemaM2x1\Mongo\data\sh1
	./mongod --shardsvr --replSet sh2 --port 27049 --dbpath W:\HitemaM2x1\Mongo\data\sh2
	./mongo --port 27048 --eval "rs.initiate()"
	./mongo --port 27049 --eval "rs.initiate()"

Démarer un mongos
mongos --configdb <NomGroupeReplica1>/localhost:<PortConfigPrimary> --port <PortMongos>
Ex: ./mongos --configdb configReplSet/localhost:27058 --port 27050

Relier les shard au Mongos
-> se connecter au mongos
sh.addShard("<NomRepSet2ou3>/<AdresseShardRelié>")
Ex:	sh.addShard( "sh1/localhost:27048");
	sh.addShard( "sh2/localhost:27049");

**Sharding Suite - Distribution de la base de données**

*Infos*
Dans "Déclaration d'un sharding type" on éxécute une suite d'action afin d'obtenir une db= "testDB" possédant une collection= "test".

Déclaration d'un sharding type.
->Dans le mongos
Utilisation/creation (db devient testDB)
use testDB;
Autorisation Sharding
sh.enableSharding("testDB");
Création de la collection (Stocker)
db.createCollection("test");
Clé de sharding sur un index
db.test.createIndex({"_id":1});
Déclarer la clé de sharding dans la collectino
sh.shardCollection("testDB.test",{"_id":1});

Import sur le mongos
./mongoimport --db <NomDB> --collection <NomCollection> --port <PortMongos> <fichierJSONAImporter>
Ex: ./mongoimport --db testDB --collection test --port 27050 ../../restaurants.json
On peut consulter le status (mongo --port 27050 --eval "sh.status()")




Signé CONTE Corentin.





