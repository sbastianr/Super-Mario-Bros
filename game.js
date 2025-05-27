/* global Phaser */
import { createAnimations } from './animations.js' // Importa las animaciones

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics:{
        default: 'arcade', // Motor de física
        arcade: {
            gravity: { y: 300 }, // Gravedad en el eje Y
            debug: false // Muestra información de depuración
        }   
    },
    scene: {
        preload, // Se ejecuta para precargar recursos
        create, // Se ejecuta cuando el juego comienza
        update // se ejecuta en cada frame
    }
}
 
new Phaser.Game(config)

// this -> game -> el juego que estamos construyendo
function preload () {
    this.load.image(
        'cloud1',
        'assets//scenery//overworld//cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets//scenery//overworld//floorbricks.png'
    )

    this.load.spritesheet(
        'mario', // <------ Id
        'assets//entities//mario.png',
        { frameWidth: 18, frameHeight: 16}
    )

    this.load.audio(
        'game-over',
        'assets//sound//music//gameover.mp3'
    )
} // 1.

function create () {
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0,0)
        .setScale(0.15)

    this.floor = this.physics.add.staticGroup() // Grupo estático para el suelo
    this.floor
        .create(0, config.height - 16, 'floorbricks') // Crea el suelo 
        .setOrigin(0, 0.5) // Establece el origen en la esquina inferior izquierda
        .refreshBody()

    this.floor
        .create(150, config.height - 16, 'floorbricks') // Crea el suelo 
        .setOrigin(0, 0.5) // Establece el origen en la esquina inferior izquierda
        .refreshBody()
    
    this.mario = this.physics.add.sprite(50, 100, 'mario')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(300)

    this.physics.world.setBounds(0, 0, 2000, config.height) // Establece los límites del mundo
    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height) // Establece los límites de la cámara
    this.cameras.main.startFollow(this.mario) // La cámara sigue al sprite de Mario 

    createAnimations(this) // Crea las animaciones

    this.keys = this.input.keyboard.createCursorKeys()    


} // 2.

function update () {

    if (this.mario.isDead) return // Si Mario está muerto, no actualiza más

    if (this.keys.left.isDown) {
        this.mario.x -= 2
        this.mario.anims.play('mario-walk', true) // Reproduce la animación de caminar
        this.mario.flipX = true // Voltea el sprite para que mire a la izquierda

    } else if (this.keys.right.isDown) {
        this.mario.x += 2
        this.mario.anims.play('mario-walk', true) // Reproduce la animación de caminar
        this.mario.flipX = false // Asegura que el sprite mire a la derecha

    } else {
        this.mario.anims.play('mario-idle', true) // Reproduce la animación de estar quieto
    }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true) // Reproduce la animación de salto
    }

    if (this.mario.y >= config.height) {
        this.mario.isDead = true // Marca a Mario como muerto
        this.mario.anims.play('mario-dead', true) // Reproduce la animación de muerte
        this.mario.setCollideWorldBounds(false) // Desactiva la colisión con los límites del mundo
        this.sound.add('game-over', { volume: 0.2}).play() // Reproduce el sonido de game over

        setTimeout(() => {
            this.mario.setVelocityY(-350) // Detiene el movimiento vertical
        }, 100)

        setTimeout(() => {
            this.scene.restart() // Reinicia la escena después de 1 segundo
        }, 2000)
    }
} // 3. 