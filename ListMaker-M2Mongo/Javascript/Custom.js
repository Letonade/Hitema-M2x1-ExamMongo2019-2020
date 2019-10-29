
// Tools
var leStock = [
	{
		"_id" : "0",
		"Price" : {
		    "Quantity" : 0.90,
		    "Currency" : "€"
		},
			"Name" : "Guardsman",
			"pointValue" : 25,
			"ExpectedTime" : 35,
			"Story" : "Common soldier from a Hive, Cadia is here.",
			"Faction" : "Imperium of Men"
	},
	{
		"_id" : "1",
		"Price" : {
		    "Quantity" : 1.10,
		    "Currency" : "€"
		},
			"Name" : "Guardsman avec fuseur",
			"pointValue" : 30,
			"ExpectedTime" : 35,
			"Story" : "Common heavy soldier from a Hive, Cadia is here.",
			"Faction" : "Imperium of Men"
	},
	{
		"_id" : "2",
		"Price" : {
		    "Quantity" : 1,
		    "Currency" : "€"
		},
			"Name" : "Commissaire",
			"pointValue" : 28,
			"ExpectedTime" : 40,
			"Story" : "Common soldier from a Hive, Cadia is here.",
			"Faction" : "Imperium of Men"
	},
	{
		"_id" : "3",
	    "Price" : {
	        "Quantity" : 1.10,
	        "Currency" : "€"
	    },
	    	"Name" : "Soldat de feu",
	    	"pointValue" : 25,
	    	"ExpectedTime" : 45,
	    	"Story" : "Soldier from the great Tau empire.",
	    	"Faction" : "Tau"
	},
	{
		"_id" : "4",
	    "Price" : {
	        "Quantity" : 1.10,
	        "Currency" : "€"
	    },
	    	"Name" : "Armure Crysis",
	    	"pointValue" : 78,
	    	"ExpectedTime" : 70,
	    	"Story" : "Shock Exo-Armor from the great Tau empire.",
	    	"Faction" : "Tau"
	}
];
var laListe = {
				    "title" : "",
				    "Composition" : []
				};

// Custom

function testFunc(){
	return("TESTFUNC Ok"); 
}

//------- Opération de liste -------//
function selectFactionOnChange(obj){
	replaceStock(obj.options[obj.selectedIndex].value);
	return("SELECTFACTIONONCHANGE Success");
}

function addToListe(id){
	var pos = laListe.Composition.map(function(e){return e._id}).indexOf(id);
	if (pos != -1){
		laListe.Composition[pos].Nb += 1;
	}else{
		laListe.Composition.push({"_id" : id,"Nb" : 1, });
	}
	replaceListe();
	updateTotaux(id);
	return("ADDTOLISTE Success");
}

function minusToListe(id){
	var pos = laListe.Composition.map(function(e){return e._id}).indexOf(id);
	if (pos != -1){
		laListe.Composition[pos].Nb -= 1;
	}
	if (laListe.Composition[pos].Nb <= 0){
		laListe.Composition.splice(pos, 1);
	}
	replaceListe();
	updateTotaux(id);
	return("MINUSTOLISTE Success");
}

function updateTotaux(){
	var pos = 0, listCoutTotal = 0, listTempsTotal = 0, listPointTotal = 0;
	laListe.Composition.map(function(element) {
		pos = leStock.map(function(e) { return e._id; }).indexOf(element._id);
		listCoutTotal += leStock[pos].Price.Quantity*element.Nb;
		listTempsTotal += leStock[pos].ExpectedTime*element.Nb;
		listPointTotal += leStock[pos].pointValue*element.Nb;
	});
	$("#listCoutTotal").html((Math.trunc(listCoutTotal*100)/100)+"€");
	$("#listTempsTotal").html((Math.trunc(listTempsTotal*100)/100)+"mn");
	$("#listPointTotal").html((Math.trunc(listPointTotal*100)/100)+"pt");
	$("#listNbItem").html(laListe.Composition.reduce(function(base, toAdd) {return base + toAdd.Nb;}, 0));
	return("UPDATETOTAUX Success");
}

//------- Majeur de select -------//
function selectFactionDeployOption(){
	var txtOptions = '<option value="All">All</option>';
	var tabFactions = ["All"];
	leStock.forEach( function(element, index){
		if (tabFactions.indexOf(element.Faction) == -1) {
			tabFactions.push(element.Faction);
			txtOptions += '<option value="'+element.Faction+'">'+element.Faction+'</option>'
		}
	});
	$('#listSelectFactionStock').html(txtOptions);
	return("SELECTFACTIONDEPLOYOPTION Success");
}

//------- Replacer servant à Majer les listes -------//
function replaceStock(faction){
	var txt = "";
	leStock.forEach( function(element, index) {
		if (element.Faction == faction || faction == "All") {
			txt += "<div class='row px-4 my-2'>";
			txt += "	<input type='hidden' name='id' value='"+element._id+"'>";
			txt += "	<div class='col-10 border bg-white rounded p-2 text-muted shadow'>";
			txt += "		<div class='d-flex border-bottom'>";
			txt += "			<div>"+element.Name+"</div>";
			txt += "			<div class='ml-auto'>"+element.pointValue+"pt</div>";
			txt += "		</div>";
			txt += "		<div class='d-flex'>";
			txt += "			<div class='text-truncate custom-descTrunc' title='"+element.Story+"'>"+element.Story+"</div>";
			txt += "			<div class='ml-auto'>"+element.ExpectedTime+"mn</div>";
			txt += "			<div class='ml-auto'>"+element.Price.Quantity+element.Price.Currency+"</div>";
			txt += "		</div>";
			txt += "	</div>";
			txt += "	<input type='button' name='Add-Button' value='+' class='col-2 btn btn-secondary rounded shadow custom-compteur' onclick='addToListe(\""+element._id+"\");'>";
			txt += "</div>";
		}
	});
	$('#listStock').html(txt);
	return("REPLACESTOCK Success");
}

function replaceListe(){
	var txt = "";
		laListe.Composition.map(function(element) {
		var pos = leStock.map(function(e) { return e._id; }).indexOf(element._id);
		txt += "<div class='row px-4 my-2'>";
		txt += "	<input type='hidden' name='id' value='"+leStock[pos]._id+"'>";
		txt += "	<div class='col-10 border bg-white rounded p-2 text-muted shadow'>";
		txt += "		<div class='d-flex border-bottom'>";
		txt += "			<div>"+leStock[pos].Name+"</div>";
		txt += "			<div class='ml-auto'>"+leStock[pos].pointValue+"pt</div>";
		txt += "		</div>";
		txt += "		<div class='d-flex'>";
		txt += "			<div class='text-truncate custom-descTrunc' title='"+leStock[pos].Story+"'>"+leStock[pos].Story+"</div>";
		txt += "			<div class='ml-auto'>"+leStock[pos].ExpectedTime+"mn</div>";
		txt += "			<div class='ml-auto'>"+leStock[pos].Price.Quantity+leStock[pos].Price.Currency+"</div>";
		txt += "		</div>";
		txt += "	</div>";
		txt += "<input type='button' name='Minus-Button' value='"+element.Nb+"' class='col-2 btn btn-secondary rounded shadow custom-compteur' onclick='minusToListe(\""+element._id+"\");'>";
		txt += "</div>	";
	});
	$('#listListe').html(txt);
	return("REPLACELISTE Success");
}

//------- Save Loads -------//
function saveListe(){
	if($("#listTitle").val() == ""){return(alert("Merci de remplir le titre."))}
	// Sauvegarder en base la bdd
	replaceListe();
}

function loadListe(){
	if($("#listTitle").val() == ""){return(alert("Merci de remplir le titre."))}
	// Charger la variable laListe
	replaceListe();
}


//------- Fonctionné Onloadé depuis le body -------//
function _init(){
	// Remplir la variable LeStock depuis la Bdd
	selectFactionDeployOption();
	replaceStock("All");
	replaceListe();
	$('#listSelectFactionStock').val("All").change();
	return("_INIT Success");
}