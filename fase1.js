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
var cutscene = false;
class Fase1 extends Phaser.Scene {
	constructor(){
		super("Fase1");
	};	
	create(){//cria os elementos e variáveis base
		usada = 0;//reseta o uso das cartas
		this.sound.stopAll();
		operacao = "+";//define a operação da fase
		pause = false;

		///listas que guardam os elementos para ficar mais fácil de manipular vários
		this.elementosEscondidosDica = [];
		this.elementosEscondidosPausa = [];
		this.jogadaErrada = [];
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
		this.bg = this.add.image(0,0,"bgfase1");
		this.bg.setOrigin(0,0);

		this.campo = this.add.image(412, 302, "campo1");
		
		this.duvida = this.add.image(695, 466, "duvida").setInteractive();//botão de dúvida
		this.duvida.click = false;
		this.duvida.on("pointerdown", function(){
			if(!pause){
				this.click = true;
			}
		});

		this.configura = this.add.image(127, 466, "config").setInteractive();//botão de configuração
		this.configura.click = false;
		this.configura.on("pointerdown", function(){
			if(!pause){
				this.click = true;
			}
		});


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
		this.calcular = this.add.text(411, 466, "CALCULAR",{font: '45px balloon', fill: "white"});
		this.calcular.setOrigin(0.5);	

		this.barradevida = this.add.image(1073,83,"barradevida4").setInteractive();//barra de vida
		
		estrela = this.add.image(1082, 181, "estrela");//estrela de qunado o inimigo leva dano
		estrela.visible = false;
		estrela.angle = -15

		this.textoAlvo = this.add.text(598 , 290, "0", {font: '125px balloon', fill: "white"});//texto que exibe o falor alvo
		this.textoAlvo.setOrigin(0.5);
		this.criaCartas();

		this.zero = this.add.image(1073,350,"zero");// inimigo


		//elementos das cutscenes dentro da fase
		this.transparencia = this.add.image(0,0, "transp");
		this.transparencia.setOrigin(0);
		this.transparencia.visible = false;
		this.elementosEscondidosDica.push(this.transparencia);
		this.elementosEscondidosPausa.push(this.transparencia);

		this.zeroAfrente = this.add.image(1073,350,"zero");
		this.zeroAfrente.visible = false;

		this.n4 = this.add.image(1184, 489,"numero4");
		this.n4.setScale(0.8);
		this.n4.visible = false;

		this.personagem = this.add.image(153, 450, "Pduvida"+personagemSpt);
		this.personagem.setScale(0.3);
		this.personagem.visible = false;

		this.Bfala = this.add.image(0,549, "Bfala").setInteractive();
		this.Bfala.setOrigin(0);
		this.Bfala.visible = false;
		this.Bfala.on('pointerdown', function (pointer) {
	        DicaAtual++;
	        mudaDica = true;
	     });
		this.elementosEscondidosDica.push(this.Bfala);

		this.textoDica = this.add.text(56, 585, "O que é para fazer?",{font: '65px balloon', fill: "black",});
		this.textoDica.setLineSpacing(20);
		this.textoDica.visible = false;
		this.textoDica.var = 1;
		this.elementosEscondidosDica.push(this.textoDica);

		//elementos da tela de pause
		this.campoConf = this.add.image(413, 302, "campo0");
		this.campoConf.visible = false;
		this.elementosEscondidosPausa.push(this.campoConf);
		this.jogadaErrada.push(this.campoConf);

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

		this.Continue = this.add.text(412, 283, "continuar",{font: '45px balloon', fill: "white"});
		this.Continue.setOrigin(0.5);
		this.Continue.visible = false;
		this.elementosEscondidosPausa.push(this.Continue);

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

		this.menuT = this.add.text(412, 197.75, "menu",{font: '45px balloon', fill: "white"});
		this.menuT.setOrigin(0.5);
		this.menuT.visible = false;
		this.elementosEscondidosPausa.push(this.menuT);

		//elementos de jogada errada
		this.Jerrada = this.add.text(412, 295, "Jogada errada, tente novamente", {font: '40px balloon', fill: "black"})
		this.Jerrada.setOrigin(0.5);
		this.Jerrada.visible = false;
		this.jogadaErrada.push(this.Jerrada);

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
				if(posPossivel[0]===1 && posPossivel[1]===1){
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
				DicaAtual = 6;
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

			if(this.continuarE.click){
				this.click();
				this.continuarE.click = false;
				for(var i = 0; i< this.jogadaErrada.length; i++){
					this.jogadaErrada[i].visible = false;
				}
				pause = false;
			}

			if(mudaDica){//atualzia o texto da caixa de diálogo em função da variável
				this.atualizaDica();
				mudaDica = false;
			}

			if(FimDeFase){//caso você passe de fase, salva os dados e libera o próximo nível
				FimDeFase = false;
				if(fase<2){
					fase = 2;
				}
				faseAtual = 2;
				this.scene.start("SelecFase");
			}

		}

	};

	criaCartas(){//responsável por criar as cartas e programar as interações dela
		posPossivel = [0,0];
		this.verificaPos = posPossivel;
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
	            if(this.y != 285 && !pause){
	            	this.y -= 50;
	            	if(efeitos){
	            		carta.movimento.play();
	            	}
	            }
	        });
	        carta.on('pointerout', function (pointer) {
	            if(this.y != 285 && !pause){
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
		            		this.x = 181;
		            		this.y = 285;
		            		posPossivel[0] = 1;
		            	}else{
		            		this.x = 368;
		            		this.y = 285;
		            		posPossivel[1] = 1;
		            	}
		            	usada++;
		    			this.uso = true;
		            	this.verificaPos = posPossivel;
		            }
		            else if(this.y == 285){
		            	if(efeitos){
		        			this.som.play();
		        		}
		            	if(this.x === 181){
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
		            	this.verificaPos = posPossivel;
		            }
		        }
	        });

	        this.cartas[i] = carta;
		}
		this.calculaAlvo();
	};

	calculaAlvo(){//cria o´número alvo em função das cartas an sua mão e na operação da rodada
		var valor1 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
		var valor2 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
		while(valor1===valor2){
			var valor2 = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
		}
		this.alvo=valor1 + valor2;
		this.textoAlvo.text = this.alvo;
	};

	calcula(){//verifica a operação com os dois númeors escolhidos pelo usuário e dá a resposta se está errado ou certo
		var soma = 0;
		for(var i = 0; i<6; i++){
			if(this.cartas[i].uso){
				soma += this.cartas[i].valor;
			}
		}
		if(soma === this.alvo){
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
		this.zero.morte = false;
		pause = true;
		var tween = this.tweens.add({
        	targets: this.zero,
        	x:1370,
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
					this.textoDica.text = "Clique nas cartas para realizar a jogada.";
				}else if(posPossivel[1]===1){
					this.textoDica.text = "Clique no botão calcular para var se a \nresposta está certa.";
				}else{
					var cartaAtual =0;
					var possivelComb=100;
					for(var i=0; i<6; i++){
						if(this.cartas[i].uso){
							cartaAtual = this.cartas[i].valor;
						}
					}
					while(possivelComb>9 || (possivelComb + cartaAtual) === this.alvo || possivelComb===cartaAtual){
						possivelComb = this.jogadas[this.escolha][Math.floor(Math.random() * this.jogadas.length)];
					}
					var val = cartaAtual + possivelComb;
					if(val > this.alvo){
						this.textoDica.text = cartaAtual + operacao + possivelComb +" é igual a " + val + ", use uma combinação \nmais fraca";
					}else{
						this.textoDica.text = cartaAtual + operacao + possivelComb +" é igual a " + val + ", use uma combinação \nmais forte";
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
		    	this.zeroAfrente.visible = true;
		    	this.textoDica.text = "então ele invocaram um herói para me \ndeter. Pois bem, faça o  seu melhor"
		    	break;
		    case 4:
		    	this.zeroAfrente.visible = false;
		    	this.n4.visible = true;
		    	this.textoDica.text = "Vamos usar a adição para derrotá-lo!"
		    	break;
		    case 5:
		    	this.n4.visible =false;
				this.textoDica.text = "O que é para fazer?";
				for(var i = 0; i<this.elementosEscondidosDica.length; i++){
					this.elementosEscondidosDica[i].visible = false;
				}
				DicaAtual=0;
				pause = false;
				break;

			//elementos e fala da cena final
			case 6:
				this.zeroAfrente.visible = true;
		    	this.textoDica.text = "posso ter sido derrotado, mas você não \nvai conseguir me capturar"
		    	break;
		    case 7:
		    	this.zeroAfrente.visible = false;
		    	this.n4.visible = true;
		    	this.textoDica.text = "Ele deixou a subtração cair, vamos \npega-la de volta."
		    	break;
		    case 8:
		    	this.n4.visible =false;
				this.textoDica.text = "O que é para fazer?";
				for(var i = 0; i<this.elementosEscondidosDica.length; i++){
					this.elementosEscondidosDica[i].visible = false;
				}
				DicaAtual=0;
				pause = false;
				this.FinaldeFase();

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