class Load extends Phaser.Scene {
	constructor(){
		super({key: "loadGame"});
	}
	preload(){

		//carrega todos os recursos do jogo

		this.load.image("bgfase1", "https://i.ibb.co/3FxMvnM/bgfase1.png");
		this.load.image("bgfase2", "https://i.ibb.co/hFktnh2/bgfase2.png");
		this.load.image("bgfase3", "https://i.ibb.co/SyGJhB8/bgfase3.png");
		this.load.image("bgmenu", "https://i.ibb.co/bWBv5b0/bgmenu.png");
		this.load.image("bgSelect", "https://i.ibb.co/ZWWZSFy/bgSelecF.png");
		this.load.image("estrela", "https://i.ibb.co/RQffdM4/estrelas.png");
		this.load.image("duvida", "https://i.ibb.co/G59Q6Cc/duvida.png");
		this.load.image("zero", "https://i.ibb.co/7vfvPtY/zero.png");
		this.load.image("zeroDano", "https://i.ibb.co/T1FqL0H/zero-dano.png");
		this.load.image("barradevida4", "https://i.ibb.co/nQ5bXpd/barra1.png");
		this.load.image("barradevida3", "https://i.ibb.co/9vHzzKF/barra2.png");
		this.load.image("barradevida2", "https://i.ibb.co/n83zQK4/barra3.png");
		this.load.image("barradevida1", "https://i.ibb.co/zN2yggs/barra4.png");
		this.load.image("barradevida0", "https://i.ibb.co/1ZXx0mX/barra5.png");
		this.load.image("c1", "https://i.ibb.co/L0syYVk/carta1.png");
		this.load.image("c2", "https://i.ibb.co/9hrzVMF/carta2.png");
		this.load.image("c3", "https://i.ibb.co/B2JDj5Y/carta3.png");
		this.load.image("c4", "https://i.ibb.co/cxXV5yh/carta4.png");
		this.load.image("c5", "https://i.ibb.co/c1jwrJ6/carta5.png");
		this.load.image("c6", "https://i.ibb.co/4MkBxfC/carta6.png");
		this.load.image("c7", "https://i.ibb.co/6wJGJTd/carta7.png");
		this.load.image("c8", "https://i.ibb.co/bXTCssT/carta8.png");
		this.load.image("c9", "https://i.ibb.co/KWZJjZp/carta9.png");
		this.load.image("btFundo1", "https://i.ibb.co/SxgfMXW/btFundo1.png");
		this.load.image("btFundo2", "https://i.ibb.co/51S9PZV/btFundo2.png");
		this.load.image('config', "https://i.ibb.co/Jrj3jPb/configuracao.png");
		this.load.image('musicaon', "https://i.ibb.co/b7fbxtQ/musicaon.png");
		this.load.image('musicaoff', "https://i.ibb.co/k1ns164/musicaoff.png");
		this.load.image('efeitoson', "https://i.ibb.co/6yBzYLR/efeitoson.png");
		this.load.image('efeitosoff', "https://i.ibb.co/ChYvZs0/efeitosoff.png");
		this.load.image('transp', "https://i.ibb.co/NxHPLQs/trasnparencia.png");
		this.load.image('Bfala', "https://i.ibb.co/6ZXxrFg/fala.png");
		this.load.image("Zcorrendo", "https://i.ibb.co/8gSpFDW/zero-Correndo.png");
		this.load.image("campo0","https://i.ibb.co/wLQr80K/campo0.png");
		this.load.image("campo1","https://i.ibb.co/XtQ69VC/campo1.png");
		this.load.image("campo2","https://i.ibb.co/PWjm132/campo2.png");
		this.load.image("campo3","https://i.ibb.co/1mR3Rqx/campo3.png");
		this.load.image("campo4","https://i.ibb.co/VHDtJ0r/campo4.png");
		this.load.image("numero4", "https://i.ibb.co/sy1g2Wn/Numero-4-amarelo.png");
		this.load.image("numero1", "https://i.ibb.co/r687Bg4/Numero-1-pink.png");
		this.load.image("Pduvida1", "https://i.ibb.co/Lr9Q7bL/Pdivida1.png");
		this.load.image("Pduvida2", "https://i.ibb.co/gwdbcY5/Pdivida2.png");
		this.load.image("Pduvida3", "https://i.ibb.co/tb2mXtV/Pdivida3.png");
		this.load.image("Pduvida4", "https://i.ibb.co/7g4wQ9H/Pdivida4.png");
		this.load.image("Pfeliz1", "https://i.ibb.co/NYDRyZY/Pfeliz1.png");
		this.load.image("Pfeliz2", "https://i.ibb.co/QD1sSy3/Pfeliz2.png");
		this.load.image("Pfeliz3", "https://i.ibb.co/GnwfZXF/Pfeliz3.png");
		this.load.image("Pfeliz4", "https://i.ibb.co/dBq7Tdc/Pfeliz4.png");
		this.load.image("logo", "https://i.ibb.co/pZ48tPW/logo.png");
		this.load.image("credito","https://i.ibb.co/bWcYBfW/creditos.png");
		this.load.image("seta1","https://i.ibb.co/1KtrKj7/seta1.png");
		this.load.image("seta2","https://i.ibb.co/C2rWBpS/seta2.png");
		this.load.image("tutorial1","https://i.ibb.co/H2PCh6K/tutorial1.png");
		this.load.image("tutorial2","https://i.ibb.co/qpXL5fb/tutorial2.png");
		this.load.image("tutorial3","https://i.ibb.co/Jcs9g4H/tutorial3.png");
		this.load.image("setaF","https://i.ibb.co/ncPrc6W/setaFase.png");
		this.load.image("setaP","https://i.ibb.co/ZXMF0nq/seta-Personagem.png");
		this.load.image("instrucoes", "https://i.ibb.co/vjK0mRj/Instrucoes.png");


		this.load.audio("BotaoClick","https://static.wixstatic.com/mp3/bb1a3c_9cfdc049d37a45f1830c5e9b61722c95.mp3");
		this.load.audio("CartaClick","https://static.wixstatic.com/mp3/bb1a3c_84deb8839a8441b7a976a99ab2fa15ce.mp3");
		this.load.audio("JogadaAcertar","https://static.wixstatic.com/mp3/bb1a3c_1a93395347aa42d3bc82dcf314137bdd.mp3");
		this.load.audio("JogadaErrar","https://static.wixstatic.com/mp3/bb1a3c_da0fd301be774e6aa91d3c4710236323.mp3");
		this.load.audio("MusLuta1","https://static.wixstatic.com/mp3/bb1a3c_fd1b9bd6430c4c718d0be44c8c7b2d95.mp3");
		this.load.audio("MusLuta2","https://static.wixstatic.com/mp3/bb1a3c_b8eaab97fda24f1dae7ae7b3ed2e8db9.mp3");
		this.load.audio("MusMenu", "https://static.wixstatic.com/mp3/bb1a3c_e4bba63b435b486aa66eece830b3c544.mp3");
		this.load.audio("LevarDano","https://static.wixstatic.com/mp3/bb1a3c_c50d5c14f0764ad58df266c3122170dd.mp3");
		this.load.audio("Risada","https://static.wixstatic.com/mp3/bb1a3c_065f9129b45b43c89651dd325a0e244e.mp3");
		this.load.audio("CartaMove", "https://static.wixstatic.com/mp3/bb1a3c_c443a9c380fc43dfac11a1ebabdc959e.mp3");
	}
	create(){

		//ferifica que existe algum savegame e inicia o jogo

		var testeLocal = localStorage.getItem("decomponto-fase");
		if(testeLocal != null){
			fase = testeLocal;
		}
		this.scene.start("CutScene");
	}
}
