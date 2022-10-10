new Vue({
    el: '#app',
    data: {
        cambio:false,
        cambio2:0,
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        MIN: 0,
    },

    methods: {

        cambiarJugador(){
            // this.cambio=true;
            this.registrarEvento(true,'El jugador cambio de personaje!')
            this.registrarEvento(false,'El rival tambien cambio de personaje!')
            this.cambio2++;
            this.saludJugador=100;
            this.saludMonstruo=100;
        },

        getColor(){
            if(saludJugador<50){
                return  'yellow';
            }
            else if(saludJugador<15)
            {
                return 'crimson';
            }
        },
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.cambio2=0;
            this.hayUnaPartidaEnJuego=true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {

            // let valorDaño = Math.max(Math.floor(Math.random() * this.rangoAtaque[1])+1, this.rangoAtaque[0]);
            // this.saludMonstruo-= valorDaño;

            var daño= this.calcularHeridas(3,10);
            this.saludMonstruo-= daño;
            this.registrarEvento(true,'El jugador golpea al enemigo con ' + daño + ' de daño')

            if(this.verificarGanador()){
                return;
            }
            else{
                this.ataqueDelMonstruo();
            }
        },

        ataqueEspecial: function () {
            
            var daño2= this.calcularHeridas(10,20);
            this.saludMonstruo-= daño2;
            this.registrarEvento(true,'El jugador usa un ataque especial con ' + daño2 + ' de daño')
            if(this.verificarGanador()){
                return;
            }
            else{
                this.ataqueDelMonstruo();
            }

        },

        curar: function (){
            if(this.saludJugador <= 90){
                this.registrarEvento(true,'El jugador se cura por 10 de salud ' )
                this.saludJugador += 10;
            }else {
                this.saludJugador = 100;
            }
            this.ataqueDelMonstruo();
        },

        registrarEvento(jugador,evento) 
        {
            this.turnos.unshift({
                esJugador: jugador,
                text: evento
            })
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false;
            this.cambio2==0;
        },

        ataqueDelMonstruo: function (){
            var daño3 = this.calcularHeridas(5,12);
            this.saludJugador-= daño3;
            this.registrarEvento(false,'El enemigo le hace ' + daño3 + ' de daño')
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max)+1, min);

        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                if (confirm('Ganaste! Jugar de nuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                    this.cambio2==0;
                }
                return true;
            } else if (this.saludJugador <= 0) {
                if (confirm('Perdiste! Jugar de nuevo?')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                    this.cambio2==0;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        },

    }


});