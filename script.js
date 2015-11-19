var losuj = function(odd, doo){
	return Math.floor(Math.random()*(doo-odd+1))+odd;
};

var Game = function(){
	this.punkty = 0;
	this.zycia = 3;
	this.pytanie;
	this.ilosc_odpowiedzi = 4;
	this.odpowiedzi = [];
	this.good_odp; // index dobrej odpowiedzi

	this.koniec_gry = false;

	this.generuj_pytanie = function(){
		var znak = losuj(0,3);
		var a = 20*losuj(-5,5)+losuj(0,9);
		var b, wynik, znak;
		do{
			b = 20*losuj(-5,5)+losuj(0,9);
		} while (znak == 3 && b == 0); // Dzielenie przez 0 
		
		if(znak == 0){
			wynik = a+b;
			znak = "+";
		}
		else if (znak	== 1){
			wynik = a-b;
			znak = "-";
		}
		else if (znak == 2){
			wynik = a*b;
			znak = "*";
		}
		else{
			wynik = a/b;
			znak = "/";
		}
		this.pytanie = a+" "+znak+" ";
		if(b < 0)
			this.pytanie += "(";
		this.pytanie += b;
		if(b < 0)
			this.pytanie += ")";
		this.pytanie += " = ?";

		this.odpowiedzi = []; // Czyszczenie Tablicy
		this.good_odp = losuj(0,this.ilosc_odpowiedzi-1); // Wybieranie dobrej
		for(var i=0; i<this.ilosc_odpowiedzi; i++){
			if(this.good_odp == i)
				this.odpowiedzi[i] = wynik;
			else{
				var bad;
				do{
					bad = false;
					this.odpowiedzi[i] = 20*losuj(-5,5)+losuj(0,9)
					if (znak == '*')
						this.odpowiedzi[i] *= 4*losuj(-40,40);
					else if (znak == '/')
						this.odpowiedzi[i] /= losuj(3,8);
					this.odpowiedzi[i] = this.odpowiedzi[i];
					for(var y=0; y<i; y++)
						if(this.odpowiedzi[i] == this.odpowiedzi[y] || this.odpowiedzi[i] == wynik){
							bad = true;
							break;
						}
				}while(bad);
			}
			if(znak == '/')
				this.odpowiedzi[i] = this.odpowiedzi[i].toFixed(2);
		}
	};
	this.sprawdz = function(index){
		if(!this.koniec_gry){
			if(index == this.good_odp){
				this.punkty++;
				alert("Dobra odpowiedź !");
			}
			else{
				this.zycia--;
				alert("Tracisz życie !");
			}

			if(this.zycia == 0){
				this.koniec_gry = true;
			}
		}
	};
};


$(document).ready(function(){

	var gra;

	var pokaz_pytanie = function(){
		$("#zadanie").text(gra.pytanie);
	};
	var pokaz_odpowiedzi = function(){
		for(var i=0; i<gra.ilosc_odpowiedzi; i++)
			$("#p"+i).text(gra.odpowiedzi[i]);
	};
	var pokaz_punkty = function(){
		$("#punkty").val(gra.punkty);
	};
	var pokaz_zycia = function(){
		$("#zycie").val(gra.zycia);
	};
	var generuj_wszystko = function(){
		gra.generuj_pytanie();
		pokaz_pytanie();
		pokaz_odpowiedzi();
		pokaz_punkty();
		pokaz_zycia();
	};

	$("#start").click(function(){
		gra = new Game;
		generuj_wszystko();
	});
	$(".wyniki").click(function(){
		if(!gra.koniec_gry){
			gra.sprawdz($(this).attr("index"));
			generuj_wszystko();
		}
		if(gra.koniec_gry){
			$("#zadanie").html("Koniec Gry <br /> Punkty: "+gra.punkty);
			$(".wyniki").text("");
		}
	});

});
