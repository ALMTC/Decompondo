//áriáveis globais da fase

var FimDeFase = false;
var usada = 0;
var posPossivel = [0,0];
var pause = false;
var DicaAtual = 0;
var operacao = "+";
var mudaDica = false;
var estrela;
var resetar = false;
var Passatela = false;
class Fase3 extends Phaser.Scene {
	constructor(){
		super("Fase3");
	};	
	create(){//cria os elementos e variáveis base
		usada = 0;//reseta o uso das cartas
		this.sound.stopAll();	
		pause = false;

		///listas que guardam os elementos para ficar mais fácil de manipular vários
		this.elementosEscondidosDica = [];
		this.elementosEscondidosPausa = [];
		this.jogadaErrada = [];
		this.guardaTudo = [];
		this.vida = 4;
		this.alvo=0;
		this.cartaEscolhida = [0,0];
		this.jogadas = [//matriz base que possibilita realiar todas as operações e com todos os valores possíveis 
			[1,4,6,8,5,2],
			[3,7,9,8,5,4],
			[2,5,7,9,6,4],
			[5,6,4,8,1,2],
			[4,6,5,3,2,7],
			[1,2,3,4,5,6]
		];

		this.cartas = [0,0,0,0,0,0];

		//áudio do projeto
		this.MusicaBG = this.sound.add("MusLuta1",{volume: 0.2, loop: true});
		this.EfeitoClique = this.sound.add("BotaoClick", {volume: 1, loop: false});
		this.acertou = this.sound.add("JogadaAcertar", {volume: 0.4, loop: false});
		this.errou = this.sound.add("JogadaErrar", {volume: 1, loop: false});
		this.dano = this.sound.add("LevarDano", {volume: 0.4, loop: false});

		//elementos basicos e suas variáveis iniciais
		this.bg = this.add.image(683,384,"bgfase3");

		this.campo = this.add.image(412, 302, "campo3");
		this.guardaTudo.push(this.campo);
		
		this.duvida = this.add.image(695, 466, "duvida").setInteractive();//botão de dúvida
		this.duvida.click = false;
		this.duvida.on("pointerdown", function(){
			if(!pause){
				this.click = true;
			}
		});
		this.guardaTudo.push(this.duvida);

		this.configura = this.add.image(127, 466, "config").setInteractive();//botão de configuração
		this.configura.click = false;
		this.configura.on("pointerdown", function(){
			if(!pause){
				this.click = true;
			}
		});
		this.guardaTudo.push(this.configura);


		this.btSprite = this.add.image(411,466, "btFundo1").setInteractive();//botão central de calcular
		this.btSprite.click = false;
		this.btSprite.on("pointerover", function(){
			if(!pause){
				this.setTexture("btFundo2");
			}
		});
		this.btSprite.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.btSprite.on("pointerdown", function(){
			if(!pause){
				this.click = true;
			}
		});
		this.guardaTudo.push(this.btSprite);

		this.calcular = this.add.text(411, 466, "CALCULAR",{font: '45px balloon', fill: "white"});
		this.calcular.setOrigin(0.5);
		this.guardaTudo.push(this.calcular);

		this.barradevida = this.add.image(1073,83,"barradevida4").setInteractive();//barra de vida
		this.guardaTudo.push(this.barradevida);
		
		this.zero = this.add.image(1073,350,"zero");
		this.guardaTudo.push(this.zero);
		
		estrela = this.add.image(1082, 181, "estrela");//estrela de qunado o inimigo leva dano
		estrela.visible = false;

		this.textoAlvo = this.add.text(213 , 290, "0", {font: '125px balloon', fill: "white"});//texto que exibe o falor alvo
		this.textoAlvo.setOrigin(0.5);
		this.guardaTudo.push(this.textoAlvo);

		this.criaCartas();

		//elementos das cutscenes dentro da fase
		this.transparencia = this.add.image(0,0, "transp");
		this.transparencia.setOrigin(0);
		this.transparencia.visible = false;
		this.elementosEscondidosDica.push(this.transparencia);
		this.elementosEscondidosPausa.push(this.transparencia);
		this.guardaTudo.push(this.transparencia);

		this.zeroAfrente = this.add.image(1073,350,"zero");
		this.zeroAfrente.visible = false;
		this.guardaTudo.push(this.zeroAfrente);

		this.n1 = this.add.image(1184, 489,"numero1");
		this.n1.visible = false;
		this.guardaTudo.push(this.n1);

		this.n4 = this.add.image(1184, 489,"numero4");
		this.n4.setScale(0.8);
		this.n4.visible = false;
		this.guardaTudo.push(this.n4);

		this.personagem = this.add.image(153, 450, "Pduvida"+personagemSpt);
		this.personagem.setScale(0.3);
		this.personagem.visible = false;
		this.guardaTudo.push(this.personagem);

		this.Bfala = this.add.image(0,549, "Bfala").setInteractive();
		this.Bfala.setOrigin(0);
		this.Bfala.visible = false;
		this.Bfala.on('pointerdown', function (pointer) {
	        DicaAtual++;
	        mudaDica = true;
	     });
		this.elementosEscondidosDica.push(this.Bfala);
		this.guardaTudo.push(this.Bfala);

		this.textoDica = this.add.text(56, 585, "O que é para fazer?",{font: '65px balloon', fill: "black",});
		this.textoDica.setLineSpacing(20);
		this.textoDica.visible = false;
		this.textoDica.var = 1;
		this.elementosEscondidosDica.push(this.textoDica);
		this.guardaTudo.push(this.textoDica);

		//elementos da tela de pause
		this.campoConf = this.add.image(413, 302, "campo0");
		this.campoConf.visible = false;
		this.elementosEscondidosPausa.push(this.campoConf);
		this.jogadaErrada.push(this.campoConf);
		this.guardaTudo.push(this.campoConf);

		this.btefeitos = this.add.image(472, 368, "efeitoson").setInteractive();
		this.btefeitos.click = false;
		this.btefeitos.on("pointerdown", function(){
			if(pause){
				if(efeitos){
					this.setTexture("efeitosoff");
					efeitos = false;
				}else{
					this.setTexture("efeitoson");
					efeitos = true;
				}
			}
		});
		this.btefeitos.visible = false;
		this.elementosEscondidosPausa.push(this.btefeitos);
		this.guardaTudo.push(this.btefeitos);

		this.btmusica = this.add.image(352, 368, "musicaon").setInteractive();
		this.btmusica.click = false;
		this.btmusica.on("pointerdown", function(){
			if(pause){
				if(musica){
					this.setTexture("musicaoff");
					musica = false;
				}else{
					this.setTexture("musicaon");
					musica = true;
				}
			}
		});
		this.btmusica.visible = false;
		this.elementosEscondidosPausa.push(this.btmusica);
		this.guardaTudo.push(this.btmusica);

		this.continuar = this.add.image(412, 283, "btFundo1").setInteractive();
		this.continuar.click = false;
		this.continuar.setScale(1.2);
		this.continuar.visible = false;
		this.continuar.on("pointerover", function(){
			this.setTexture("btFundo2");
		});
		this.continuar.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.continuar.on("pointerdown", function(){
			this.click = true;
		});
		this.elementosEscondidosPausa.push(this.continuar);
		this.guardaTudo.push(this.continuar);

		this.Continue = this.add.text(412, 283, "continuar",{font: '45px balloon', fill: "white"});
		this.Continue.setOrigin(0.5);
		this.Continue.visible = false;
		this.elementosEscondidosPausa.push(this.Continue);
		this.guardaTudo.push(this.Continue);

		this.menu = this.add.image(410,197.75, "btFundo1").setInteractive();
		this.menu.click = false;
		this.menu.setScale(1.2);
		this.menu.visible = false;
		this.menu.on("pointerover", function(){
			this.setTexture("btFundo2");
		});
		this.menu.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.menu.on("pointerdown", function(){
			this.click = true;
		});
		this.elementosEscondidosPausa.push(this.menu);
		this.guardaTudo.push(this.menu);

		this.menuT = this.add.text(412, 197.75, "menu",{font: '45px balloon', fill: "white"});
		this.menuT.setOrigin(0.5);
		this.menuT.visible = false;
		this.elementosEscondidosPausa.push(this.menuT);
		this.guardaTudo.push(this.menuT);

		//elementos de jogada errada
		this.Jerrada = this.add.text(412, 295, "Jogada errada, tente novamente", {font: '40px balloon', fill: "black"})
		this.Jerrada.setOrigin(0.5);
		this.Jerrada.visible = false;
		this.jogadaErrada.push(this.Jerrada);
		this.guardaTudo.push(this.Jerrada);

		this.continuarE = this.add.image(411,466, "btFundo1").setInteractive();
		this.continuarE.click = false;
		this.continuarE.setScale(1.2,1);
		this.continuarE.visible = false;
		this.continuarE.on("pointerover", function(){
			this.setTexture("btFundo2");
		});
		this.continuarE.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.continuarE.on("pointerdown", function(){
			this.click = true;
		});
		this.jogadaErrada.push(this.continuarE);

		this.ContinueE = this.add.text(411, 466, "continuar",{font: '45px balloon', fill: "white"});
		this.ContinueE.setOrigin(0.5);
		this.ContinueE.visible = false;
		this.jogadaErrada.push(this.ContinueE);
		this.guardaTudo.push(this.continuarE);

		this.atualizaIcones();

		DicaAtual = 3;
		this.duvida.click=true;
	};

	update(){//verifica todas os cliques de botões e alterações em variáveis

		
		if(musica && !this.MusicaBG.isPlaying){//responsável pela música
			this.MusicaBG.play();
		}
		if(!musica){
			this.MusicaBG.stop();
		}


		if(!pause){//ações que execultam quando o jogo não está pausado(cliques de botões)
			if(this.duvida.click){
				this.click();
				this.duvida.click=false;
				for(var i = 0; i<this.elementosEscondidosDica.length; i++){
					this.elementosEscondidosDica[i].visible = true;
				}
				pause= true;
				mudaDica = true;
			}

			if(this.configura.click){
				this.click();
				this.configura.click=false;
				for(var i = 0; i<this.elementosEscondidosPausa.length; i++){
					this.elementosEscondidosPausa[i].visible = true;
				}
				pause= true;

			}

			if(this.btSprite.click){
				this.click();
				if(posPossivel[0]!=0 && posPossivel[1]!=0){
					this.calcula();
				}
				this.btSprite.click = false;
			}

			if (resetar){//recria as cartas e o numeor alvo após animação de dano
				this.resetaJogada();
				this.zero.setTexture("zero");
				resetar = false;
			}

			if(this.vida <= 0 && !estrela.visible){//verifica qunado a vida do inimigo chega a zero e inicia a sequencia de animação e cutscene
				DicaAtual = 7;
				this.duvida.click = true;
			}
		}if(pause){//ações que acontecem enqunato está pausado
			
			if(this.continuar.click){
				this.click();
				this.continuar.click=false;
				for(var i = 0; i<this.elementosEscondidosPausa.length; i++){
					this.elementosEscondidosPausa[i].visible = false;
				}
				pause= false;
			}

			if(this.menu.click){
				this.click();
				this.menu.click=false;
				for(var i = 0; i<this.elementosEscondidosPausa.length; i++){
					this.elementosEscondidosPausa[i].visible = false;
				}
				pause= false;
				this.scene.start("Menu");
			}

			if(mudaDica){//atualzia o texto da caixa de diálogo em função da variável
				this.atualizaDica();
				mudaDica = false;
			}

			if(FimDeFase){//caso você passe de fase, salva os dados e libera o próximo nível
				FimDeFase = false;
				if(DicaAtual === 9){
					DicaAtual = 10;
					this.atualizaDica();
					for(var i = 0; i<this.elementosEscondidosDica.length; i++){
						this.elementosEscondidosDica[i].visible = true;
					}
				}else{
					
				}
			}

			if(this.continuarE.click){
				this.click();
				this.continuarE.click = false;
				for(var i = 0; i< this.jogadaErrada.length; i++){
					this.jogadaErrada[i].visible = false;
				}
				pause = false;
			}

			if(Passatela){//resonsável por voltar ao menu
				Passatela = false;	
				this.scene.start("Menu");
			}
		}

	};

	criaCartas(){//responsável por criar as cartas e programar as interações dela
		posPossivel = [0,0];
		this.escolha = Math.floor(Math.random() * this.jogadas.length);
		for(var i = 0; i<6; i++){
			var carta = this.add.image(380+(130*i),644,"c"+this.jogadas[this.escolha][i]).setInteractive();
			carta.valor = this.jogadas[this.escolha][i];
			carta.uso = false;
			carta.origemX = carta.x;
			carta.origemY = carta.y;
			carta.som = this.sound.add("CartaClick", {volume: 1, loop: false});
			carta.movimento = this.sound.add("CartaMove", {volume: 0.6, loop: false});

			carta.on('pointerover', function (pointer) {
	            if(this.y != 290 && !pause){
	            	this.y -= 50;
	            	if(efeitos){
	            		carta.movimento.play();
	            	}
	            }
	        });
	        carta.on('pointerout', function (pointer) {
	            if(this.y != 290 && !pause){
	            	this.y = 644;
	            }
	        });
	        carta.on('pointerdown', function (pointer) {
		        if(!pause){
		            if(this.y===594 && usada < 2){
		            	if(efeitos){
		        			this.som.play();
		        		}
		            	if(posPossivel[0]===0){
		            		this.x = 444;
		            		this.y = 290;
		            		posPossivel[0] = this.valor;
		            	}else{
		            		this.x = 630;
		            		this.y = 290;
		            		posPossivel[1] = this.valor;
		            	}
		            	usada++;
		    			this.uso = true;
		            }
		            else if(this.y == 290){
		            	if(efeitos){
		        			this.som.play();
		        		}
		            	if(this.x === 444){
		            		posPossivel[0] = 0;
		            		this.x = this.origemX;
		            		this.y = this.origemY-50;
		            	}else{
		            		posPossivel[1] = 0;
		            		this.x = this.origemX;
		            		this.y = this.origemY-50;
		            	}
		            	usada--;
		            	this.uso = false;
		            }
		        }
	        });

	        this.cartas[i] = carta;
		}
		this.calculaAlvo();
	};

	calculaAlvo(){//cria o´número alvo em função das cartas an sua mão e na operação da rodada
		var rand = Math.floor(Math.random() * 2);
		if(rand ===0){
			operacao = "+";
			this.campo.setTexture('campo3');
		}else{
			operacao = "-";
			this.campo.setTexture('campo4');
		}

		var valor1 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
		var valor2 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
		while(valor1===valor2){
			var valor2 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
		}
		if(operacao === "-"){
			if(valor1 >valor2){
				this.alvo=valor1 - valor2;
			}else{
				this.alvo=valor2 - valor1;
			}
		}else if(operacao === "+"){
			this.alvo=valor1 + valor2;
		}
		this.textoAlvo.text = this.alvo;
	};

	calcula(){//verifica a operação com os dois númeors escolhidos pelo usuário e dá a resposta se está errado ou certo
		var var1 = posPossivel[0];
		var var2 = posPossivel[1];
		var result;
		if(operacao == "-"){ 
			result = var1 - var2;
		}else{
			result = var1+var2;
		}
		if(result === this.alvo){
			if(efeitos){
				this.acertou.play();
			}
			this.vida -= 1;
			if(this.vida>=0){
				this.barradevida.setTexture("barradevida"+this.vida);
				this.levandoDano();
			}
		}else{
			if(efeitos){
				this.errou.play();
			}
			pause = true;
			for(var i = 0; i< this.jogadaErrada.length; i++){
				this.jogadaErrada[i].visible = true;
			}
		}
	}

	resetaJogada(){//reseta as cartas escolhendo uma função nova
		usada = 0;
		posPossivel = [0,0];
		this.escolha = Math.floor(Math.random() * this.jogadas.length);//aleatoriedade para pegar uma das linhas da matriz
		for(var i = 0; i<6; i++){
			var cart = this.cartas[i];
			cart.x = cart.origemX;
			cart.y = cart.origemY;
			cart.uso = false;
			cart.valor = this.jogadas[this.escolha][i];
			cart.setTexture("c"+this.jogadas[this.escolha][i]);
		}
		this.calculaAlvo();
	}

	FinaldeFase(){//animaç~~ao de final de partida (zero correndo)
		this.zero.setTexture("Zcorrendo");
		this.zero.setScale(0.8);
		pause = true;
		var tween = this.tweens.add({
        	targets: this.zero,
        	x:1390,
        	y:325,
 			scaleX: 0.1,
  			scaleY: 0.1,
  			ease: 'Linear',
  			duration: 2000,
  			yoyo: false,
			repeat: 0,
			onComplete: function () { FimDeFase = true;}
		});	
	}

	levandoDano(){//animação do inimigo levando dano
		if(efeitos){
			this.dano.play();
		}
		pause = true;
		estrela.visible=true;
		this.zero.setTexture("zeroDano");
		var tween = this.tweens.createTimeline();
		tween.add({
			targets: estrela,
			x: estrela.x,
			ease: "Linear",
			angle: 15,
			duration: 400
		});
		tween.add({
			targets: estrela,
			x: estrela.x,
			ease: "Linear",
			angle: -15,
			duration: 400
		});
		tween.add({
			targets: estrela,
			x: estrela.x,
			ease: "Linear",
			angle: 15,
			duration: 400
		});
		tween.add({
			targets: estrela,
			x: estrela.x,
			ease: "Linear",
			angle: -15,
			duration: 400
		});
		tween.add({
			targets: estrela,
			x: estrela.x,
			ease: "Linear",
			angle: 15,
			duration: 400,
			onComplete: function () { pause = false; estrela.visible=false; resetar = true, estrela.angle = -15}
		});
		tween.play();
	}

	atualizaDica(){//dá dicas dependendo da interação com o botão dicas(como jogar/ exemplo de operação e resultado/ como realizar a jogada)
		switch (DicaAtual) {
			case 0:
				this.personagem.visible =true;
		    	break;
			case 1:
				this.personagem.visible =false;
				this.n4.visible =true;
				if(posPossivel[0]===0){
					this.textoDica.text = "Clique nas cartas para realizar a jogada.\nFunciona do mesmo jeito das outras fases.";
				}else if(posPossivel[1]!=0){
					this.textoDica.text = "Clique no botão calcular para var se a \nresposta está certa.";
				}else{
					var val1 = posPossivel[0];
					var val2=100;
					if(operacao === "+"){
						while(val2>9 || (val1 + val2) === this.alvo || val2===val1){
							val2 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
						}
						var soma = val1 + val2;
						if(soma > this.alvo){
							this.textoDica.text = val1 + operacao + val2 + " é igual a " + soma + ", use uma combinação \nmaus fraca."
						}else{
							this.textoDica.text = val1 + operacao + val2 + " é igual a " + soma + ", use uma combinação \nmaus forte."
						}
					}else{
						while(val2>9 || (val1 - val2) === this.alvo || val2===val1){
							val2 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
						}
						var sub = val1 - val2;
						if(sub > this.alvo){
							this.textoDica.text = val1 + operacao + val2 + " é igual a " + sub + ", use uma combinação \nmaus forte."
						}else{
							this.textoDica.text = val1 + operacao + val2 + " é igual a " + sub + ", use uma combinação \nmaus fraca."
						}
					}
				}
		  		break;
			case 2:
				this.n4.visible =false;
				this.textoDica.text = "O que é para fazer?";
				for(var i = 0; i<this.elementosEscondidosDica.length; i++){
					this.elementosEscondidosDica[i].visible = false;
				}
				DicaAtual=0;
				pause = false;
		    	break;

		    //elementos e fala da cena inicial
		    case 3:
		    	case 3:
		    	this.zeroAfrente.visible = true;
		    	this.textoDica.text = "Haha, você não vai conseguir me deter \ncom sua base destruída."
		    	break;
		    case 4:
		    	this.zeroAfrente.visible = false;
		    	this.n4.visible = true;
		    	this.textoDica.text = "Essa não, temos que derrotar o zero \nagora ou nós perderemos."
		    	break;
		    case 5:
				this.textoDica.text = "Ele está mais forte, então tome cuidado.";
				break;
		    case 6:
		    	this.n4.visible =false;
				this.textoDica.text = "O que é para fazer?";
				for(var i = 0; i<this.elementosEscondidosDica.length; i++){
					this.elementosEscondidosDica[i].visible = false;
				}
				DicaAtual=0;
				pause = false;
				break;

			//elementos e fala da cena final
			case 7:
				this.zeroAfrente.visible = true;
		    	this.textoDica.text = "Como é possível, eu perdi mesmo com o \npoder das operações!"
		    	break;
		    case 8:
		    	this.textoDica.text = "Não tenho mais força, a única coisa \nque posso fazer é correr."
		    	break;
		    case 9:
		    	this.zeroAfrente.visible = false;
				for(var i = 0; i<this.elementosEscondidosDica.length; i++){
					this.elementosEscondidosDica[i].visible = false;
				}
				this.FinaldeFase();
		    	break;
		    case 10:
		    	this.n4.visible = true;
		    	this.textoDica.text = "Você conseguiu, você derrotou o zero \ne recuperou as operações.";
		    	break;
		    case 11:
		    	this.n1.visible = true;
		    	this.n4.visible = false;
		    	this.textoDica.text = "Graças a você, a cidade vai poder voltar \nao normal, muito obrigado.";
		    	break;
		    case 12:
		    	this.n1.visible = false;
		    	this.personagem.visible = true;
		    	this.personagem.setTexture("Pfeliz"+personagemSpt);
		    	this.textoDica.text = "Se o zero tentar causar confusão de novo, \npodem me chamar.";
		    	break;

		    //sequencia de encerramento da fase e volta para o menu
		    case 13:
			    this.sound.stopAll();
		    	for(var i = 0; i < this.guardaTudo.length; i++){
					this.guardaTudo[i].visible = false;
				}
				for(i = 0; i< this.cartas.length; i++){
					this.cartas[i].visible = false;
				}
				this.tweens.add({
		        	targets: this.bg,
		        	x:718,
		        	y:1064,
		 			scaleX: 2.87,
		  			scaleY: 2.87,
		  			ease: 'Linear',
		  			duration: 2000,
		  			yoyo: false,
					repeat: 0,
					onComplete: function () { Passatela = true;}
				});
				break;


		}
	}

	atualizaIcones(){//atualiza os ícones de som e efeitos
		if(musica){
			this.btmusica.setTexture("musicaon");
		}
		if(!musica){
			this.btmusica.setTexture("musicaoff");
		}

		if(efeitos){
			this.btefeitos.setTexture("efeitoson");
		}
		if(!efeitos){
			this.btefeitos.setTexture("efeitosoff");
		}
	}

	click(){//efeito de clique
		if(efeitos){
			this.EfeitoClique.play();
		}
	}
};