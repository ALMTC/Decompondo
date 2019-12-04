//vatiáveis globais do menu

var Passatela = false;
var tutorial = false;

class Menu extends Phaser.Scene {
	constructor(){
		super("Menu");
	}
	create(){//carrega todos os recursos base da tela
		this.sound.stopAll();
		pause = false;

		//listas que guardam os elementos para ficar mais fácil de manipular vários
		this.esconder = [];
		this.tutorialE = [];

		//musicas e efeitos
		this.MusicaBG = this.sound.add("MusMenu",{volume: 0.5, loop: true});
		this.EfeitoClique = this.sound.add("BotaoClick", {volume: 1, loop: false});


		//elementos base do menu
		this.bg = this.add.image(683,384,"bgmenu");	

		this.logo = this.add.image(683, 110, "logo");
		this.esconder.push(this.logo);

		this.jogar = this.add.image(160, 505, "btFundo1").setInteractive();//botão jogar
		this.jogar.click = false;
		this.jogar.on("pointerover", function(){
			if(!tutorial){
				this.setTexture("btFundo2");
			}
		});
		this.jogar.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.jogar.on("pointerdown", function(){
			if(!tutorial){
				this.click = true;
			}
		});
		this.jogarT = this.add.text(160, 505, "Jogar",{font: '45px balloon', fill: "white"});
		this.jogarT.setOrigin(0.5);
		this.esconder.push(this.jogar);
		this.esconder.push(this.jogarT);


		this.tutorial = this.add.image(160, 595, "btFundo1").setInteractive();//botão tutorial
		this.tutorial.click = false;
		this.tutorial.on("pointerover", function(){
			if(!tutorial){
				this.setTexture("btFundo2");
			}
		});
		this.tutorial.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.tutorial.on("pointerdown", function(){
			if(!tutorial){
				this.click = true;
			}
		});
		this.tutorialT = this.add.text(160, 595, "Tutorial",{font: '45px balloon', fill: "white"});
		this.tutorialT.setOrigin(0.5);
		this.esconder.push(this.tutorial);
		this.esconder.push(this.tutorialT);


		this.creditos = this.add.image(160, 685, "btFundo1").setInteractive();//botão créditos
		this.creditos.click = false;
		this.creditos.on("pointerover", function(){
			if(!tutorial){
				this.setTexture("btFundo2");
			}
		});
		this.creditos.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.creditos.on("pointerdown", function(){
			if(!tutorial){
				this.click = true;
			}
		});
		this.creditoT = this.add.text(160, 685, "Créditos",{font: '45px balloon', fill: "white"});
		this.creditoT.setOrigin(0.5);
		this.esconder.push(this.creditos);
		this.esconder.push(this.creditoT);



		this.btefeitos = this.add.image(1298 , 704, "efeitoson").setInteractive();//botão de efeitos sonoros
		this.btefeitos.click = false;
		this.btefeitos.on("pointerdown", function(){
			if(!tutorial){
				if(efeitos){
					this.setTexture("efeitosoff");
					efeitos = false;
				}else{
					this.setTexture("efeitoson");
					efeitos = true;
				}
			}
		});
		this.esconder.push(this.btefeitos);

		this.btmusica = this.add.image(1224 , 704, "musicaon").setInteractive();//botão de música
		this.btmusica.click = false;
		this.btmusica.on("pointerdown", function(){
			if(!tutorial){
				if(musica){
					this.setTexture("musicaoff");
					musica = false;
				}else{
					this.setTexture("musicaon");
					musica = true;
				}
			}
		});
		this.esconder.push(this.btmusica);


		this.transparencia = this.add.image(683, 384, "transp");//elementos do tutorial
		this.tutorialE.push(this.transparencia);

		this.telaTuto = this.add.image(683, 384, "tutorial1");
		this.telaTuto.valor = 1;
		this.tutorialE.push(this.telaTuto);

		this.instrucoes = this.add.image(683,84,"instrucoes");
		this.tutorialE.push(this.instrucoes);

		this.btvoltar = this.add.image(683, 691, "btFundo1").setInteractive();//botão de voltar
		this.btvoltar.click = false;
		this.btvoltar.on("pointerover", function(){
			if(tutorial){
				this.setTexture("btFundo2");
			}
		});
		this.btvoltar.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.btvoltar.on("pointerdown", function(){
			if(tutorial){
				this.click = true;
			}
		});
		this.tutorialE.push(this.btvoltar);
		this.textvoltar = this.add.text(683, 691, "Voltar", {font: '45px balloon', fill: "white"});
		this.textvoltar.setOrigin(0.5);
		this.tutorialE.push(this.textvoltar);

		for(var i = 0; i< this.tutorialE.length; i++){
			this.tutorialE[i].visible = false;
		}

		this.setaEsquerda = this.add.image(503, 691, "seta1").setInteractive();//setas esquerda e direita
		this.setaEsquerda.visible = false;
		this.setaEsquerda.on("pointerover", function(){
			if(tutorial){
				this.setTexture("seta2");
			}
		});
		this.setaEsquerda.on("pointerout", function(){
			this.setTexture("seta1");
		});
		this.setaEsquerda.on("pointerdown", function(){
			if(tutorial){
				this.click = true;
			}
		});

		this.setaDireita = this.add.image(863, 691, "seta1").setInteractive();
		this.setaDireita.visible = false;
		this.setaDireita.flipX = true;
		this.setaDireita.on("pointerover", function(){
			if(tutorial){
				this.setTexture("seta2");
			}
		});
		this.setaDireita.on("pointerout", function(){
			this.setTexture("seta1");
		});
		this.setaDireita.on("pointerdown", function(){
			if(tutorial){
				this.click = true;
			}
		});	
		this.atualizaIcones();
	}


	update(){//verifica constantemente as variáveis e os cliques nos botões
		if(musica && !this.MusicaBG.isPlaying){//alterna música on e off
			this.MusicaBG.play();
		}
		if(!musica){
			this.MusicaBG.stop();
		}
		if(!tutorial){
			if(this.jogar.click){//verifica clique no botão Jogar e muda de tela
				this.clique();
				for(var i = 0; i< this.esconder.length; i++){
					this.esconder[i].visible = false;
				}
				this.jogar.click = false;
					this.tweens.add({
		        	targets: this.bg,
		        	x:683,
		        	y:1064,
		 			scaleX: 2.87,
		  			scaleY: 2.87,
		  			ease: 'Power1',
		  			duration: 800,
		  			yoyo: false,
					repeat: 0,
					onComplete: function () { Passatela = true;}
				});
			}
			if(this.creditos.click){//verifica clique no botão Créditos e muda de tela
				this.clique();
				this.creditos.click = false;
				this.scene.start("Credito");
			}
			if(this.tutorial.click){//exibe o tutorial
				this.clique();
				for(var i = 0; i< this.tutorialE.length; i++){
					this.tutorialE[i].visible = true;
				}
				this.logo.visible = false;
				this.setaDireita.visible = true;
				this.tutorial.click = false;
				tutorial = true;
			}

			if(Passatela){//passa para a róxima tela após se ativada
				Passatela = false;
				this.scene.start("SelecFase");
			}
		}if(tutorial){//navega entre as telas do tutorial e exibe os elemntos devidos
			if(this.setaDireita.click && this.telaTuto.valor<3){
				this.clique();
				this.telaTuto.valor++;
				this.setaDireita.click = false;
				this.atualizaTutorial();
			}
			if(this.setaEsquerda.click && this.telaTuto.valor>1){
				this.clique();
				this.telaTuto.valor--;
				this.setaEsquerda.click = false;
				this.atualizaTutorial();
			}
			if(this.btvoltar.click){
				this.clique();
				this.telaTuto.valor = 1;
				this.atualizaTutorial();
				this.logo.visible = true;
				this.setaEsquerda.visible = false;
				this.setaDireita.visible = false;
				for(var i = 0; i< this.tutorialE.length; i++){
					this.tutorialE[i].visible = false;
				}
				this.btvoltar.click = false;
				tutorial = false;
			}
		}
	}

	atualizaTutorial(){//exibe ou esconde as setas do tutorial e muda a tela
		switch(this.telaTuto.valor){
			case 1:
				this.setaEsquerda.visible = false;
				this.setaDireita.visible = true;
				this.telaTuto.setTexture("tutorial1");
				break;
			case 2:
				this.setaEsquerda.visible = true;
				this.setaDireita.visible = true;
				this.telaTuto.setTexture("tutorial2");
				break;
			case 3:
				this.setaEsquerda.visible = true;
				this.setaDireita.visible = false;
				this.telaTuto.setTexture("tutorial3");
				break;
		}
	}

	atualizaIcones(){//atualiza os ícones de áudio
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

	clique(){//toca o som de clique dos botões
		if(efeitos){
			this.EfeitoClique.play();
		}
	}
}