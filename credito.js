class Credito extends Phaser.Scene {
	constructor(){
		super("Credito");
	}

	create(){//tela simples que mostra os créditos do projeto

		this.EfeitoClique = this.sound.add("BotaoClick", {volume: 1, loop: false});

		this.bg = this.add.image(683,384,"credito");

		this.btvoltar = this.add.image(683, 691, "btFundo1").setInteractive();
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

		this.textvoltar = this.add.text(683, 691, "Voltar", {font: '45px balloon', fill: "white"});
		this.textvoltar.setOrigin(0.5);
	}
	update(){
		if(this.btvoltar.click){
			if(efeitos){
				this.EfeitoClique.play();
			}
			this.btvoltar.click = false;
			this.scene.start("Menu");
		}
	}
}