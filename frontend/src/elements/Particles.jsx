import React, {useCallback} from 'react';
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

function ParticlesBackground() {

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            className='particles'
            options={{
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 10,
                        density: {
                            enable: true,
                            value_area: 200
                        }
                    },
                    color: {
                        value: "#922FAD",
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: 1,
                        random: false,
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.2,
                            sync: false
                        }
                    },
                    size: {
                        value: 4,
                        random: { enable: true, minimumValue: 4 },
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0,
                            sync: false
                        }
                    },
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        size: true,
                    }
                },
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        resize: true
                    }
                },
                detectRetina: true,
            }}
        />
    )

}

export default ParticlesBackground;