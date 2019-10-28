# Hitema-M2x1-ExamMongo2019-2020
#### Hitema-M2x1-ExamMongo2019-2020 CONTE Corentin & ARINOUCHKINE Aliaksandr

## Gestionnaire de liste de Figurine

Ce mini-projet permet d'établir des listes de figurines de jeu au travers d'une interface SingleScreen et simple d'utilisation.
On Retrouve dans assets une image nommé  "InterfacePrévu.png"; on y distingue 2 encadrements, celui de gauche est "Le Stock" et celui de doite est "La Liste". On trouve dans "Le Stock" les figurines en base de données, on pourras les sélectionner par factions, elles sont sytématiquement trier par ordre de "Valeur en jeu", terme se référent au règle du jeu. Un clic sur une figurine du "Stock" s'ajoute à "La Liste", "La Liste" pouvant regrouper plusieurs figurines identiques ne supprime pas son contenue des résultat apparaissant dans "Le Stock".
Un clic sur une figurine de "La Liste" reduit son nombre de 1 jusqu'a 0 ce qui retire la figurine de "La Liste."

Il est possible de charger une liste en tapant le titre de la liste précedement enregistrer.
On peut enregistrer une liste et overwrite une liste éxistante.

### Définir une figurine
Une figurine est définit par les caractéristique suivante:
Price,Name,pointValue,ExpectedTime,Story,Faction.

### Objectif technique
L'objectif technique est d'avoir un fonctionnement de MongoDB en réplicat.
Les produits(figurines) étant officielles elles requiert une intervention administrateur pour importer les figurines.
(l'utilisateurs n'a pas de droit sur le stock)

### Récapitulatif et options
Le projet ne sert pas a acheter directement les figurines mais à éditer une liste prévisionnel pour achat ou campagne.
Pourquoi ce thème ? La manière de jouer de chaque faction possède des critères différent, Mongo manipulant des objet JSON est adapté.
Les figurines et le thème en général provient du système de jeu de plateau de Games Workshop: Warhammer 40k.
Voir : https://www.games-workshop.com/fr-FR/Warhammer-40-000

L'export de la liste n'est pas prévu durant le projet mais peux être fait si le temps nous l'accorde.

## Définition des objets

Une figurine sera composé de la manière suivante :
```json
{
    "_id" : ObjectId("5db2e3dd4b4b28760519d7e3"),
    "Price" : {
        "Quantity" : 120,
        "Currency" : "€",
        "CurrencyName" : "Euro"
    },
    "Name" : "Soldat",
    "pointValue" : 25,
    "ExpectedTime" : "35mn",
    "Story" : "Common soldier from a Hive, Cadia is here.",
    "Faction" : "Imperium of Men"
}
```
Une liste sera composé de la manière suivante (si enregistré {optionnel}) :
```json
{
    "_id" : ObjectId("1dF2e3dd4b4b28760519A9F8"),
    "title" : "Cadia's main list",
    "Composition" : [ 
        {
            "_id" : ObjectId("5db2e3dd4b4b28760519d7e3"),
        "Nb" : 1,
        }, 
        {
            "_id" : ObjectId("6A8b2e3dd4b4b28960519d77"),
        "Nb" : 5,
        }
    ]
}
```

Dans Assets une collection de figurine sera fourni,
Il sera requis de créer une base de données avec les réplicaSet nécessaire.
On y créeras 2 collections figurines et listes.

## Les étapes pour mongo
On peut suivre les étapes suivantes afin de créer la base mongoDB et pour plus d'information le récapitulatif du cours se trouve en fin de fichier.
```
On ouvre une fenêtre powershell dans le dossier racine du mongo.
->Démarrer le Serveur en mode réplica
mongod --dbpath <VotreDestinationDeStockage>\data\R0S1 --replSet rs0 --port 27057
->Initialiser le réplicaSet
*Se connecter au Replica principal avec mongo --port 27057
rs.initiate();
->Démarrer les serveurs secondaire
mongod --dbpath <VotreDestinationDeStockage>\data\R0S2 --replSet rs0 --port 27058
mongod --dbpath <VotreDestinationDeStockage>\data\R0S3 --replSet rs0 --port 27059
->Sur le Principal ajouter le réplica dans le Set
*Se connecter au Replica principal avec mongo --port 27057
rs.add("localhost:27058");
rs.add("localhost:27059");
->Démarrer le serveur Arbitre
mongod --port 30000 --dbpath <VotreDestinationDeStockage>\data\arb --replSet rs0
->Sur le Principal ajouter l'arbitre dans le Set
*Se connecter au Replica principal avec mongo --port 27057
rs.addArb("localhost:27030")
->Importer les fichiers figurines.json et listes.json
mongoimport --port 27058 --db PathToWarhammer --collection figurines <racineProjet>/assets/figurines.json
mongoimport --port 27058 --db PathToWarhammer --collection listes <racineProjet>/assets/listes.json
```
By CONTE Corentin and ARINOUCHKINE Aliaksandr.

/////**Rappel Utilisation de Mongo :**/////
**Info**
On définie le port 27058 comme étant le Primary par defaut dans ce fichier


**general**

Démarrer un serveur sans réplicat
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
->Démarrer le Serveur en mode réplica
->Initialisé le réplicaSet
->Démarrer le serveur secondaire
->Sur le Principal ajouter le réplica dans le Set
->Démarrer le serveur Arbitre
->Sur le Principal ajouter l'arbitre dans le Set

Démarrer un réplica
.\mongod.exe --dbpath <DossierServeur> --replSet <NomGroupeReplica> --port <PortServeur/Replica>
Ex: .\mongod.exe --dbpath W:\HitemaM2x1\Mongo\data\R0S1 --replSet rs0 --port 27059

Initialisé un réplicaSet
-> Se connecter au Replica principal.
rs.initiate();

Ajouter un réplica à un set
-> Se connecter au Replica principal.
rs.add("<AddresseSecondaire>")
Ex:     .\mongo.exe --port 27058
    rs.add("localhost:27059")

Demarer un arbitre de repSet
mongod --port <PortArbitre> --dbpath <DossierArbitre> --replSet <NomGroupeReplica>
Ex: mongod --port 30000 --dbpath W:\HitemaM2x1\Mongo\data\arb --replSet rs0

Ajouter un arbitre au repset
-> Se connecter au Replica principal.
rs.addArb("<AddresseArbitre>")//pour un arbitre déja démarrer
Ex:     .\mongo.exe --port 27058
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

Démarrer les shards et les initialiser (eval execute une commande
mongod --shardsvr --replSet <NomRepSet2ou3> --port <PortShard> --dbpath <DossierShard>
mongo --port <PortShard> --eval "rs.initiate()"
Ex:     ./mongod --shardsvr --replSet sh1 --port 27048 --dbpath W:\HitemaM2x1\Mongo\data\sh1
    ./mongod --shardsvr --replSet sh2 --port 27049 --dbpath W:\HitemaM2x1\Mongo\data\sh2
    ./mongo --port 27048 --eval "rs.initiate()"
    ./mongo --port 27049 --eval "rs.initiate()"

Démarrer un mongos
mongos --configdb <NomGroupeReplica1>/localhost:<PortConfigPrimary> --port <PortMongos>
Ex: ./mongos --configdb configReplSet/localhost:27058 --port 27050

Relier les shard au Mongos
-> se connecter au mongos
sh.addShard("<NomRepSet2ou3>/<AdresseShardRelié>")
Ex: sh.addShard( "sh1/localhost:27048");
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






