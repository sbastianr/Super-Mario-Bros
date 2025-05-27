export const createAnimations = (game) => {    

    game.anims.create({
        key: 'mario-walk', // <------ Id de la animación
        frames: game.anims.generateFrameNumbers(
        'mario',
        { start: 0, end: 3 }
        ),
        frameRate: 12, // Velocidad de la animación
        repeat: -1 // Repetir indefinidamente
    })

    game.anims.create({
        key: 'mario-idle', // <------ Id de la animación
        frames: [{ key: 'mario', frame: 0 }], // Solo un frame
    })

    game.anims.create({
        key: 'mario-jump', // <------ Id de la animación
        frames: [{ key: 'mario', frame: 5 }], // Solo un frame
    })

    game.anims.create({
        key: 'mario-dead', // <------ Id de la animación
        frames: [{ key: 'mario', frame: 4 }], // Solo un frame
    })

}