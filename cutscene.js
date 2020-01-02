var atualiza = false;

class CutScene extends Phaser.Scene {
	constructor(){
		super({key: "CutScene"});
	}
	create(){//cria todos os recursos usado na tela
		this.bg = this.add.image(0,0,"bgfase1");
		this.bg.setOrigin(0,0);

		this.transparencia = this.add.image(0,0, "transp");
		this.transparencia.setOrigin(0);

		this.p1 = this.add.image(100, 450, "Pduvida1");
		this.p1.flipX = true;
		this.p1.setScale(0.3);
		this.p1.visible = false;

		this.p2 = this.add.image(275, 450, "Pduvida2");
		this.p2.flipX = true;
		this.p2.setScale(0.3);
		this.p2.visible = false;

		this.p3 = this.add.image(450, 450, "Pduvida3");
		this.p3.flipX = true;
		this.p3.setScale(0.3);
		this.p3.visible = false;

		this.p4 = this.add.image(625, 450, "Pduvida4");
		this.p4.flipX = true;
		this.p4.setScale(0.3);
		this.p4.visible = false;

		this.n4 = this.add.image(1184, 489,"numero4");
		this.n4.setScale(0.8);
		this.n4.visible = false;

		this.n1 = this.add.image(1184, 489,"numero1");
		this.n1.visible = false;

		this.zero = this.add.image(870, 220, "zero");
		this.zero.visible = false;


		this.Bfala = this.add.image(0,549, "Bfala").setInteractive();
		this.Bfala.setOrigin(0);
		this.Bfala.valor = 0
		this.Bfala.som = this.sound.add("BotaoClick", {volume: 1, loop: false});
		this.Bfala.on('pointerdown', function (pointer) {//roda a função semple que clica na caixa de diálogo
	        this.som.play();
	        this.valor++;
	        atualiza = true;
	     });
		this.texto = this.add.text(56, 585, "...",{font: '65px balloon', fill: "black",});
		this.texto.setLineSpacing(20);

	}
	update(){//Fica verificando variáveis
		if(atualiza){
			atualiza = false;
			this.mostraFala();
		}
		if(this.Bfala.valor >= 12){//vai para o menu após a cena
			this.scene.start("Menu");
		}
	}
	mostraFala(){//osganiza e exibe em ordem toda a cena e os diálgos
		switch(this.Bfala.valor){
			case 1:
				this.texto.text = "onde nós estamos?";
				this.p1.visible = true;
				break;
			case 2:
				this.texto.text = "Eu também não sei, mas não estamos em casa.";
				this.p2.visible = true;
				break;
			case 3:
				this.texto.text = "E por que estamos usando essas roupas?";
				this.p3.visible = true;
				break;
			case 4:
				this.texto.text = "Acho que estamos sonhando.";
				this.p4.visible = true;
				break;
			case 5:
				this.texto.text = "Sejam bem vindos ao mundo dos números. \nEu sou o prefeito dessa cidade, o número 1";
				this.n1.visible = true;
				break;
			case 6:
				this.texto.text = "Eu lhes trouxe aqui para que vocês nos \najudem com algo muito importante.";
				this.p1.setTexture("Pfeliz1");
				this.p2.setTexture("Pfeliz2");
				this.p3.setTexture("Pfeliz3");
				this.p3.setScale(0.3);
				this.p4.setTexture("Pfeliz4");
				this.p4.setScale(0.3);
				break;
			case 7:
				this.texto.text = "O número zero ficou com raiva por \nnão ser muito útil com soma nem subtração.";
				this.p2.setTexture("Pduvida2");
				this.zero.visible = true;
				break;
			case 8:
				this.texto.text = "Para descontar sua raiva, ele decidiu\nroubar as operações e causar confusão.";
				this.p3.setTexture("Pduvida3");
				this.p3.setScale(0.3);
				break;
			case 9:
				this.texto.text = "Não temos como pará-lo sozinhos, por \nisso trouxemos vocês aqui para nos ajudar.";
				break;
			case 10:
				this.texto.text = "Usem a operação que ele ainda não roubou\npara detê-lo. o número 4 dirá como usá-la.";
				break;
			case 11:
				this.texto.text = "Olá, eu sou o número 4, eu vou acompanhar \nvocês e ajuda em tudo que puder.";
				this.zero.visible = false;
				this.n1.visible = false;
				this.n4.visible = true;
				this.p2.setTexture("Pfeliz2");
				this.p3.setTexture("Pfeliz3");
				this.p3.setScale(0.3);
				break;
			case 12:
				this.texto.text = "Mas primeiro, vamos para a nossa base \nde operações.";
				this.n1.visible = false;
				this.n4.visible = true;
				break;
		}
	}
}
