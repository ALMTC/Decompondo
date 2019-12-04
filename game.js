//variáveos glovais

var fase = 1;
var faseAtual = 1;
var personagemSpt = 1;
var efeitos = true;
var musica = true;

//variáveis da criação do jogo
var loadscene = new Load();
var config = {
	width: 1366,
	height: 768,
	backgroundColor: 0x000000,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	scene: [Load,CutScene, Menu, Credito, SelecFase, Fase1, Fase2, Fase3]
}


//cria o jogo em si
var game = new Phaser.Game(config);
