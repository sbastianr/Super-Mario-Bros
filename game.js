/* global Phaser */

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

    this.anims.create({
        key: 'mario-walk', // <------ Id de la animación
        frames: this.anims.generateFrameNumbers(
		'mario',
		{ start: 0, end: 3 }
		),
        frameRate: 12, // Velocidad de la animación
        repeat: -1 // Repetir indefinidamente
    })

    this.anims.create({
        key: 'mario-idle', // <------ Id de la animación
        frames: [{ key: 'mario', frame: 0 }], // Solo un frame
    })

    this.anims.create({
        key: 'mario-jump', // <------ Id de la animación
        frames: [{ key: 'mario', frame: 5 }], // Solo un frame
    })

    this.keys = this.input.keyboard.createCursorKeys()    


} // 2.

function update () {
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
} // 3. 