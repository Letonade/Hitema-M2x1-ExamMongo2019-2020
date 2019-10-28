
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
			"ExpectedTime" : "35mn",
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
			"ExpectedTime" : "35mn",
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
			"ExpectedTime" : "40mn",
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
	    	"ExpectedTime" : "45mn",
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
	    	"ExpectedTime" : "70mn",
	    	"Story" : "Shock Exo-Armor from the great Tau empire.",
	    	"Faction" : "Tau"
	}
];
var laListe = {
				    "title" : "",
				    "Composition" : []
				};

// Custom

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
	return(true);
}

function selectFactionOnChange(obj){
	replaceStock(obj.options[obj.selectedIndex].value);
}

function addToListe(id){
	var pos = laListe.Composition.map(function(e){return e._id}).indexOf(id);
	if (pos != -1){
		laListe.Composition[pos].Nb += 1;
	}else{
		laListe.Composition.push({"_id" : id,"Nb" : 1, });
	}
	replaceListe();
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
}

function replaceStock(faction){
	var txt = "";
	leStock.forEach( function(element, index) {
		if (element.Faction == faction || faction == "All") {
			txt += "<div class='row px-4 my-2'>";
			txt += "	<input type='hidden' name='id' value='"+element._id+"'>";
			txt += "	<div class='col-10 border bg-white rounded p-2 text-muted shadow'>";
			txt += "		<div class='d-flex border-bottom'>";
			txt += "			<div>"+element.Name+"</div>";
			txt += "			<div class='ml-auto'>"+element.pointValue+"</div>";
			txt += "		</div>";
			txt += "		<div class='d-flex'>";
			txt += "			<div class='text-truncate custom-descTrunc' title='"+element.Story+"'>"+element.Story+"</div>";
			txt += "			<div class='ml-auto'>"+element.ExpectedTime+"</div>";
			txt += "			<div class='ml-auto'>"+element.Price.Quantity+element.Price.Currency+"</div>";
			txt += "		</div>";
			txt += "	</div>";
			txt += "	<input type='button' name='Add-Button' value='+' class='col-2 btn btn-secondary rounded shadow custom-compteur' onclick='addToListe(\""+element._id+"\");'>";
			txt += "</div>";
		}
	});
	$('#listStock').html(txt);
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
		txt += "			<div class='ml-auto'>"+leStock[pos].pointValue+"</div>";
		txt += "		</div>";
		txt += "		<div class='d-flex'>";
		txt += "			<div class='text-truncate custom-descTrunc' title='"+leStock[pos].Story+"'>"+leStock[pos].Story+"</div>";
		txt += "			<div class='ml-auto'>"+leStock[pos].ExpectedTime+"</div>";
		txt += "			<div class='ml-auto'>"+leStock[pos].Price.Quantity+leStock[pos].Price.Currency+"</div>";
		txt += "		</div>";
		txt += "	</div>";
		txt += "<input type='button' name='Minus-Button' value='"+element.Nb+"' class='col-2 btn btn-secondary rounded shadow custom-compteur' onclick='minusToListe(\""+element._id+"\");'>";
		txt += "</div>	";
	});
	$('#listListe').html(txt);
}


function _init(){
	selectFactionDeployOption();
	replaceStock("All");
	replaceListe();
	$('#listSelectFactionStock').val("All").change();
}