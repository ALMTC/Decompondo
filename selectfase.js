class SelecFase extends Phaser.Scene {
	constructor(){
		super("SelecFase");
	}
	create(){//carrega elementos base da tela e sua propriedádes

		this.EfeitoClique = this.sound.add("BotaoClick", {volume: 1, loop: false});

		this.bg = this.add.image(683,384,"bgSelect");

		//textos da tela
		this.missao = this.add.text(148,210,"Missão", {font: '50px balloon', fill: "white"})
		this.missao.setOrigin(0.5);

		this.informacao = this.add.text(469,210,"Informação", {font: '50px balloon', fill: "white"});
		this.informacao.setOrigin(0.5);

		this.escolhaP = this.add.text(1084,210,"Escolha o herói", {font: '50px balloon', fill: "white"});
		this.escolhaP.setOrigin(0.5);

		this.bloqueado = this.add.text(148, 548, "bloqueado", {font: '30px balloon', fill: "red"});
		this.bloqueado.setOrigin(0.5);
		this.bloqueado.visible = false;

		this.Nfase = this.add.text(149,383,"1", {font: '200px balloon', fill: "white"});
		this.Nfase.setOrigin(0.5);
		this.Nfase.numero = faseAtual;

		this.textInfo = this.add.text(340, 280, "O zero está causando confusões \nna cidade utilizando as \noperações, precisamos \nderrota-lo o mais rápido \npossível!", {font: '35px balloon', fill: "#0D9B21"});

		//botoes da tela exemplificados por função e nome
		this.setaFcima = this.add.image(284.5 , 150, "setaF").setInteractive();
		this.setaFcima.on("pointerdown", function(){
			this.click = true;
		});

		this.setaFbaixo = this.add.image(284.5 , 547, "setaF").setInteractive();
		this.setaFbaixo.flipY = true;
		this.setaFbaixo.visible = false;
		this.setaFbaixo.on("pointerdown", function(){
			this.click = true;
		});

		this.setaPesquerda = this.add.image(905 , 383, "setaP").setInteractive();
		this.setaPesquerda.visible = false;
		this.setaPesquerda.on("pointerdown", function(){
			this.click = true;
		});

		this.setaPdireita = this.add.image(1263 , 383, "setaP").setInteractive();
		this.setaPdireita.flipX = true;
		this.setaPdireita.on("pointerdown", function(){
			this.click = true;
		});


		//botões principais de voltar e jogar
		this.btvoltar = this.add.image(341, 692.5, "btFundo1").setInteractive();
		this.btvoltar.click = false;
		this.btvoltar.on("pointerover", function(){
			this.setTexture("btFundo2");
		});
		this.btvoltar.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.btvoltar.on("pointerdown", function(){
			this.click = true;
		});
		this.textvoltar = this.add.text(341, 692.5, "Voltar", {font: '45px balloon', fill: "white"});
		this.textvoltar.setOrigin(0.5);


		this.btjogar = this.add.image(1025, 692.5, "btFundo1").setInteractive();
		this.btjogar.click = false;
		this.btjogar.on("pointerover", function(){
			this.setTexture("btFundo2");
		});
		this.btjogar.on("pointerout", function(){
			this.setTexture("btFundo1");
		});
		this.btjogar.on("pointerdown", function(){
			this.click = true;
		});
		this.textjogar = this.add.text(1025, 692.5, "jogar", {font: '45px balloon', fill: "white"});
		this.textjogar.setOrigin(0.5);


		//sprite do personagem que alterna e pode ser esxolhido
		this.personagem = this.add.image(1084,592,"Pfeliz1");
		this.personagem.numero = 1;	
		this.personagem.setOrigin(0.5,1);
		this.personagem.setScale(0.35);

		this.salvaLocalStorage();
		this.atualizaFase();
		this.atualizaPersonagem();
	}

	update(){//veridica os cliques nos boões e roda as funcões de cada um
		if(this.btvoltar.click){
			this.click();
			this.btvoltar.click = false;
			this.scene.start("Menu");
		}

		if(this.btjogar.click){
			this.click();
			this.btjogar.click = false;
			personagemSpt = this.personagem.numero;
			switch(this.Nfase.numero){
				case 1:
					this.scene.start("Fase1");
					break;
				case 2:
					if(fase>1){
						this.scene.start("Fase2");
					}
					break;
				case 3:
					if(fase>2){
						this.scene.start("Fase3");
					}
					break;
			}
		}

		if(this.setaPesquerda.click){
			this.click();
			this.setaPesquerda.click = false;
			this.personagem.numero--;
			this.atualizaPersonagem();
		}

		if(this.setaPdireita.click){
			this.click();
			this.setaPdireita.click = false;
			this.personagem.numero++;
			this.atualizaPersonagem();
		}

		if(this.setaFcima.click){
			this.click();
			this.setaFcima.click = false;
			this.Nfase.numero++;
			this.atualizaFase();
		}

		if(this.setaFbaixo.click){
			this.click();
			this.setaFbaixo.click = false;
			this.Nfase.numero--;
			this.atualizaFase();
		}
	}

	atualizaPersonagem(){//atualiza o sprite do personagem bem como as setas que movimenta ele
		switch(this.personagem.numero){
			case 1:
				this.setaPesquerda.visible = false;
				this.setaPdireita.visible = true;
				this.personagem.setScale(0.35);
				this.personagem.setTexture("Pfeliz1");
				break;
			case 2:
				this.setaPesquerda.visible = true;
				this.setaPdireita.visible = true;
				this.personagem.setScale(0.35);
				this.personagem.setTexture("Pfeliz2");
				break;
			case 3:
				this.setaPesquerda.visible = true;
				this.setaPdireita.visible = true;
				this.personagem.setScale(0.35);
				this.personagem.setTexture("Pfeliz3");
				break;
			case 4:
				this.setaPesquerda.visible = true;
				this.setaPdireita.visible = false;
				this.personagem.setTexture("Pfeliz4");
				this.personagem.setScale(0.35);
				break;
		}
	}

	atualizaFase(){//atualiza o número da bem como as setas que movimenta ele e caso ainda não seja acessível, deixa a fase com uma cor diferente
		switch(this.Nfase.numero){
			case 1:
				this.Nfase.setTint(0xffffff);
				this.missao.setTint(0xffffff);
				this.bloqueado.visible = false;
				this.Nfase.text = "1";
				this.textInfo.text = "O zero está causando confusões \nna cidade utilizando as \noperações, precisamos \nderrota-lo o mais rápido \npossível!";
				this.setaFcima.visible = true;
				this.setaFbaixo.visible = false;
				break;
			case 2:
				if(fase >1 ){
					this.Nfase.setTint(0xffffff);
					this.missao.setTint(0xffffff);
					this.bloqueado.visible = false;
				}else{
					this.bloqueado.visible = true;
					this.Nfase.setTint(0xff0000);
					this.missao.setTint(0xff0000);
				}
				this.Nfase.text = "2";
				this.textInfo.text = "O zero fugiu para a fonte do \ncentro da cidade, precisamos \nalcançá-lo e tentar pegar as \noperações que ele roubou.";
				this.setaFcima.visible = true;
				this.setaFbaixo.visible = true;
				break;
			case 3:
				if(fase >2 ){
					this.Nfase.setTint(0xffffff);
					this.missao.setTint(0xffffff);
					this.bloqueado.visible - false;
				}else{
					this.bloqueado.visible = true;
					this.Nfase.setTint(0xff0000);
					this.missao.setTint(0xff0000);
				}
				this.Nfase.text = "3";
				this.textInfo.text = "O zero atacou a nossa base. \nprecisamos voltar para detê-lo \nou ele vencerá e as levará \nas operações para sempre.";
				this.setaFcima.visible = false;
				this.setaFbaixo.visible = true;
				break;
		}
	}

	salvaLocalStorage(){//salva o progresso no localStorage
		localStorage.setItem('decomponto-fase',fase);
	}
	click(){//efeito de clique dos botões.
		if(efeitos){
			this.EfeitoClique.play();
		}
	}
}